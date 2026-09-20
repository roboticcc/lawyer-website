import { createApp as createClientApp, createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import type { Router } from 'vue-router'
import App from './App.vue'
import { createAppI18n } from './i18n'

export const createApp = (router: Router, head: ReturnType<typeof createHead>, hydrate = true) => {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(createAppI18n())
  app.use(head)
  return app
}
