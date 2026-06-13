/**
 * @description HTTP 客户端 — 基于 Axios 封装
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 统一 baseURL、超时时间
 * - 请求拦截器: 自动附带 Token
 * - 响应拦截器: 自动解包后端响应
 */

import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { appConfig } from '@/config'

// ==================== 一、创建 Axios 实例 ====================

// 1、配置 baseURL、超时、请求头
const instance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// ==================== 二、请求拦截器 ====================

// 1、自动附带 Token 到请求头
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ==================== 三、响应拦截器 ====================

// 1、自动解包后端响应，返回 data 字段
// 2、处理 401 未授权，跳转登录页
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const body = response.data
    // 后端统一返回 { code, message, data }，自动解包到 data
    if (body && typeof body.code === 'number' && 'data' in body) {
      if (body.code !== 200) {
        return Promise.reject(new Error(body.message || '请求失败'))
      }
      return body.data
    }
    return body
  },
  (error) => {
    // 401 未授权，清除 Token 并跳转登录
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ==================== 四、导出请求方法 ====================

/** GET 请求 */
export async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get(url, config) as Promise<T>
}

/** POST 请求 */
export async function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.post(url, data, config) as Promise<T>
}

/** PUT 请求 */
export async function put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.put(url, data, config) as Promise<T>
}

/** DELETE 请求 */
export async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.delete(url, config) as Promise<T>
}

export default instance
