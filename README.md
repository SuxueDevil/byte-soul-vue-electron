# ByteSoul Desktop

AI 代码助手桌面端应用，对接 ByteSoul pyAgent 后端。

后端地址：https://github.com/SuxueDevil/byte-soul-py

<img width="1919" height="966" alt="image" src="https://github.com/user-attachments/assets/b5f07617-1cc6-408a-8f12-735ce7e78864" />


## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Electron | ^28.0.0 | 跨平台桌面应用框架 |
| Vue 3 | ^3.4.0 | 前端框架（Composition API） |
| TypeScript | ^5.3.0 | 类型安全 |
| Vite | ^5.0.0 | 构建工具 |
| PrimeVue | ^4.5.5 | UI 组件库（Aura Noir 主题） |
| Pinia | ^2.1.0 | 状态管理 |
| Vue Router | ^4.2.0 | 路由管理 |
| PrimeVue 4 | ^4.5.5 | UI 组件库（黑白色调） |

## 目录结构

```
src/
├── api/                    # API 服务
│   ├── client.ts           # HTTP 客户端（拦截器）
│   ├── modules/            # API 模块
│   └── index.ts
├── assets/styles/          # 样式文件
├── components/             # 通用组件
├── config/                 # 应用配置
├── constants/              # 常量定义
├── layouts/                # 布局组件
├── router/                 # 路由配置
├── stores/                 # Pinia 状态
├── types/                  # TypeScript 类型
├── utils/                  # 工具函数
├── views/                  # 页面视图
│   ├── chat/               # 对话页
│   └── settings/           # 设置页
├── App.vue
└── main.ts
```

## 功能模块

### 对话界面
- 欢迎页（快捷操作卡片）
- 消息列表（用户/助手消息）
- 输入框（支持图片/文件粘贴）
- 网格纸背景

### RAG 知识库
- 统计卡片（文档数、分块数、召回数）
- 检索配置（Top K、相似度阈值、向量检索、BM25、重排序、查询改写、查询扩展）
- 文档列表（搜索、删除）
- 上传文档对话框

### 设置页面
- 主题切换（暗色/亮色）
- pyAgent 连接配置
- 编辑器配置

### 其他
- 侧边栏导航（可收缩）
- 右侧文件树（可收缩）
- 多项目标签页（预留）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```
