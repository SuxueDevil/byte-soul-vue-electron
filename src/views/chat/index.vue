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
    <!-- 1、主内容区域 -->
    <div class="main-content">
<!-- 一、左侧配置面板 -->
<div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
  <div class="sidebar-header">
    <div class="nav-items">
<!-- 折叠按钮 -->
<div class="nav-item sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed">
  <i :class="sidebarCollapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"></i>
</div>
      <!-- 1、对话导航 -->
      <div class="nav-item" :class="{ active: activePanel === 'chat' }" @click="activePanel = 'chat'">
        <i class="pi pi-comments"></i>
        <span v-if="!sidebarCollapsed">对话</span>
      </div>
<!-- 2、知识库导航 -->
<div class="nav-item" :class="{ active: activePanel === 'knowledge' }" @click="activePanel = 'knowledge'">
  <i class="pi pi-book"></i>
  <span v-if="!sidebarCollapsed">知识库</span>
</div>
<!-- 3、插件导航 -->
<div class="nav-item" :class="{ active: activePanel === 'plugins' }" @click="activePanel = 'plugins'">
  <i class="pi pi-box"></i>
  <span v-if="!sidebarCollapsed">插件</span>
      </div>
      <!-- 4、设置导航 -->
      <div class="nav-item" :class="{ active: activePanel === 'settings' }" @click="activePanel = 'settings'">
        <i class="pi pi-cog"></i>
        <span v-if="!sidebarCollapsed">设置</span>
      </div>
    </div>
  </div>
  
  <!-- 二、侧边栏内容 -->
  <div class="sidebar-content" v-if="!sidebarCollapsed">
    <!-- 1、对话面板 -->
    <transition name="fade" mode="out-in">
      <div v-if="activePanel === 'chat'" key="chat" class="panel-section">
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
      <div v-else-if="activePanel === 'knowledge'" key="knowledge" class="panel-section">
        <div class="panel-header">
          <h3>知识库</h3>
        </div>
        <div class="knowledge-list">
          <div v-for="doc in documents" :key="doc.id" class="knowledge-item">
            <i class="pi pi-file"></i>
            <div class="doc-info">
              <span class="doc-name">{{ doc.name }}</span>
              <span class="doc-size">{{ doc.size }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 3、插件面板 -->
      <div v-else-if="activePanel === 'plugins'" key="plugins" class="panel-section">
        <div class="panel-header">
          <h3>插件</h3>
        </div>
        <div class="empty-state">
          <i class="pi pi-puzzle-piece"></i>
          <p>暂无插件</p>
        </div>
      </div>
      
      <!-- 4、设置面板 -->
      <div v-else-if="activePanel === 'settings'" key="settings" class="panel-section">
        <div class="panel-header">
          <h3>设置</h3>
        </div>
        <div class="empty-state">
          <i class="pi pi-cog"></i>
          <p>设置功能开发中</p>
        </div>
      </div>
    </transition>
  </div>
</div>
      
      <!-- 三、中间内容区域 -->
      <div class="chat-area">
        <!-- 对话模式 -->
        <template v-if="activePanel === 'chat'">
          <!-- 1、消息列表 -->
          <div class="messages" ref="messagesContainer">
            <!-- 空状态 - 欢迎页 -->
            <div v-if="messages.length === 0" class="welcome-page">
              <div class="welcome-content">
                <h1 class="welcome-title">ByteSoul</h1>
                <div class="welcome-suggestions">
                  <div
                    v-for="(item, index) in suggestions"
                    :key="item.text"
                    class="suggestion-card"
                    @click="sendMessage(item.text)"
                  >
                    <i :class="item.icon"></i>
                    <span>{{ item.text }}</span>
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
        </template>
        
        <!-- RAG 知识库模式 -->
        <template v-else-if="activePanel === 'knowledge'">
          <div class="rag-panel">
            <!-- 头部 -->
            <div class="rag-header">
              <h2>RAG 知识库</h2>
              <Button label="上传文档" icon="pi pi-upload" @click="showUploadDialog = true" />
            </div>
            
            <!-- 统计卡片 -->
            <div class="stats-grid">
              <div class="stat-card">
                <i class="pi pi-file"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ documents.length }}</span>
                  <span class="stat-label">文档总数</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="pi pi-database"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ totalChunks }}</span>
                  <span class="stat-label">分块总数</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="pi pi-chart-line"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ ragConfig.topK }}</span>
                  <span class="stat-label">召回数量</span>
                </div>
              </div>
              <div class="stat-card">
                <i class="pi pi-bolt"></i>
                <div class="stat-info">
                  <span class="stat-value">{{ ragConfig.enableRerank ? '开' : '关' }}</span>
                  <span class="stat-label">重排序</span>
                </div>
              </div>
            </div>
            
            <!-- 配置和文档列表 -->
            <div class="rag-content">
              <!-- 左侧：检索配置 -->
              <div class="config-panel">
                <h3>检索配置</h3>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>Top K</label>
                    <p class="config-desc">返回最相关的 K 个文档片段</p>
                  </div>
                  <InputNumber v-model="ragConfig.topK" :min="1" :max="20" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>相似度阈值</label>
                    <p class="config-desc">低于阈值的结果将被过滤</p>
                  </div>
                  <InputNumber v-model="ragConfig.scoreThreshold" :min="0" :max="1" :step="0.1" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>向量检索</label>
                    <p class="config-desc">基于语义相似度的检索</p>
                  </div>
                  <ToggleButton v-model="ragConfig.enableVector" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>BM25 检索</label>
                    <p class="config-desc">基于关键词匹配的检索</p>
                  </div>
                  <ToggleButton v-model="ragConfig.enableBM25" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>重排序</label>
                    <p class="config-desc">使用 Cross-Encoder 重新排序</p>
                  </div>
                  <ToggleButton v-model="ragConfig.enableReranker" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>查询改写</label>
                    <p class="config-desc">优化检索词提升召回率</p>
                  </div>
                  <ToggleButton v-model="ragConfig.enableRewrite" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>查询扩展</label>
                    <p class="config-desc">生成多个相关查询扩大召回</p>
                  </div>
                  <ToggleButton v-model="ragConfig.enableExpansion" />
                </div>
              </div>
              
              <!-- 右侧：文档列表 -->
              <div class="document-panel">
                <h3>文档列表</h3>
                <div class="document-list">
                  <div v-for="doc in documents" :key="doc.id" class="document-item">
                    <i class="pi pi-file"></i>
                    <div class="doc-info">
                      <span class="doc-name">{{ doc.name }}</span>
                      <span class="doc-meta">{{ doc.size }} · {{ doc.chunks }} 个分块</span>
                    </div>
                    <Button icon="pi pi-trash" text severity="danger" @click="deleteDocument(doc.id)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- 其他面板（插件、设置） -->
        <template v-else>
          <div class="empty-panel">
            <i class="pi pi-cog"></i>
            <p>{{ activePanel === 'plugins' ? '插件功能开发中' : '设置功能开发中' }}</p>
          </div>
        </template>
      </div>
      
      <!-- 四、文件树面板 -->
      <div class="file-panel" :class="{ collapsed: filePanelCollapsed }">
        <div class="file-header">
          <h3 v-if="!filePanelCollapsed">文件浏览器</h3>
          <Button :icon="filePanelCollapsed ? 'pi pi-chevron-left' : 'pi pi-chevron-right'" text @click="filePanelCollapsed = !filePanelCollapsed" />
        </div>
        
        <!-- 1、搜索框 -->
        <div v-if="showSearch && !filePanelCollapsed" class="file-search">
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

import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ToggleButton from 'primevue/togglebutton'
import FileTreeNode from '@/components/file/FileTreeNode.vue'
import '@/assets/styles/chat.css'

// 2、建议卡片数据
const suggestions = [
  { icon: 'pi pi-upload', text: '知识上传' },
  { icon: 'pi pi-search', text: 'RAG浏览' },
  { icon: 'pi pi-sitemap', text: '知识图谱' },
  { icon: 'pi pi-cog', text: '模型配置' }
]

// ==================== 二、状态 ====================

const router = useRouter()

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
const filePanelCollapsed = ref(false)
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
  { id: '1', name: '项目文档.pdf', size: '2.4 MB', chunks: 156 },
  { id: '2', name: 'API 说明.md', size: '156 KB', chunks: 45 }
])

// 8、RAG 配置
const ragConfig = ref({
  topK: 5,
  scoreThreshold: 0.7,
  enableVector: true,
  enableBM25: true,
  enableReranker: true,
  enableRewrite: true,
  enableExpansion: true
})

// 9、上传对话框
const showUploadDialog = ref(false)

// 10、总分块数
const totalChunks = computed(() => {
  return documents.value.reduce((sum, doc) => sum + doc.chunks, 0)
})

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
  showUploadDialog.value = true
}

// 8、删除文档
const deleteDocument = (id: string) => {
  documents.value = documents.value.filter(doc => doc.id !== id)
}
</script>

<style scoped>
/* 样式已抽离到 chat.css */
</style>
