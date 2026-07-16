import { defineStore } from 'pinia'
import servicesData from '@/data/services.json'
import type { Service } from '@/types'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: servicesData as Service[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getBySlug: (state) => (slug: string): Service | undefined =>
      state.services.find((s) => s.slug === slug),
    byCategory: (state) => (category: string): Service[] =>
      state.services.filter((s) => s.category === category),
    criminalCases: (state): Service[] =>
      state.services.filter((s) => s.category === 'Уголовные дела'),
    mainCatalog: (state): Service[] => {
      const order = [
        'sluzhba-po-delu-o-narkotikah',
        'ugolovnye-dela',
        'krazha-grabezh-moshennichestvo',
        'ekonomicheskie-prestupleniya',
      ]
      return order
        .map((slug) => state.services.find((s) => s.slug === slug))
        .filter((s): s is Service => Boolean(s))
    },
  },
})
