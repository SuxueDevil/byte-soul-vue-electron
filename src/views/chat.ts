// ChatView 逻辑
import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileTreeNode from '@/components/file/FileTreeNode.vue'

// 标签页
export const projectTabs = ref([
  { id: '1', name: '项目 A' },
  { id: '2', name: '项目 B' }
])
export const activeTab = ref('1')

// 侧边栏
export const sidebarCollapsed = ref(false)
export const activePanel = ref('chat')

// 会话
export const sessions = ref([
  { id: '1', name: '新会话 1' },
  { id: '2', name: '新会话 2' }
])
export const activeSession = ref('1')

// 消息
export const messages = ref([
  {
    id: '1',
    role: 'assistant' as const,
    content: '你好！我是 ByteSoul AI 助手，有什么可以帮你的吗？',
    timestamp: '10:30'
  }
])

// 输入
export const inputText = ref('')
export const messagesContainer = ref<HTMLElement>()

// 文件树
export const showSearch = ref(false)
export const searchQuery = ref('')

export const fileTree = ref([
  {
    name: 'src',
    path: 'src',
    type: 'directory' as const,
    children: [
      { name: 'main.ts', path: 'src/main.ts', type: 'file' as const },
      { name: 'App.vue', path: 'src/App.vue', type: 'file' as const }
    ]
  },
  { name: 'package.json', path: 'package.json', type: 'file' as const }
])

// 知识库
export const documents = ref([
  { id: '1', name: '项目文档.pdf' },
  { id: '2', name: 'API 说明.md' }
])

// 方法
export const closeTab = (id: string) => {
  projectTabs.value = projectTabs.value.filter(tab => tab.id !== id)
}

export const addTab = () => {
  const newId = String(Date.now())
  projectTabs.value.push({ id: newId, name: `项目 ${newId}` })
}

export const createSession = () => {
  const newId = String(Date.now())
  sessions.value.push({ id: newId, name: `新会话 ${newId}` })
}

export const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  messages.value.push({
    id: String(Date.now()),
    role: 'user',
    content: inputText.value,
    timestamp: new Date().toLocaleTimeString()
  })
  
  inputText.value = ''
  
  // TODO: 调用 pyAgent API
}

export const attachFile = () => {
  // TODO: 附加文件
}

export const attachImage = () => {
  // TODO: 附加图片
}

export const uploadDocument = () => {
  // TODO: 上传文档
}
