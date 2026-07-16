<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useAttorneyStore } from '@/stores/attorney'
import ConsultationForm from '@/components/blocks/ConsultationForm.vue'

const uiStore = useUiStore()
const attorneyStore = useAttorneyStore()

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') uiStore.closeLeadModal()
}

watch(
  () => uiStore.isLeadModalOpen,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="uiStore.isLeadModalOpen"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      @click.self="uiStore.closeLeadModal()"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative">
        <button
          type="button"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Закрыть"
          @click="uiStore.closeLeadModal()"
        >
          ✕
        </button>

        <h2
          id="lead-modal-title"
          class="text-2xl mb-2"
        >
          Записаться на разбор дела
        </h2>
        <p class="text-gray-600 mb-6">
          Оставьте имя и телефон — мы свяжемся с вами в ближайшее время
        </p>

        <ConsultationForm :service-name="uiStore.leadModalService" />

        <a
          :href="`tel:${attorneyStore.attorney.phone}`"
          class="mt-4 flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-full hover:bg-primary-50 transition-colors font-semibold no-underline"
        >
          Позвонить сейчас
        </a>
      </div>
    </div>
  </Teleport>
</template>
