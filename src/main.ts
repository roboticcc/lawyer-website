import { createHead } from '@unhead/vue'
import { createApp } from './app'
import { router } from './router'
import './assets/main.css'

const mountPoint = document.querySelector('#app')
const requestedRoute = window.location.pathname.replace(/\/+$/, '') || '/'
const prerenderedRoute = mountPoint?.getAttribute('data-prerendered-route')
const hydrate = Boolean(mountPoint?.hasChildNodes()) &&
  (!prerenderedRoute || prerenderedRoute === requestedRoute)
const app = createApp(router, createHead(), hydrate)

router.isReady().then(() => app.mount('#app'))
