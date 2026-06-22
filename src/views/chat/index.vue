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
      <div class="nav-item" :class="{ active: activePanel === 'chat' }" @click="switchPanel('chat')">
        <i class="pi pi-comments"></i>
        <span v-if="!sidebarCollapsed">对话</span>
      </div>
<!-- 2、知识库导航 -->
<div class="nav-item" :class="{ active: activePanel === 'knowledge' }" @click="switchPanel('knowledge')">
  <i class="pi pi-book"></i>
  <span v-if="!sidebarCollapsed">知识库</span>
</div>
<!-- 3、插件导航 -->
<div class="nav-item" :class="{ active: activePanel === 'plugins' }" @click="switchPanel('plugins')">
  <i class="pi pi-box"></i>
  <span v-if="!sidebarCollapsed">插件</span>
      </div>
      <!-- 4、设置导航 -->
      <div class="nav-item" :class="{ active: activePanel === 'settings' }" @click="switchPanel('settings')">
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
                    @click="handleSuggestion(item)"
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
              <div class="message-bubble">
                <div v-if="message.role === 'user' || message.content" class="message-text">{{ message.content }}</div>
                <div v-else class="thinking-wrapper">
                  <ProgressSpinner style="width:20px;height:20px" strokeWidth="3" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- 2、输入区域 -->
          <div class="input-area">
            <div class="input-wrapper">
              <textarea
                v-model="inputText"
                class="message-input"
                placeholder="输入消息... (Enter 发送)"
                @keydown.enter.prevent="sendMessage()"
              ></textarea>
              <div class="input-actions">
                <Button icon="pi pi-paperclip" text @click="attachFile" />
                <Button icon="pi pi-image" text @click="attachImage" />
                <Button icon="pi pi-send" :text="!inputText.trim()" :severity="inputText.trim() ? 'contrast' : undefined" @click="sendMessage" :disabled="!inputText.trim()" />
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
              <Button label="上传文档" icon="pi pi-upload" outlined raised @click="showUploadDialog = true" />
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
                  <span class="stat-value">{{ ragConfig.enableReranker ? '开' : '关' }}</span>
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
                  <InputNumber v-model="ragConfig.topK" :min="1" inputClass="w-full" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>相似度阈值</label>
                    <p class="config-desc">低于阈值的结果将被过滤</p>
                  </div>
                  <div class="threshold-row">
                    <Slider
                      v-model="ragConfig.scoreThreshold"
                      class="threshold-slider"
                      :min="0"
                      :max="1"
                      :step="0.01"
                    />
                    <InputNumber
                      v-model="ragConfig.scoreThreshold"
                      class="threshold-number"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      :minFractionDigits="2"
                      :maxFractionDigits="2"
                    />
                  </div>
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>向量检索</label>
                    <p class="config-desc">基于语义相似度的检索</p>
                  </div>
                  <ToggleSwitch v-model="ragConfig.enableVector" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>BM25 检索</label>
                    <p class="config-desc">基于关键词匹配的检索</p>
                  </div>
                  <ToggleSwitch v-model="ragConfig.enableBM25" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>重排序</label>
                    <p class="config-desc">使用 Cross-Encoder 重新排序</p>
                  </div>
                  <ToggleSwitch v-model="ragConfig.enableReranker" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>查询改写</label>
                    <p class="config-desc">优化检索词提升召回率</p>
                  </div>
                  <ToggleSwitch v-model="ragConfig.enableRewrite" />
                </div>
                <div class="config-item">
                  <div class="config-item-left">
                    <label>查询扩展</label>
                    <p class="config-desc">生成多个相关查询扩大召回</p>
                  </div>
                  <ToggleSwitch v-model="ragConfig.enableExpansion" />
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
    
    <!-- 上传文档对话框 -->
    <Dialog v-model:visible="showUploadDialog" modal header="上传文档" :style="{ width: '450px' }">
      <div class="upload-content">
        <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileInput">
          <i class="pi pi-cloud-upload upload-icon"></i>
          <p>拖拽文件到此处或点击上传</p>
          <span class="upload-hint">支持 PDF、Markdown、TXT 格式</span>
          <input ref="fileInput" type="file" multiple accept=".pdf,.md,.txt" style="display:none" @change="handleFileSelect" />
        </div>
        <div v-if="uploading" class="upload-progress">
          <ProgressSpinner style="width:24px;height:24px" />
          <span>上传中...</span>
        </div>
        <div v-if="uploadResult" class="upload-result">
          <i class="pi pi-check-circle" style="color:#22c55e"></i>
          <span>上传成功，共 {{ uploadResult.chunk_count }} 个分块</span>
        </div>
      </div>
      <template #footer>
        <Button label="取消" text @click="showUploadDialog = false" />
        <Button label="确定" @click="showUploadDialog = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
// ==================== 一、导入 ====================

import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import ToggleSwitch from 'primevue/toggleswitch'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog'
import FileTreeNode from '@/components/file/FileTreeNode.vue'
import '@/assets/styles/chat.css'

const RAG_CONFIG_STORAGE_KEY = 'chat.ragConfig'

// 2、建议卡片数据
const suggestions = [
  { icon: 'pi pi-upload', text: '知识上传', action: 'knowledge' as const },
  { icon: 'pi pi-search', text: 'RAG浏览', action: 'knowledge' as const },
  { icon: 'pi pi-sitemap', text: '知识图谱', action: 'knowledge' as const },
  { icon: 'pi pi-cog', text: '模型配置', action: 'settings' as const }
]

// ==================== 二、状态 ====================

const router = useRouter()

// 1、标签页
const projectTabs = ref([])
const activeTab = ref('')

// 2、侧边栏
const sidebarCollapsed = ref(false)
const activePanel = ref('chat')

const switchPanel = (panel: string) => {
  activePanel.value = panel
  if (panel === 'knowledge') {
    loadDocuments()
  }
}

// 3、会话
const sessions = ref<{ id: string; name: string }[]>([])
const activeSession = ref('')

// 4、消息
const messages = ref<{ id: string; role: string; content: string; timestamp: string }[]>([])

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
const documents = ref<{ id: string; name: string; size: string; chunks: number }[]>([])

const loadDocuments = async () => {
  try {
    const { knowledgeApi } = await import('@/api/modules/knowledge')
    const docs = await knowledgeApi.listDocuments()
    documents.value = docs.map((d: any) => ({
      id: d.doc_hash || d.id,
      name: d.file_name || d.filename || d.name || '未知文件',
      size: d.size || '',
      chunks: d.chunk_count || d.chunks || 0
    }))
  } catch (e) {
    console.warn('加载文档列表失败:', e)
  }
}

// 8、RAG 配置
const defaultRagConfig = () => ({
  topK: 5,
  scoreThreshold: 0.7,
  enableVector: true,
  enableBM25: true,
  enableReranker: true,
  enableRewrite: true,
  enableExpansion: true
})

const ragConfig = ref(defaultRagConfig())

onMounted(() => {
  try {
    const raw = localStorage.getItem(RAG_CONFIG_STORAGE_KEY)
    if (raw) {
      ragConfig.value = { ...defaultRagConfig(), ...JSON.parse(raw) }
    }
  } catch (e) {
    console.warn('读取 RAG 配置失败:', e)
  }
})

watch(
  ragConfig,
  (val) => {
    try {
      localStorage.setItem(RAG_CONFIG_STORAGE_KEY, JSON.stringify(val))
    } catch (e) {
      console.warn('保存 RAG 配置失败:', e)
    }
  },
  { deep: true }
)

// 9、上传对话框
const showUploadDialog = ref(false)
const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const uploadResult = ref<{ chunk_count: number } | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    await uploadFiles(Array.from(target.files))
  }
}

const handleDrop = async (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    await uploadFiles(Array.from(event.dataTransfer.files))
  }
}

const uploadFiles = async (files: File[]) => {
  if (!files.length) return
  uploading.value = true
  uploadResult.value = null
  try {
    const { knowledgeApi } = await import('@/api/modules/knowledge')
    let totalChunks = 0
    for (const file of files) {
      try {
        const result = await knowledgeApi.upload(file)
        totalChunks += result.chunk_count
      } catch (e: any) {
        console.error(`文件 ${file.name} 上传失败:`, e)
        alert(`文件 ${file.name} 上传失败: ${e.message}`)
        return
      }
    }
    uploadResult.value = { chunk_count: totalChunks }
    loadDocuments()
  } catch (error: any) {
    console.error('上传失败:', error)
    alert('上传失败: ' + error.message)
  } finally {
    uploading.value = false
  }
}

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

// 3.5、建议卡片点击
const handleSuggestion = (item: { text: string; action: string }) => {
  if (item.action === 'knowledge' || item.action === 'settings') {
    activePanel.value = item.action
  } else {
    sendMessage(item.text)
  }
}

// 4、发送消息
const sendMessage = async (text?: string) => {
  const content = text || inputText.value.trim()
  if (!content) return
  
  // 1、添加用户消息
  const userMsg = {
    id: String(Date.now()),
    role: 'user' as const,
    content,
    timestamp: new Date().toLocaleTimeString()
  }
  messages.value.push(userMsg)
  inputText.value = ''
  
  // 2、构建请求消息列表（取最近 10 条）
  const chatMessages = messages.value.slice(-10).map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content
  }))
  
  // 3、添加 AI 占位消息
  messages.value.push({
    id: String(Date.now()),
    role: 'assistant' as const,
    content: '',
    timestamp: new Date().toLocaleTimeString()
  })
  const aiMsg = messages.value[messages.value.length - 1]
  
  // 4、调用 API（流式）
  try {
    const { agentApi } = await import('@/api/modules/agent')
    let gotContent = false
    for await (const chunk of agentApi.sendMessage({ messages: chatMessages })) {
      const delta = chunk.choices[0]?.delta
      if (delta?.content) {
        aiMsg.content += delta.content
        gotContent = true
      }
    }
    if (!gotContent && !aiMsg.content) {
      aiMsg.content = '（无响应内容）'
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    aiMsg.content = '抱歉，请求失败，请稍后重试。'
  }
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
const deleteDocument = async (id: string) => {
  try {
    const { knowledgeApi } = await import('@/api/modules/knowledge')
    await knowledgeApi.deleteDocument(id)
    documents.value = documents.value.filter(doc => doc.id !== id)
  } catch (e) {
    console.error('删除文档失败:', e)
    alert('删除失败')
  }
}
</script>

<style scoped>
/* 样式已抽离到 chat.css */
</style>
