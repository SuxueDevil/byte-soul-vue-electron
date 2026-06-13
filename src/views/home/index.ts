// HomeView 逻辑
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

export interface Project {
  name: string
  path: string
  lastOpened: string
}

export const useHomeView = () => {
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

  return {
    recentProjects,
    openProject,
    handleOpenFolder,
    handleNewProject
  }
}
