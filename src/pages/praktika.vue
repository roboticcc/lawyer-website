<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import CasesShowcase from '@/components/blocks/CasesShowcase.vue'
import { useCasesStore } from '@/stores/cases'
import { usePageSeo } from '@/composables/useSchemaOrg'

const casesStore = useCasesStore()

usePageSeo(
  'Демонстрационные примеры дел',
  'Иллюстративные описания юридических дел. Материалы судебных решений пока не опубликованы.',
  { noindex: true }
)
</script>

<template>
  <MainLayout>
    <section class="section-soft site-section--compact">
      <div class="site-container grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[1fr_0.7fr] md:items-end">
        <h1 class="display-title">
          Примеры дел
        </h1>
        <p class="max-w-xl text-lg text-[#b9b5ad]">
          Демонстрационные описания дел. Судебные акты будут добавлены после проверки.
        </p>
      </div>
    </section>

    <CasesShowcase
      :cases="casesStore.cases"
      :show-heading="false"
    />
  </MainLayout>
</template>
