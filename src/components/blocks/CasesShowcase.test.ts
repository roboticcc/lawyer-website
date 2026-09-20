import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CasesShowcase from './CasesShowcase.vue'
import cases from '@/data/cases.json'

describe('CasesShowcase', () => {
  it('makes every case available as a separate page', () => {
    const wrapper = mount(CasesShowcase, { props: { cases } })
    const links = wrapper.findAll('a[href^="/praktika/"]')

    expect(links).toHaveLength(cases.length)
    expect(links.map((link) => link.attributes('href'))).toEqual(
      cases.map((caseStudy) => `/praktika/${caseStudy.id}`)
    )
    expect(links.every((link) => link.attributes('target') === '_blank')).toBe(true)
  })
})
