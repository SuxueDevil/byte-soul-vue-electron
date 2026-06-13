/**
 * HTTP 客户端 — 基于 Axios 封装
 * - 统一 baseURL、超时
 * - 请求拦截器: 自动附带 Token
 * - 响应拦截器: 自动解包后端响应
 */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { appConfig } from '@/config'

const instance: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器
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

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const body = response.data
    if (body && typeof body.code === 'number' && 'data' in body) {
      if (body.code !== 200) {
        return Promise.reject(new Error(body.message || '请求失败'))
      }
      return body.data
    }
    return body
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export async function get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get(url, config) as Promise<T>
}

export async function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.post(url, data, config) as Promise<T>
}

export async function put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.put(url, data, config) as Promise<T>
}

export async function del<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.delete(url, config) as Promise<T>
}

export default instance
