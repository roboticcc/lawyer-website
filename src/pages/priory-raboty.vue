<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import WorkProcess from '@/components/blocks/WorkProcess.vue'
import { usePageSeo, useHowToSchema } from '@/composables/useSchemaOrg'
import { workSteps } from '@/data/workSteps'

usePageSeo(
  'Порядок работы с адвокатом: этапы юридической защиты',
  'Пошаговый алгоритм юридической помощи от первого анализа документов до судебного решения.',
  'порядок работы адвоката, этапы защиты, юридическая помощь'
)

useHowToSchema(workSteps)
</script>

<template>
  <MainLayout>
    <section class="py-16 px-4 max-w-7xl mx-auto text-center">
      <h1 class="mb-6">
        Порядок работы
      </h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Прозрачный и понятный процесс защиты ваших интересов на каждом этапе
      </p>
    </section>

    <WorkProcess :steps="workSteps" />
  </MainLayout>
</template>
