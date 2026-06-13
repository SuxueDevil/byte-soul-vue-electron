import { ElectronAPI } from '../src/vite-env.d'

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
