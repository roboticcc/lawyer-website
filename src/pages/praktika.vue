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
    <section class="py-16 px-4 max-w-7xl mx-auto text-center">
      <h1 class="mb-6">
        Судебная практика
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Реальные примеры из практики — доказательства эффективной защиты
      </p>
    </section>

    <CasesShowcase :cases="casesStore.cases" />
  </MainLayout>
</template>
