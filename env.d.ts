/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_ENABLE_MOCK_DATA: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  // Extend Window interface for global types
  interface Window {
    __INITIAL_DATA__?: any
    __APP_VERSION__?: string
  }