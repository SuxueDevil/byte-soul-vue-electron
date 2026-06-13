<!--
  @description 文件树节点组件
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 递归渲染文件树
  - 支持点击展开/折叠目录
  - 支持右键菜单
-->

<template>
  <!-- 一、节点容器 -->
  <div class="file-tree-node">
    <!-- 1、节点内容（图标 + 名称） -->
    <div
      class="node-content"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      @click="handleClick"
      @contextmenu.prevent="handleContextMenu"
    >
      <!-- 目录图标（展开/折叠） -->
      <i v-if="node.type === 'directory'" :class="isExpanded ? 'pi pi-folder-open' : 'pi pi-folder'" />
      <!-- 文件图标 -->
      <i v-else class="pi pi-file" />
      <!-- 节点名称 -->
      <span class="node-name">{{ node.name }}</span>
    </div>
    
    <!-- 2、子节点（递归渲染） -->
    <div v-if="node.type === 'directory' && isExpanded && node.children" class="children">
      <FileTreeNode
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ==================== 一、导入 ====================

import { ref } from 'vue'

// ==================== 二、类型定义 ====================

// 1、文件节点接口
interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

// ==================== 三、Props ====================

// 1、定义组件属性
const props = defineProps<{
  node: FileNode  // 节点数据
  depth: number   // 节点深度（用于缩进）
}>()

// ==================== 四、状态 ====================

// 1、是否展开
const isExpanded = ref(false)

// ==================== 五、方法 ====================

// 1、点击处理（展开/折叠目录，打开文件）
const handleClick = () => {
  if (props.node.type === 'directory') {
    isExpanded.value = !isExpanded.value
  } else {
    // TODO: 打开文件
    console.log('打开文件:', props.node.path)
  }
}

// 2、右键菜单处理
const handleContextMenu = (event: MouseEvent) => {
  // TODO: 显示右键菜单
  console.log('右键菜单:', event, props.node)
}
</script>

<style scoped>
/* ==================== 一、节点样式 ==================== */

/* 1、节点容器 */
.file-tree-node {
  user-select: none;
}

/* 2、节点内容 */
.node-content {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 150ms ease;
}

.node-content:hover {
  background-color: #E5E7EB;
}

/* 3、图标样式 */
.node-content i {
  font-size: 14px;
  color: #6B7280;
}

.node-content .pi-folder,
.node-content .pi-folder-open {
  color: #2563EB;
}

/* 4、节点名称 */
.node-name {
  font-size: 13px;
  color: #111827;
}

/* 5、子节点容器 */
.children {
  overflow: hidden;
}
</style>
