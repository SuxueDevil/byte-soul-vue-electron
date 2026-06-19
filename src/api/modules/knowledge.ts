/**
 * @description 知识库 API 模块
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 封装知识库相关接口
 * - 支持文档上传、搜索
 */

import { appConfig } from '@/config'

// ==================== 一、知识库 API ====================

export const knowledgeApi = {
  /**
   * 上传文档到知识库
   * @param file - 文件对象
   * @returns 返回上传结果
   */
  async upload(file: File): Promise<{ chunk_count: number }> {
    const url = `${appConfig.apiBaseUrl}/rag/ingest`
    const fd = new FormData()
    fd.append('file', file)
    const response = await fetch(url, { method: 'POST', body: fd })
    if (!response.ok) throw new Error(`上传失败: ${response.status}`)
    const result = await response.json()
    return result.data || result
  },

  /**
   * 搜索知识库
   * @param query - 搜索关键词
   * @param topK - 返回结果数量（默认 5）
   * @returns 返回搜索结果
   */
  async search(query: string, topK = 5) {
    const url = `${appConfig.apiBaseUrl}/rag/search?query=${encodeURIComponent(query)}&top_k=${topK}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`搜索失败: ${response.status}`)
    return await response.json()
  }
}
