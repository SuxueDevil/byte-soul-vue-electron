/**
 * Agent API 模块
 */
import { get, post } from '@/api/client'

export const agentApi = {
  /** 发送消息（SSE 流式） */
  sendMessage(message: string, threadId?: string) {
    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, thread_id: threadId })
    })
  }
}
