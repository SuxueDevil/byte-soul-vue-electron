/**
 * @description Electron 预加载脚本
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 通过 contextBridge 暴露安全的 API 到渲染进程
 * - 避免直接暴露 Node.js API
 */

import { contextBridge, ipcRenderer } from 'electron'

// ==================== 一、暴露 API 到渲染进程 ====================

contextBridge.exposeInMainWorld('electronAPI', {
  // ==================== 二、应用信息 ====================
  
  // 1、获取应用版本号
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // ==================== 三、窗口控制 ====================
  
  // 1、最小化窗口
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  // 2、最大化窗口
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  // 3、关闭窗口
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // ==================== 四、文件操作 ====================
  
  // 1、打开文件对话框
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // 2、打开目录对话框
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  // 3、读取文件内容
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  // 4、写入文件内容
  writeFile: (path: string, content: string) => ipcRenderer.invoke('file:write', path, content),
  
  // ==================== 五、终端操作 ====================
  
  // 1、创建终端
  createTerminal: () => ipcRenderer.invoke('terminal:create'),
  // 2、向终端写入数据
  writeToTerminal: (data: string) => ipcRenderer.invoke('terminal:write', data),
  // 3、关闭终端
  closeTerminal: () => ipcRenderer.invoke('terminal:close'),
  
  // ==================== 六、事件监听 ====================
  
  // 1、监听终端数据
  onTerminalData: (callback: (data: string) => void) => {
    ipcRenderer.on('terminal:data', (_, data) => callback(data))
  },
  // 2、监听终端退出
  onTerminalExit: (callback: (code: number) => void) => {
    ipcRenderer.on('terminal:exit', (_, code) => callback(code))
  }
})
