declare module 'vite-plugin-electron' {
  import { Plugin } from 'vite'
  
  interface ElectronOptions {
    entry: string
    vite?: {
      build?: {
        outDir?: string
        rollupOptions?: {
          external?: string[]
        }
      }
    }
    onstart?: (options: { reload: () => void }) => void
  }
  
  export default function electron(options: ElectronOptions[]): Plugin
}

declare module 'vite-plugin-electron-renderer' {
  import { Plugin } from 'vite'
  export default function renderer(): Plugin
}
