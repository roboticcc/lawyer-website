import { renderToString } from 'vue/server-renderer'
import { createServerHead } from '@unhead/vue'
import { createApp } from './app'
import { createAppRouter } from './router'

export async function render(url: string) {
  const router = createAppRouter(true)
  await router.push(url)
  await router.isReady()

  const head = createServerHead()
  const body = await renderToString(createApp(router, head))

  return { body, tags: await head.resolveTags() }
}
