import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLeadModalOpen: false,
    leadModalService: undefined as string | undefined,
  }),
  actions: {
    openLeadModal(serviceName?: string) {
      this.leadModalService = serviceName
      this.isLeadModalOpen = true
    },
    closeLeadModal() {
      this.isLeadModalOpen = false
    },
  },
})
