/**
 * @description 首页逻辑
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 管理最近项目列表
 * - 提供项目操作方法
 */

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

// ==================== 一、类型定义 ====================

// 1、项目接口
export interface Project {
  name: string
  path: string
  lastOpened: string
}

// ==================== 二、组合函数 ====================

export const useHomeView = () => {
  // ==================== 三、状态 ====================
  
  const router = useRouter()

  // 1、最近打开的项目列表
  const recentProjects = ref<Project[]>([
    { name: '项目 A', path: 'C:\\Projects\\project-a', lastOpened: '2024-01-15' },
    { name: '项目 B', path: 'D:\\Work\\project-b', lastOpened: '2024-01-14' },
    { name: '项目 C', path: 'E:\\Dev\\project-c', lastOpened: '2024-01-13' }
  ])

  // ==================== 四、方法 ====================
  
  // 1、打开项目
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

  // ==================== 五、导出 ====================
  
  return {
    recentProjects,
    openProject,
    handleOpenFolder,
    handleNewProject
  }
}
