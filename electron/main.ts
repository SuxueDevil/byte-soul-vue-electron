import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

let mainWindow: BrowserWindow | null = null

// 获取 Vite 开发服务器 URL
function getViteDevServerUrl(): string {
  // vite-plugin-electron 会注入 VITE_DEV_SERVER_URL 环境变量
  return process.env.VITE_DEV_SERVER_URL || 'http://localhost:3000'
}

function createWindow() {
  console.log('Creating Electron window...')
  
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

  // 开发环境加载 Vite 开发服务器
  const isDev = !app.isPackaged
  
  if (isDev) {
    const devUrl = getViteDevServerUrl()
    console.log('Loading dev server:', devUrl)
    mainWindow.loadURL(devUrl)
    mainWindow.webContents.openDevTools()
  } else {
    console.log('Loading production build')
    mainWindow.loadFile(join(__dirname, '../dist/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    console.log('Window shown')
  })

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

// IPC 通信示例
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})
