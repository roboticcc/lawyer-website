import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import MainFooter from './MainFooter.vue'

describe('MainFooter', () => {
  it('opens the privacy policy in the current tab', async () => {
    const page = { template: '<div />' }
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: page },
        { path: '/policy', component: page },
        { path: '/uslugi', component: page },
        { path: '/priory-raboty', component: page },
        { path: '/faq', component: page },
        { path: '/kontakt', component: page },
      ],
    })
    await router.push('/')
    await router.isReady()

    const wrapper = mount(MainFooter, {
      global: { plugins: [createPinia(), router] },
    })
    await wrapper.find('a[href="/policy"]').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/policy')
  })
})
