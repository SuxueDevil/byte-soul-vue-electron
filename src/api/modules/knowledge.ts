/**
 * @description 知识库 API 模块
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 封装知识库相关接口
 * - 支持文档上传、列表、删除
 */

import { appConfig } from '@/config'

// ==================== 一、类型定义 ====================

export interface RAGDocument {
  doc_hash: string
  filename: string
  chunk_count: number
  [key: string]: unknown
}

export interface RAGChunk {
  chunk_id: string
  content: string
  [key: string]: unknown
}

// ==================== 二、知识库 API ====================

export const knowledgeApi = {
  /**
   * 上传文档到知识库
   */
  async upload(file: File): Promise<{ chunk_count: number }> {
    const url = `${appConfig.apiBaseUrl}/rag/ingest`
    const fd = new FormData()
    fd.append('file', file)
    const response = await fetch(url, { method: 'POST', body: fd })
    if (!response.ok) throw new Error(`上传失败: ${response.status}`)
    const result = await response.json()
    const chunkCount = result.data?.chunk_count ?? result.chunk_count ?? 0
    return { chunk_count: chunkCount }
  },

  /**
   * 获取文档列表
   */
  async listDocuments(): Promise<RAGDocument[]> {
    const url = `${appConfig.apiBaseUrl}/rag/documents`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`获取文档列表失败: ${response.status}`)
    const result = await response.json()
    return result.data ?? result ?? []
  },

  /**
   * 获取文档的 chunk 列表
   */
  async getChunks(docHash: string): Promise<RAGChunk[]> {
    const url = `${appConfig.apiBaseUrl}/rag/documents/${docHash}/chunks`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`获取 chunk 列表失败: ${response.status}`)
    const result = await response.json()
    return result.data ?? result ?? []
  },

  /**
   * 删除文档
   */
  async deleteDocument(docHash: string): Promise<{ deleted_count: number }> {
    const url = `${appConfig.apiBaseUrl}/rag/documents/${docHash}`
    const response = await fetch(url, { method: 'DELETE' })
    if (!response.ok) throw new Error(`删除文档失败: ${response.status}`)
    const result = await response.json()
    return result.data ?? { deleted_count: 0 }
  },

  /**
   * 搜索知识库
   */
  async search(query: string, topK = 5) {
    const url = `${appConfig.apiBaseUrl}/rag/search?query=${encodeURIComponent(query)}&top_k=${topK}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`搜索失败: ${response.status}`)
    return await response.json()
  }
}
