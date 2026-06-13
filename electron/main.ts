/**
 * @description Electron 主进程
 * @author ByteSoul Team
 * @created 2024-01-15
 */

import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  console.log('Creating Electron window...')
  
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: 'ByteSoul Desktop',
    show: false,
    backgroundColor: '#F8FAFC',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  const isDev = !app.isPackaged
  
  if (isDev) {
    const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000'
    console.log('Loading:', devUrl)
    
    // 加载页面
    mainWindow.loadURL(devUrl)
    mainWindow.webContents.openDevTools()
    
    // 等待 dom-ready 后再延迟显示，确保 Vue 渲染完成
    mainWindow.webContents.once('dom-ready', () => {
      console.log('DOM ready, waiting for Vue...')
      setTimeout(() => {
        console.log('Showing window')
        mainWindow?.show()
      }, 2000)
    })
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
    mainWindow.once('ready-to-show', () => {
      mainWindow?.show()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  console.log('Electron app ready')
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})
