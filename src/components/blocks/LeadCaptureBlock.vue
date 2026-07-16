<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import { useUiStore } from '@/stores/ui'
import { generateAttorneyAltText } from '@/utils/seo'

const attorneyStore = useAttorneyStore()
const uiStore = useUiStore()
</script>

<template>
  <section class="py-16 px-4 bg-primary-50">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <img
        :src="attorneyStore.attorney.photos.working"
        :alt="generateAttorneyAltText(attorneyStore.attorney)"
        class="w-full h-auto rounded-2xl shadow-xl order-2 md:order-1"
        loading="lazy"
        width="640"
        height="480"
      >

      <div class="order-1 md:order-2">
        <h2 class="mb-4">
          Оцените шансы на успех вашего дела и получите пошаговый план
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Расскажите, что произошло, и мы найдем законное решение
        </p>
        <button
          type="button"
          class="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors font-semibold"
          @click="uiStore.openLeadModal()"
        >
          Подать заявку
        </button>
      </div>
    </div>

    <div class="max-w-4xl mx-auto text-center mt-16">
      <h2>Полное правовое сопровождение: от первой встречи до контроля за исполнением судебного решения</h2>
    </div>
  </section>
</template>
