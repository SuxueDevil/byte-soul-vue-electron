/**
 * @description Electron 主进程
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 创建应用窗口
 * - 管理应用生命周期
 * - 处理 IPC 通信
 */

import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

// ==================== 一、全局变量 ====================

// 1、主窗口实例
let mainWindow: BrowserWindow | null = null

// ==================== 二、工具函数 ====================

/**
 * 获取 Vite 开发服务器 URL
 * vite-plugin-electron 会注入 VITE_DEV_SERVER_URL 环境变量
 */
function getViteDevServerUrl(): string {
  return process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000'
}

// ==================== 三、窗口管理 ====================

/**
 * 创建主窗口
 * - 配置窗口属性
 * - 加载开发/生产环境页面
 * - 监听窗口事件
 */
function createWindow() {
  console.log('Creating Electron window...')
  
  // 1、创建窗口实例
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'ByteSoul Desktop',
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // 2、加载页面
  const isDev = !app.isPackaged
  
  if (isDev) {
    // 开发环境：加载 Vite 开发服务器
    const devUrl = getViteDevServerUrl()
    console.log('Loading dev server:', devUrl)
    mainWindow.loadURL(devUrl)
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境：加载打包后的文件
    console.log('Loading production build')
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }

  // 3、窗口事件 - 等待页面完全加载后再显示
  mainWindow.webContents.on('did-finish-load', () => {
    // 给 Vue 一点时间完成渲染
    setTimeout(() => {
      mainWindow?.show()
      console.log('Window shown')
    }, 200)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// ==================== 四、应用生命周期 ====================

// 1、应用就绪后创建窗口
app.whenReady().then(() => {
  console.log('Electron app ready')
  createWindow()
})

// 2、所有窗口关闭时退出应用（macOS 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 3、macOS 点击 dock 图标时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// ==================== 五、IPC 通信 ====================

// 1、获取应用版本号
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})
