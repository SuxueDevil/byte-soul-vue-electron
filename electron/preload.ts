import { contextBridge, ipcRenderer } from 'electron'

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // 窗口控制
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // 文件操作
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('file:write', path, content),
  
  // 终端操作
  createTerminal: () => ipcRenderer.invoke('terminal:create'),
  writeToTerminal: (data: string) => ipcRenderer.invoke('terminal:write', data),
  closeTerminal: () => ipcRenderer.invoke('terminal:close'),
  
  // 事件监听
  onTerminalData: (callback: (data: string) => void) => {
    ipcRenderer.on('terminal:data', (_, data) => callback(data))
  },
  onTerminalExit: (callback: (code: number) => void) => {
    ipcRenderer.on('terminal:exit', (_, code) => callback(code))
  }
})
