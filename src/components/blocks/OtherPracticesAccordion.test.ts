import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OtherPracticesAccordion from './OtherPracticesAccordion.vue'
import groups from '@/data/otherPractices.json'

describe('OtherPracticesAccordion', () => {
  it('keeps all service links in the HTML and reveals the selected group', async () => {
    const wrapper = mount(OtherPracticesAccordion)
    const links = wrapper.findAll('a[href^="/uslugi/dopolnitelnye/"]')
    expect(links).toHaveLength(groups.reduce((total, group) => total + group.items.length, 0))
    expect(links[0].attributes('href')).toBe(`/uslugi/dopolnitelnye/${groups[0].id}/1`)
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('false')

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').attributes('aria-expanded')).toBe('true')
  })
})
