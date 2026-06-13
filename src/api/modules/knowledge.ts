/**
 * 知识库 API 模块
 */
import { get, post } from '@/api/client'

export const knowledgeApi = {
  /** 上传文档 */
  upload(file: File) {
    const fd = new FormData()
    fd.append('file', file)
    return post('/knowledge/upload', fd)
  },

  /** 搜索知识库 */
  search(query: string, topK = 5) {
    return get('/knowledge/search', { params: { query, top_k: topK } })
  }
}
