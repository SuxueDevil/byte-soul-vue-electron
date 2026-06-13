<template>
  <div class="file-tree-node">
    <div
      class="node-content"
      :style="{ paddingLeft: `${depth * 16 + 8}px` }"
      @click="handleClick"
      @contextmenu.prevent="handleContextMenu"
    >
      <i v-if="node.type === 'directory'" :class="isExpanded ? 'pi pi-folder-open' : 'pi pi-folder'" />
      <i v-else class="pi pi-file" />
      <span class="node-name">{{ node.name }}</span>
    </div>
    
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
import { ref } from 'vue'

interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

const props = defineProps<{
  node: FileNode
  depth: number
}>()

const isExpanded = ref(false)

const handleClick = () => {
  if (props.node.type === 'directory') {
    isExpanded.value = !isExpanded.value
  } else {
    // TODO: 打开文件
    console.log('打开文件:', props.node.path)
  }
}

const handleContextMenu = (event: MouseEvent) => {
  // TODO: 显示右键菜单
  console.log('右键菜单:', event, props.node)
}
</script>

<style scoped>
.file-tree-node {
  user-select: none;
}

.node-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.node-content:hover {
  background-color: var(--color-secondary);
}

.node-content i {
  font-size: 14px;
  color: var(--color-text-muted);
}

.node-content .pi-folder,
.node-content .pi-folder-open {
  color: var(--color-cta);
}

.node-name {
  font-size: 13px;
  color: var(--color-text);
}

.children {
  overflow: hidden;
}
</style>
