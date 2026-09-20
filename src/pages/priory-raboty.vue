<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import WorkProcess from '@/components/blocks/WorkProcess.vue'
import { usePageSeo } from '@/composables/useSchemaOrg'
import { workSteps } from '@/data/workSteps'

usePageSeo(
  'Порядок работы с адвокатом Игорем Мосензовым',
  'Как проходит работа с адвокатом: обращение, изучение материалов дела, подготовка позиции и представительство.'
)
</script>

<template>
  <MainLayout>
    <WorkProcess
      :steps="workSteps"
      title="Порядок работы"
      page-heading
    />
  </MainLayout>
</template>
