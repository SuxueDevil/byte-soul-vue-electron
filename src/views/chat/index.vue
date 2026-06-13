<!--
  @description 对话页视图
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 多项目标签页管理
  - 侧边栏（对话、知识库、插件、设置）
  - 对话消息区域
  - 文件树
-->

<template>
  <!-- 一、页面容器 -->
  <div class="chat-view">
    <!-- 1、顶部标签栏 -->
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
    
    <!-- 2、主内容区域 -->
    <div class="main-content">
      <!-- 一、左侧配置面板 -->
      <div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
        <div class="sidebar-header">
          <div class="nav-items">
            <!-- 1、对话导航 -->
            <div class="nav-item active" @click="activePanel = 'chat'">
              <i class="pi pi-comments"></i>
              <span v-if="!sidebarCollapsed">对话</span>
            </div>
            <!-- 2、知识库导航 -->
            <div class="nav-item" @click="activePanel = 'knowledge'">
              <i class="pi pi-book"></i>
              <span v-if="!sidebarCollapsed">知识库</span>
            </div>
            <!-- 3、插件导航 -->
            <div class="nav-item" @click="activePanel = 'plugins'">
              <i class="pi pi-puzzle-piece"></i>
              <span v-if="!sidebarCollapsed">插件</span>
            </div>
            <!-- 4、设置导航 -->
            <div class="nav-item" @click="activePanel = 'settings'">
              <i class="pi pi-cog"></i>
              <span v-if="!sidebarCollapsed">设置</span>
            </div>
          </div>
        </div>
        
        <!-- 二、侧边栏内容 -->
        <div class="sidebar-content" v-if="!sidebarCollapsed">
          <!-- 1、对话面板 -->
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
          
          <!-- 2、知识库面板 -->
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
        
        <!-- 三、折叠按钮 -->
        <div class="sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed">
          <i :class="sidebarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"></i>
        </div>
      </div>
      
      <!-- 三、对话区域 -->
      <div class="chat-area">
        <!-- 1、消息列表 -->
        <div class="messages" ref="messagesContainer">
          <!-- 空状态 - Codex 风格欢迎页 -->
          <div v-if="messages.length === 0" class="welcome-page">
            <div class="welcome-content">
<div class="welcome-logo">
  <i class="pi pi-code"></i>
</div>
<h1 class="welcome-title">ByteSoul</h1>
<div class="welcome-suggestions">
  <div class="suggestion-card" @click="sendMessage('知识上传')">
    <i class="pi pi-upload"></i>
    <span>知识上传</span>
  </div>
  <div class="suggestion-card" @click="sendMessage('RAG浏览')">
    <i class="pi pi-search"></i>
    <span>RAG浏览</span>
  </div>
  <div class="suggestion-card" @click="sendMessage('知识图谱')">
    <i class="pi pi-sitemap"></i>
    <span>知识图谱</span>
  </div>
  <div class="suggestion-card" @click="sendMessage('模型配置')">
    <i class="pi pi-cog"></i>
    <span>模型配置</span>
  </div>
</div>
            </div>
          </div>
          
          <!-- 消息列表 -->
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
        
        <!-- 2、输入区域 -->
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
      
      <!-- 四、文件树面板 -->
      <div class="file-panel">
        <div class="file-header">
          <h3>文件浏览器</h3>
          <Button icon="pi pi-search" text @click="showSearch = !showSearch" />
        </div>
        
        <!-- 1、搜索框 -->
        <div v-if="showSearch" class="file-search">
          <InputText v-model="searchQuery" placeholder="搜索文件..." />
        </div>
        
        <!-- 2、文件树 -->
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
// ==================== 一、导入 ====================

import { ref, reactive } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FileTreeNode from '@/components/file/FileTreeNode.vue'
import '@/assets/styles/chat.css'

// ==================== 二、状态 ====================

// 1、标签页
const projectTabs = ref([])
const activeTab = ref('')

// 2、侧边栏
const sidebarCollapsed = ref(false)
const activePanel = ref('chat')

// 3、会话
const sessions = ref([])
const activeSession = ref('')

// 4、消息
const messages = ref([])

// 5、输入
const inputText = ref('')
const messagesContainer = ref<HTMLElement>()

// 6、文件树
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

// 7、知识库
const documents = ref([
  { id: '1', name: '项目文档.pdf' },
  { id: '2', name: 'API 说明.md' }
])

// ==================== 三、方法 ====================

// 1、关闭标签页
const closeTab = (id: string) => {
  projectTabs.value = projectTabs.value.filter(tab => tab.id !== id)
}

// 2、添加标签页
const addTab = () => {
  const newId = String(Date.now())
  projectTabs.value.push({ id: newId, name: `项目 ${newId}` })
}

// 3、创建会话
const createSession = () => {
  const newId = String(Date.now())
  sessions.value.push({ id: newId, name: `新会话 ${newId}` })
}

// 4、发送消息
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

// 5、附加文件
const attachFile = () => {
  // TODO: 附加文件
}

// 6、附加图片
const attachImage = () => {
  // TODO: 附加图片
}

// 7、上传文档
const uploadDocument = () => {
  // TODO: 上传文档
}
</script>

<style scoped>
/* 样式已抽离到 chat.css */
</style>
