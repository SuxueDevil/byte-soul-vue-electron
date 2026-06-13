<template>
  <div class="home-view">
    <div class="welcome-section">
      <h1 class="title">ByteSoul Desktop</h1>
      <p class="subtitle">AI 代码助手</p>
    </div>
    
    <div class="recent-projects">
      <h2 class="section-title">最近打开的项目</h2>
      <div class="project-list">
        <div
          v-for="project in recentProjects"
          :key="project.path"
          class="project-card"
          @click="openProject(project)"
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
    
    <div class="actions">
      <Button label="打开文件夹" icon="pi pi-folder-open" @click="handleOpenFolder" />
      <Button label="新建项目" icon="pi pi-plus" severity="secondary" @click="handleNewProject" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

interface Project {
  name: string
  path: string
  lastOpened: string
}

const router = useRouter()

const recentProjects = ref<Project[]>([
  { name: '项目 A', path: 'C:\\Projects\\project-a', lastOpened: '2024-01-15' },
  { name: '项目 B', path: 'D:\\Work\\project-b', lastOpened: '2024-01-14' },
  { name: '项目 C', path: 'E:\\Dev\\project-c', lastOpened: '2024-01-13' }
])

const openProject = (project: Project) => {
  // TODO: 打开项目
  console.log('打开项目:', project)
  router.push('/chat')
}

const handleOpenFolder = () => {
  // TODO: 打开文件夹对话框
  console.log('打开文件夹')
}

const handleNewProject = () => {
  // TODO: 新建项目
  console.log('新建项目')
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-2xl);
}

.welcome-section {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.title {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  font-size: 18px;
  color: var(--color-text-muted);
}

.recent-projects {
  width: 100%;
  max-width: 800px;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-lg);
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-md);
}

.project-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.project-card:hover {
  background-color: var(--color-secondary);
  transform: translateY(-2px);
}

.project-icon {
  font-size: 24px;
  color: var(--color-cta);
}

.project-info {
  flex: 1;
  min-width: 0;
}

.project-name {
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-path,
.project-date {
  font-size: 12px;
  color: var(--color-text-muted);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
}
</style>
