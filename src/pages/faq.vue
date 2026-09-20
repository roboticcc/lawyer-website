<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import FaqAccordion from '@/components/blocks/FaqAccordion.vue'
import { useFaqStore } from '@/stores/faq'
import { usePageSeo, useFaqSchema } from '@/composables/useSchemaOrg'

const faqStore = useFaqStore()

usePageSeo(
  'Вопросы адвокату: стоимость, сроки и порядок работы',
  'Ответы адвоката на частые вопросы о консультации, стоимости помощи, сроках и ведении судебных дел.'
)

useFaqSchema(faqStore.faqItems)
</script>

<template>
  <MainLayout>
    <section class="section-soft site-section--compact">
      <div class="site-container border-b border-white/15 pb-10">
        <h1 class="display-title max-w-5xl">Вопросы и ответы</h1>
      </div>
    </section>

    <FaqAccordion :faq-items="faqStore.faqItems" />
  </MainLayout>
</template>
