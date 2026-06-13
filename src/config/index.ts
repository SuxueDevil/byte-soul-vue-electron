/**
 * @description 应用配置
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 统一管理应用配置
 * - 支持环境变量覆盖
 */

// ==================== 一、配置项 ====================

export const appConfig = {
  // 1、pyAgent API 地址（支持环境变量覆盖）
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // 2、应用名称
  appName: 'ByteSoul Desktop',
  
  // 3、版本号
  version: '0.1.0'
}
