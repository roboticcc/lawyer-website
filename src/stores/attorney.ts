import { defineStore } from 'pinia'
import attorneyData from '@/data/attorney.json'
import type { Attorney } from '@/types'
import { CONTACT_PHONE_FORMATTED } from '@/utils/constants'

export const useAttorneyStore = defineStore('attorney', {
  state: () => ({
    attorney: attorneyData as Attorney,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    formattedPhone: (): string => CONTACT_PHONE_FORMATTED,
    serviceRegionsJoined: (state): string => state.attorney.serviceRegions.join(', '),
  },
})
