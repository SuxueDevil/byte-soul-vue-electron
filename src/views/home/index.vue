<!--
  @description 首页视图
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 显示欢迎信息
  - 显示最近打开的项目列表
  - 提供打开文件夹、新建项目操作
-->

<template>
  <!-- 一、页面容器 -->
  <div class="home-view">
    <!-- 1、欢迎区域 -->
    <div class="welcome-section">
      <h1 class="title">ByteSoul Desktop</h1>
      <p class="subtitle">AI 代码助手</p>
    </div>
    
    <!-- 2、最近项目列表 -->
    <div class="recent-projects">
      <h2 class="section-title">最近打开的项目</h2>
      <div class="project-list">
        <div
          v-for="project in recentProjects"
          :key="project.path"
          class="project-card"
          :class="{ selected: selectedProject === project.path }"
          @click="selectProject(project)"
          @dblclick="openProject(project)"
        >
          <div class="project-icon">
            <i class="pi pi-folder"></i>
          </div>
          <div class="project-info">
            <div class="project-name">{{ project.name }}</div>
            <div class="project-path">{{ project.path }}</div>
            <div class="project-date">{{ project.lastOpened }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 3、操作按钮 -->
    <div class="actions">
      <Button label="打开文件夹" icon="pi pi-folder-open" @click="handleOpenFolder" />
      <Button label="新建项目" icon="pi pi-plus" severity="secondary" @click="handleNewProject" />
    </div>
  </div>
</template>

<script setup lang="ts">
// ==================== 一、导入 ====================

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

// ==================== 二、类型定义 ====================

// 1、项目接口
interface Project {
  name: string
  path: string
  lastOpened: string
}

// ==================== 三、状态 ====================

const router = useRouter()

// 1、最近打开的项目列表
const recentProjects = ref<Project[]>([
  { name: '项目 A', path: 'C:\\Projects\\project-a', lastOpened: '2024-01-15' },
  { name: '项目 B', path: 'D:\\Work\\project-b', lastOpened: '2024-01-14' },
  { name: '项目 C', path: 'E:\\Dev\\project-c', lastOpened: '2024-01-13' }
])

// 2、选中的项目
const selectedProject = ref<string>('')

// ==================== 四、方法 ====================

// 1、选中项目
const selectProject = (project: Project) => {
  selectedProject.value = project.path
}

// 2、打开项目
const openProject = (project: Project) => {
  // TODO: 打开项目
  console.log('打开项目:', project)
  router.push('/chat')
}

// 2、打开文件夹对话框
const handleOpenFolder = () => {
  // TODO: 打开文件夹对话框
  console.log('打开文件夹')
}

// 3、新建项目
const handleNewProject = () => {
  // TODO: 新建项目
  console.log('新建项目')
}
</script>

<style scoped>
/* ==================== 一、页面样式 ==================== */

/* 1、页面容器 */
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 48px;
  background-color: #FFFFFF;
  color: #111827;
}

/* 2、欢迎区域 */
.welcome-section {
  text-align: center;
  margin-bottom: 48px;
}

.title {
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 18px;
  color: #6B7280;
}

/* 3、最近项目区域 */
.recent-projects {
  width: 100%;
  max-width: 800px;
  margin-bottom: 48px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.project-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms ease;
}

.project-card:hover {
  background-color: #F3F4F6;
  border-color: #D1D5DB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.project-card:active,
.project-card.selected {
  background-color: #000000;
  border-color: #000000;
  color: #FFFFFF;
}

.project-card:active .project-icon,
.project-card.selected .project-icon {
  color: #FFFFFF;
}

.project-card:active .project-name,
.project-card.selected .project-name {
  color: #FFFFFF;
}

.project-card:active .project-path,
.project-card:active .project-date,
.project-card.selected .project-path,
.project-card.selected .project-date {
  color: #9CA3AF;
}

.project-icon {
  font-size: 20px;
  color: #2563EB;
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}

.project-path,
.project-date {
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
}

/* 4、操作按钮 */
.actions {
  display: flex;
  gap: 12px;
}
</style>
