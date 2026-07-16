/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_YANDEX_METRIKA_ID?: string
  readonly VITE_ADVOKAT_NAME?: string
  readonly VITE_ADVOKAT_REG_NUMBER?: string
  readonly VITE_ADVOKAT_PHONE?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
