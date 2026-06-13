/**
 * @description Agent API 模块
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 封装 Agent 相关接口
 * - 支持 SSE 流式对话
 */

// ==================== 一、Agent API ====================

export const agentApi = {
  /**
   * 发送消息（SSE 流式）
   * @param message - 消息内容
   * @param threadId - 会话 ID（可选）
   * @returns 返回 fetch Promise，需要手动处理 SSE 流
   */
  sendMessage(message: string, threadId?: string) {
    return fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/agent/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, thread_id: threadId })
    })
  }
}
