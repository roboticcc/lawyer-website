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
    <FaqAccordion
      :faq-items="faqStore.faqItems"
      page-heading
    />
  </MainLayout>
</template>
