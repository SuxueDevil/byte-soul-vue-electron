<!--
  @description 应用根组件
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 提供主题切换（data-theme 属性）
  - 渲染路由视图
-->

<template>
  <div class="app" :data-theme="theme">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// ==================== 一、导入 ====================

// 1、Vue 核心
import { computed } from 'vue'
// 2、配置状态管理
import { useConfigStore } from './stores/config'

// ==================== 二、主题逻辑 ====================

// 1、获取配置状态
const configStore = useConfigStore()
// 2、计算当前主题
const theme = computed(() => configStore.theme)
</script>

<style>
/* ==================== 一、全局样式重置 ==================== */

/* 1、清除默认边距 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #F8FAFC;
  color: #0F172A;
}

/* ==================== 二、应用容器样式 ==================== */

/* 1、默认亮色主题 */
.app {
  width: 100vw;
  height: 100vh;
  background-color: #F8FAFC;
  color: #0F172A;
  font-family: 'IBM Plex Sans', sans-serif;
}

/* 2、暗色主题 */
[data-theme="dark"] .app {
  background-color: #0F172A;
  color: #F8FAFC;
}
</style>
