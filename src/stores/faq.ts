import { defineStore } from 'pinia'
import faqData from '@/data/faq.json'
import type { FaqItem } from '@/types'

export const useFaqStore = defineStore('faq', {
  state: () => ({
    faqItems: faqData as FaqItem[],
    loading: false,
    error: null as string | null,
    expandedItems: faqData.length ? [faqData[0].id] : ([] as string[]),
  }),
  getters: {
    byCategory: (state) => (category: string): FaqItem[] =>
      state.faqItems.filter((item) => item.category === category),
    isExpanded: (state) => (id: string): boolean => state.expandedItems.includes(id),
  },
  actions: {
    toggleItem(id: string) {
      const index = this.expandedItems.indexOf(id)
      if (index === -1) {
        this.expandedItems.push(id)
      } else {
        this.expandedItems.splice(index, 1)
      }
    },
  },
})
