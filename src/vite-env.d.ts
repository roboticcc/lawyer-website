/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADVOKAT_PHONE?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
