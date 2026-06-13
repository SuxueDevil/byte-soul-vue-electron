<template>
  <div class="chat-view">
    <!-- 顶部标签栏 -->
    <div class="tab-bar">
      <div class="tabs">
        <div
          v-for="tab in projectTabs"
          :key="tab.id"
          class="tab"
          :class="{ active: tab.id === activeTab }"
          @click="activeTab = tab.id"
        >
          <span class="tab-name">{{ tab.name }}</span>
          <i class="pi pi-times tab-close" @click.stop="closeTab(tab.id)"></i>
        </div>
        <div class="tab add-tab" @click="addTab">
          <i class="pi pi-plus"></i>
        </div>
      </div>
      <div class="app-title">ByteSoul</div>
    </div>
    
    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧配置面板 -->
      <div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
        <div class="sidebar-header">
          <div class="nav-items">
            <div class="nav-item active" @click="activePanel = 'chat'">
              <i class="pi pi-comments"></i>
              <span v-if="!sidebarCollapsed">对话</span>
            </div>
            <div class="nav-item" @click="activePanel = 'knowledge'">
              <i class="pi pi-book"></i>
              <span v-if="!sidebarCollapsed">知识库</span>
            </div>
            <div class="nav-item" @click="activePanel = 'plugins'">
              <i class="pi pi-puzzle-piece"></i>
              <span v-if="!sidebarCollapsed">插件</span>
            </div>
            <div class="nav-item" @click="activePanel = 'settings'">
              <i class="pi pi-cog"></i>
              <span v-if="!sidebarCollapsed">设置</span>
            </div>
          </div>
        </div>
        
        <div class="sidebar-content" v-if="!sidebarCollapsed">
          <!-- 对话面板 -->
          <div v-if="activePanel === 'chat'" class="panel-section">
            <div class="panel-header">
              <h3>会话列表</h3>
              <Button icon="pi pi-plus" text @click="createSession" />
            </div>
            <div class="session-list">
              <div
                v-for="session in sessions"
                :key="session.id"
                class="session-item"
                :class="{ active: session.id === activeSession }"
                @click="activeSession = session.id"
              >
                <i class="pi pi-comment"></i>
                <span class="session-name">{{ session.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- 知识库面板 -->
          <div v-if="activePanel === 'knowledge'" class="panel-section">
            <div class="panel-header">
              <h3>知识库</h3>
              <Button icon="pi pi-upload" text @click="uploadDocument" />
            </div>
            <div class="knowledge-list">
              <div v-for="doc in documents" :key="doc.id" class="knowledge-item">
                <i class="pi pi-file"></i>
                <span>{{ doc.name }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed">
          <i :class="sidebarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"></i>
        </div>
      </div>
      
      <!-- 中间对话区域 -->
      <div class="chat-area">
        <div class="messages" ref="messagesContainer">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="message.role"
          >
            <div class="message-avatar">
              <i :class="message.role === 'user' ? 'pi pi-user' : 'pi pi-android'"></i>
            </div>
            <div class="message-content">
              <div class="message-text" v-html="message.content"></div>
              <div class="message-time">{{ message.timestamp }}</div>
            </div>
          </div>
        </div>
        
        <div class="input-area">
          <div class="input-wrapper">
            <textarea
              v-model="inputText"
              class="message-input"
              placeholder="输入消息... (Ctrl+Enter 发送)"
              @keydown.ctrl.enter="sendMessage"
            ></textarea>
            <div class="input-actions">
              <Button icon="pi pi-paperclip" text @click="attachFile" />
              <Button icon="pi pi-image" text @click="attachImage" />
              <Button icon="pi pi-send" @click="sendMessage" :disabled="!inputText.trim()" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧文件树 -->
      <div class="file-panel">
        <div class="file-header">
          <h3>文件浏览器</h3>
          <Button icon="pi pi-search" text @click="showSearch = !showSearch" />
        </div>
        
        <div v-if="showSearch" class="file-search">
          <InputText v-model="searchQuery" placeholder="搜索文件..." />
        </div>
        
        <div class="file-tree">
          <FileTreeNode
            v-for="node in fileTree"
            :key="node.path"
            :node="node"
            :depth="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileTreeNode from '@/components/file/FileTreeNode.vue'

// 标签页
const projectTabs = ref([
  { id: '1', name: '项目 A' },
  { id: '2', name: '项目 B' }
])
const activeTab = ref('1')

// 侧边栏
const sidebarCollapsed = ref(false)
const activePanel = ref('chat')

// 会话
const sessions = ref([
  { id: '1', name: '新会话 1' },
  { id: '2', name: '新会话 2' }
])
const activeSession = ref('1')

// 消息
const messages = ref([
  {
    id: '1',
    role: 'assistant' as const,
    content: '你好！我是 ByteSoul AI 助手，有什么可以帮你的吗？',
    timestamp: '10:30'
  }
])

// 输入
const inputText = ref('')
const messagesContainer = ref<HTMLElement>()

// 文件树
const showSearch = ref(false)
const searchQuery = ref('')

const fileTree = ref([
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
const documents = ref([
  { id: '1', name: '项目文档.pdf' },
  { id: '2', name: 'API 说明.md' }
])

// 方法
const closeTab = (id: string) => {
  projectTabs.value = projectTabs.value.filter(tab => tab.id !== id)
}

const addTab = () => {
  const newId = String(Date.now())
  projectTabs.value.push({ id: newId, name: `项目 ${newId}` })
}

const createSession = () => {
  const newId = String(Date.now())
  sessions.value.push({ id: newId, name: `新会话 ${newId}` })
}

const sendMessage = () => {
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

const attachFile = () => {
  // TODO: 附加文件
}

const attachImage = () => {
  // TODO: 附加图片
}

const uploadDocument = () => {
  // TODO: 上传文档
}
</script>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 顶部标签栏 */
.tab-bar {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: var(--color-primary);
  border-bottom: 1px solid var(--color-secondary);
}

.tabs {
  display: flex;
  flex: 1;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md);
  height: 100%;
  cursor: pointer;
  border-right: 1px solid var(--color-secondary);
  white-space: nowrap;
}

.tab.active {
  background-color: var(--color-bg);
}

.tab-close {
  font-size: 12px;
  opacity: 0.6;
}

.tab-close:hover {
  opacity: 1;
}

.add-tab {
  padding: 0 var(--spacing-sm);
}

.app-title {
  padding: 0 var(--spacing-md);
  font-weight: 600;
  color: var(--color-text-muted);
}

/* 主内容区域 */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 240px;
  background-color: var(--color-primary);
  border-right: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-normal);
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: var(--spacing-md);
}

.nav-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-normal);
}

.nav-item:hover,
.nav-item.active {
  background-color: var(--color-secondary);
  color: var(--color-text);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.panel-header h3 {
  font-size: 14px;
  font-weight: 600;
}

.session-list,
.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.session-item,
.knowledge-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-normal);
}

.session-item:hover,
.knowledge-item:hover {
  background-color: var(--color-secondary);
}

.session-item.active {
  background-color: var(--color-secondary);
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  cursor: pointer;
  border-top: 1px solid var(--color-secondary);
}

/* 对话区域 */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.message {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-content {
  max-width: 70%;
}

.message-text {
  padding: var(--spacing-md);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
}

.message.user .message-text {
  background-color: var(--color-cta);
  color: #000;
}

.message-time {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: var(--spacing-xs);
}

.input-area {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-secondary);
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
}

.message-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--color-text);
  font-family: var(--font-ui);
  font-size: 14px;
  resize: none;
  outline: none;
  min-height: 40px;
  max-height: 200px;
}

.input-actions {
  display: flex;
  gap: var(--spacing-xs);
}

/* 文件面板 */
.file-panel {
  width: 260px;
  background-color: var(--color-primary);
  border-left: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
}

.file-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-secondary);
}

.file-header h3 {
  font-size: 14px;
  font-weight: 600;
}

.file-search {
  padding: var(--spacing-md);
}

.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm);
}
</style>
