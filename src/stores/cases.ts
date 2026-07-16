import { defineStore } from 'pinia'
import casesData from '@/data/cases.json'
import type { CaseStudy } from '@/types'

export const useCasesStore = defineStore('cases', {
  state: () => ({
    cases: casesData as CaseStudy[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    byCategory: (state) => (category: string): CaseStudy[] =>
      state.cases.filter((c) => c.category === category),
  },
})
