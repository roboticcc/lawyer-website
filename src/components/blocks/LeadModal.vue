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
      class="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      @click.self="uiStore.closeLeadModal()"
    >
      <div class="modal-panel relative w-full max-w-md p-6 md:p-9">
        <button
          type="button"
          class="absolute right-4 top-4 text-black/40 hover:text-black"
          aria-label="Закрыть"
          @click="uiStore.closeLeadModal()"
        >
          ✕
        </button>

        <h2
          id="lead-modal-title"
          class="mb-3 text-3xl uppercase"
        >
          Записаться на разбор дела
        </h2>
        <p class="mb-7 text-black/60">
          Оставьте имя и телефон — мы свяжемся с вами в ближайшее время
        </p>

        <ConsultationForm :service-name="uiStore.leadModalService" />

        <a
          :href="`tel:${attorneyStore.attorney.phone}`"
          class="button-outline mt-4 w-full"
        >
          Позвонить сейчас
        </a>
      </div>
    </div>
  </Teleport>
</template>
