<!--
  @description 主布局组件
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 提供全屏容器
  - 使用插槽渲染子组件
-->

<template>
  <!-- 一、布局容器 -->
  <!-- 1、全屏容器，超出隐藏 -->
  <div class="main-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 主布局组件
</script>

<style scoped>
/* 一、布局样式 */
/* 1、全屏容器 */
.main-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
