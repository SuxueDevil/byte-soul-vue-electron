<!--
  @description RAG 知识库管理页面
  @author ByteSoul Team
  @created 2024-01-15
  
  功能说明：
  - 知识库统计
  - 检索配置
  - 文档管理（上传、删除）
  - 知识图谱
-->

<template>
  <div class="rag-view">
    <!-- 一、页面头部 -->
    <div class="rag-header">
      <div class="header-left">
        <Button icon="pi pi-arrow-left" text @click="goBack" />
        <h1>RAG 知识库</h1>
      </div>
      <Button label="上传文档" icon="pi pi-upload" @click="showUploadDialog = true" />
    </div>

    <!-- 二、统计卡片 -->
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

    <!-- 三、主要内容 -->
    <div class="rag-content">
      <!-- 左侧：检索配置 -->
      <div class="config-panel">
        <h2>检索配置</h2>
        <div class="config-section">
          <div class="config-item">
            <label>Top K</label>
            <p class="config-desc">返回最相关的 K 个文档片段</p>
            <InputNumber v-model="ragConfig.topK" :min="1" :max="20" />
          </div>
          <div class="config-item">
            <label>相似度阈值</label>
            <p class="config-desc">低于阈值的结果将被过滤</p>
            <InputNumber v-model="ragConfig.threshold" :min="0" :max="1" :step="0.1" />
          </div>
          <div class="config-item">
            <label>启用重排序</label>
            <p class="config-desc">使用 Cross-Encoder 重新排序</p>
            <ToggleButton v-model="ragConfig.enableRerank" />
          </div>
          <div class="config-item">
            <label>启用查询改写</label>
            <p class="config-desc">优化检索词提升召回率</p>
            <ToggleButton v-model="ragConfig.enableRewrite" />
          </div>
        </div>
        
        <!-- 检索预览 -->
        <div class="retrieval-preview">
          <h3>检索预览</h3>
          <div class="preview-input">
            <InputText v-model="previewQuery" placeholder="输入测试查询..." />
            <Button label="测试" @click="testRetrieval" />
          </div>
          <div v-if="previewResults.length > 0" class="preview-results">
            <div v-for="(result, index) in previewResults" :key="index" class="preview-item">
              <div class="preview-score">{{ (result.score * 100).toFixed(1) }}%</div>
              <div class="preview-content">{{ result.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：文档列表 -->
      <div class="document-panel">
        <div class="panel-header">
          <h2>文档列表</h2>
          <div class="header-actions">
            <InputText v-model="searchDoc" placeholder="搜索文档..." />
            <Button label="批量删除" severity="danger" text :disabled="selectedDocs.length === 0" />
          </div>
        </div>
        
        <div class="document-list">
          <div
            v-for="doc in filteredDocuments"
            :key="doc.id"
            class="document-item"
            :class="{ selected: selectedDocs.includes(doc.id) }"
            @click="toggleSelect(doc.id)"
          >
            <Checkbox v-model="selectedDocs" :value="doc.id" />
            <div class="doc-icon">
              <i :class="getFileIcon(doc.type)"></i>
            </div>
            <div class="doc-info">
              <span class="doc-name">{{ doc.name }}</span>
              <span class="doc-meta">{{ doc.size }} · {{ doc.chunks }} 个分块 · {{ doc.date }}</span>
            </div>
            <div class="doc-actions">
              <Button icon="pi pi-eye" text @click.stop="previewDoc(doc)" />
              <Button icon="pi pi-trash" text severity="danger" @click.stop="deleteDocument(doc.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上传对话框 -->
    <Dialog v-model:visible="showUploadDialog" modal header="上传文档" :style="{ width: '500px' }">
      <div class="upload-content">
        <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
          <i class="pi pi-cloud-upload"></i>
          <p>拖拽文件到此处或点击上传</p>
          <input type="file" multiple @change="handleFileSelect" accept=".pdf,.md,.txt,.docx" />
        </div>
        <div class="upload-options">
          <div class="option-item">
            <label>分块大小</label>
            <InputNumber v-model="uploadOptions.chunkSize" :min="100" :max="2000" />
          </div>
          <div class="option-item">
            <label>分块重叠</label>
            <InputNumber v-model="uploadOptions.chunkOverlap" :min="0" :max="500" />
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="取消" text @click="showUploadDialog = false" />
        <Button label="上传" @click="uploadFiles" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
// ==================== 一、导入 ====================

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import ToggleButton from 'primevue/togglebutton'
import Checkbox from 'primevue/checkbox'
import Dialog from 'primevue/dialog'
import '@/assets/styles/rag.css'

// ==================== 二、类型定义 ====================

interface Document {
  id: string
  name: string
  type: string
  size: string
  chunks: number
  date: string
}

interface PreviewResult {
  content: string
  score: number
}

// ==================== 三、状态 ====================

const router = useRouter()

// 1、文档列表
const documents = ref<Document[]>([
  { id: '1', name: '项目文档.pdf', type: 'pdf', size: '2.4 MB', chunks: 156, date: '2024-01-15' },
  { id: '2', name: 'API 说明.md', type: 'md', size: '156 KB', chunks: 45, date: '2024-01-14' },
  { id: '3', name: '设计规范.docx', type: 'docx', size: '1.8 MB', chunks: 89, date: '2024-01-13' }
])

// 2、RAG 配置
const ragConfig = ref({
  topK: 5,
  threshold: 0.7,
  enableRerank: true,
  enableRewrite: true
})

// 3、搜索和选择
const searchDoc = ref('')
const selectedDocs = ref<string[]>([])

// 4、上传对话框
const showUploadDialog = ref(false)
const uploadOptions = ref({
  chunkSize: 500,
  chunkOverlap: 50
})

// 5、检索预览
const previewQuery = ref('')
const previewResults = ref<PreviewResult[]>([])

// ==================== 四、计算属性 ====================

// 1、总分块数
const totalChunks = computed(() => {
  return documents.value.reduce((sum, doc) => sum + doc.chunks, 0)
})

// 2、过滤后的文档
const filteredDocuments = computed(() => {
  if (!searchDoc.value) return documents.value
  return documents.value.filter(doc =>
    doc.name.toLowerCase().includes(searchDoc.value.toLowerCase())
  )
})

// ==================== 五、方法 ====================

// 1、返回对话页
const goBack = () => {
  router.push('/')
}

// 2、切换选择
const toggleSelect = (id: string) => {
  const index = selectedDocs.value.indexOf(id)
  if (index === -1) {
    selectedDocs.value.push(id)
  } else {
    selectedDocs.value.splice(index, 1)
  }
}

// 3、获取文件图标
const getFileIcon = (type: string) => {
  const icons: Record<string, string> = {
    pdf: 'pi pi-file-pdf',
    md: 'pi pi-file-edit',
    docx: 'pi pi-file-word',
    txt: 'pi pi-file'
  }
  return icons[type] || 'pi pi-file'
}

// 4、预览文档
const previewDoc = (doc: Document) => {
  console.log('预览文档:', doc)
}

// 5、删除文档
const deleteDocument = (id: string) => {
  documents.value = documents.value.filter(doc => doc.id !== id)
  selectedDocs.value = selectedDocs.value.filter(docId => docId !== id)
}

// 6、测试检索
const testRetrieval = () => {
  // TODO: 调用 pyAgent API 测试检索
  previewResults.value = [
    { content: '这是第一个检索结果...', score: 0.95 },
    { content: '这是第二个检索结果...', score: 0.87 },
    { content: '这是第三个检索结果...', score: 0.76 }
  ]
}

// 7、处理文件拖拽
const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    console.log('拖拽的文件:', files)
  }
}

// 8、处理文件选择
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    console.log('选择的文件:', input.files)
  }
}

// 9、上传文件
const uploadFiles = () => {
  // TODO: 调用 pyAgent API 上传文件
  showUploadDialog.value = false
}
</script>

<style scoped>
/* 样式已抽离到 rag.css */
</style>
