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
    show: true,
    backgroundColor: '#FFFFFF',
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
    
    // 先加载一个简单的 loading 页面
    mainWindow.loadURL('data:text/html,<html><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif"><h1>Loading ByteSoul...</h1></body></html>')
    
    // 延迟加载实际页面
    setTimeout(() => {
      console.log('Loading actual app...')
      mainWindow?.loadURL(devUrl)
      mainWindow?.webContents.openDevTools()
    }, 2000)
  } else {
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
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
