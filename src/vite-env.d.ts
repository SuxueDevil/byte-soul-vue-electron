/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Electron API 类型声明
interface ElectronAPI {
  getAppVersion: () => Promise<string>
  minimizeWindow: () => Promise<void>
  maximizeWindow: () => Promise<void>
  closeWindow: () => Promise<void>
  openFile: () => Promise<string | null>
  openDirectory: () => Promise<string | null>
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, content: string) => Promise<void>
  createTerminal: () => Promise<void>
  writeToTerminal: (data: string) => Promise<void>
  closeTerminal: () => Promise<void>
  onTerminalData: (callback: (data: string) => void) => void
  onTerminalExit: (callback: (code: number) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
