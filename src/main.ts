import { createHead } from '@unhead/vue'
import { createApp } from './app'
import { router } from './router'
import './assets/main.css'

const mountPoint = document.querySelector('#app')
const app = createApp(router, createHead(), Boolean(mountPoint?.hasChildNodes()))

router.isReady().then(() => app.mount('#app'))
