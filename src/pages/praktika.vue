<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import CasesShowcase from '@/components/blocks/CasesShowcase.vue'
import { useCasesStore } from '@/stores/cases'
import { usePageSeo } from '@/composables/useSchemaOrg'

const casesStore = useCasesStore()

usePageSeo(
  'Судебная практика адвоката: реальные примеры дел',
  'Примеры успешно завершенных судебных процессов: оправдательные приговоры, прекращение дел, взыскание компенсаций.',
  'судебная практика, примеры дел адвоката, выигранные дела'
)
</script>

<template>
  <MainLayout>
    <section class="section-soft site-section--compact">
      <div class="site-container grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[1fr_0.7fr] md:items-end">
      <h1 class="display-title">
        Судебная практика
      </h1>
      <p class="max-w-xl text-lg text-[#b9b5ad]">
        Реальные примеры из практики — доказательства эффективной защиты
      </p>
      </div>
    </section>

    <CasesShowcase :cases="casesStore.cases" />
  </MainLayout>
</template>
