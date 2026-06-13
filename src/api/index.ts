/**
 * @description API 总出口
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 统一导出所有 API 模块
 * - 方便调用方统一导入
 */

// ==================== 一、导出 API 模块 ====================

// 1、Agent API
export { agentApi } from './modules/agent'
// 2、知识库 API
export { knowledgeApi } from './modules/knowledge'
// 3、HTTP 客户端
export * from './client'
