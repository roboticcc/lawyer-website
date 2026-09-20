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
    <section class="section-soft site-section--compact">
      <div class="site-container grid gap-8 border-b border-white/15 pb-10 md:grid-cols-[1fr_0.7fr] md:items-end">
        <h1 class="display-title">
          Порядок работы
        </h1>
        <p class="max-w-xl text-lg text-[#b9b5ad]">
          Прозрачный и понятный процесс защиты ваших интересов на каждом этапе
        </p>
      </div>
    </section>

    <WorkProcess :steps="workSteps" />
  </MainLayout>
</template>
