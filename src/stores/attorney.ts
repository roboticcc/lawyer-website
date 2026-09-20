import { defineStore } from 'pinia'
import attorneyData from '@/data/attorney.json'
import type { Attorney } from '@/types'
import { CONTACT_PHONE } from '@/utils/constants'

export const useAttorneyStore = defineStore('attorney', {
  state: () => ({
    attorney: { ...attorneyData, phone: CONTACT_PHONE } as Attorney,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    formattedPhone: (state): string => state.attorney.phone.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5'),
    serviceRegionsJoined: (state): string => state.attorney.serviceRegions.join(', '),
  },
})
