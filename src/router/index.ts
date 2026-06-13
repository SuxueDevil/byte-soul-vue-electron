/**
 * @description 路由配置
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 定义应用路由
 * - 使用懒加载优化性能
 */

import { createRouter, createWebHistory } from 'vue-router'

// ==================== 一、创建路由实例 ====================

// 1、配置路由规则（使用懒加载）
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/chat/index.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/index.vue')
    }
  ]
})

// ==================== 二、导出 ====================

export default router
