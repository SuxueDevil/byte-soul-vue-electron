/**
 * @description 知识库 API 模块
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 封装知识库相关接口
 * - 支持文档上传、搜索
 */

import { get, post } from '@/api/client'

// ==================== 一、知识库 API ====================

export const knowledgeApi = {
  /**
   * 上传文档到知识库
   * @param file - 文件对象
   * @returns 返回上传结果
   */
  upload(file: File) {
    const fd = new FormData()
    fd.append('file', file)
    return post('/knowledge/upload', fd)
  },

  /**
   * 搜索知识库
   * @param query - 搜索关键词
   * @param topK - 返回结果数量（默认 5）
   * @returns 返回搜索结果
   */
  search(query: string, topK = 5) {
    return get('/knowledge/search', { params: { query, top_k: topK } })
  }
}
