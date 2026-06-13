/**
 * @description 对话页逻辑
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 管理标签页、侧边栏、会话、消息
 * - 提供对话、文件管理、知识库操作
 */

import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileTreeNode from '@/components/file/FileTreeNode.vue'

// ==================== 一、标签页状态 ====================

// 1、项目标签页列表
export const projectTabs = ref([
  { id: '1', name: '项目 A' },
  { id: '2', name: '项目 B' }])
// 2、当前激活的标签页
export const activeTab = ref('1')

// ==================== 二、侧边栏状态 ====================

// 1、是否折叠
export const sidebarCollapsed = ref(false)
// 2、当前激活的面板（chat/knowledge/plugins/settings）
export const activePanel = ref('chat')

// ==================== 三、会话状态 ====================

// 1、会话列表
export const sessions = ref([
  { id: '1', name: '新会话 1' },
  { id: '2', name: '新会话 2' }])
// 2、当前激活的会话
export const activeSession = ref('1')

// ==================== 四、消息状态 ====================

// 1、消息列表
export const messages = ref([
  {
    id: '1',
    role: 'assistant' as const,
    content: '你好！我是 ByteSoul AI 助手，有什么可以帮你的吗？',
    timestamp: '10:30'
  }
])

// ==================== 五、输入状态 ====================

// 1、输入框文本
export const inputText = ref('')
// 2、消息容器引用
export const messagesContainer = ref<HTMLElement>()

// ==================== 六、文件树状态 ====================

// 1、是否显示搜索
export const showSearch = ref(false)
// 2、搜索关键词
export const searchQuery = ref('')
// 3、文件树数据
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

// ==================== 七、知识库状态 ====================

// 1、文档列表
export const documents = ref([
  { id: '1', name: '项目文档.pdf' },
  { id: '2', name: 'API 说明.md' }
])

// ==================== 八、方法 ====================

// 1、关闭标签页
export const closeTab = (id: string) => {
  projectTabs.value = projectTabs.value.filter(tab => tab.id !== id)
}

// 2、添加标签页
export const addTab = () => {
  const newId = String(Date.now())
  projectTabs.value.push({ id: newId, name: `项目 ${newId}` })
}

// 3、创建会话
export const createSession = () => {
  const newId = String(Date.now())
  sessions.value.push({ id: newId, name: `新会话 ${newId}` })
}

// 4、发送消息
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

// 5、附加文件
export const attachFile = () => {
  // TODO: 附加文件
}

// 6、附加图片
export const attachImage = () => {
  // TODO: 附加图片
}

// 7、上传文档
export const uploadDocument = () => {
  // TODO: 上传文档
}
