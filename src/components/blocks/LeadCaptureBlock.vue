<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <section class="section-soft site-section overflow-hidden">
    <div class="site-container grid items-center gap-12 md:grid-cols-2 md:gap-20">
      <div class="abstract-portrait order-2 md:order-1" aria-hidden="true" />

      <div class="order-1 md:order-2">
        <h2 class="display-title mb-7">
          Оцените шансы на успех вашего дела и получите пошаговый план
        </h2>
        <p class="mb-9 max-w-lg text-lg text-[#b9b5ad]">
          Расскажите, что произошло, и мы найдем законное решение
        </p>
        <button
          type="button"
          class="button-primary"
          @click="uiStore.openLeadModal()"
        >
          Подать заявку
        </button>
      </div>
    </div>

    <div class="site-container mt-20 border-t border-white/15 pt-12 md:mt-28 md:pt-16">
      <h2 class="display-title max-w-5xl">Полное правовое сопровождение: от первой встречи до контроля за исполнением судебного решения</h2>
    </div>
  </section>
</template>
