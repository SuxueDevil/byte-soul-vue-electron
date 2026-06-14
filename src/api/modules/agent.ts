/**
 * @description Agent API 模块
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 封装 Agent 相关接口
 * - 支持 SSE 流式对话（OpenAI 格式）
 */

import { appConfig } from '@/config'

// ==================== 一、类型定义 ====================

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  messages: ChatMessage[]
  stream?: boolean
  user?: string
  model?: string
}

export interface ChatChunk {
  id: string
  object: string
  created: number
  model: string
  choices: {
    index: number
    delta: {
      role?: string
      content?: string
    }
    finish_reason: string | null
  }[]
}

// ==================== 二、SSE 解析 ====================

/**
 * 解析 SSE 流，返回 ChatChunk 迭代器
 */
async function* parseSSEStream(response: Response): AsyncGenerator<ChatChunk> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('无法读取响应流')

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          try {
            yield JSON.parse(data) as ChatChunk
          } catch {
            // 忽略解析错误
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

// ==================== 三、API 方法 ====================

export const agentApi = {
  /**
   * 发送消息（SSE 流式）
   * @param request - 请求参数
   * @returns 返回 ChatChunk 异步迭代器
   */
  async *sendMessage(request: ChatRequest): AsyncGenerator<ChatChunk> {
    const url = `${appConfig.apiBaseUrl}/agent/chat`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: request.messages,
        stream: true,
        user: request.user,
        model: request.model
      })
    })

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`)
    }

    yield* parseSSEStream(response)
  },

  /**
   * 发送消息（非流式）
   * @param request - 请求参数
   * @returns 返回完整响应
   */
  async sendMessageSync(request: ChatRequest): Promise<string> {
    const url = `${appConfig.apiBaseUrl}/agent/chat`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: request.messages,
        stream: false,
        user: request.user,
        model: request.model
      })
    })

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status} ${response.statusText}`)
    }

    // 非流式返回的是完整的 chat.completion 对象
    const data = await response.json()
    return data.choices?.[0]?.message?.content || data.choices?.[0]?.delta?.content || ''
  }
}
