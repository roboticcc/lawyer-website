import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OtherPracticesAccordion from './OtherPracticesAccordion.vue'
import groups from '@/data/otherPractices.json'

describe('OtherPracticesAccordion', () => {
  it('opens each additional practice in a separate page', async () => {
    const wrapper = mount(OtherPracticesAccordion)
    await wrapper.find('button').trigger('click')

    const links = wrapper.findAll('a[href^="/uslugi/dopolnitelnye/"]')
    expect(links).toHaveLength(groups[0].items.length)
    expect(links[0].attributes('href')).toBe(`/uslugi/dopolnitelnye/${groups[0].id}/1`)
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
  })
})
