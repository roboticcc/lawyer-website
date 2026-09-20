<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ServicesGrid from '@/components/blocks/ServicesGrid.vue'
import { useServicesStore } from '@/stores/services'
import { usePageSeo } from '@/composables/useSchemaOrg'
import { generateServiceUrl } from '@/utils/seo'

const servicesStore = useServicesStore()

usePageSeo(
  'Услуги адвоката в Омске | Игорь Мосензов',
  'Направления работы адвоката Игоря Мосензова: уголовные дела, защита бизнеса, гражданские и административные споры. Описание услуг и стоимость.'
)

const itemListSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: servicesStore.services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: generateServiceUrl(service.slug),
    name: service.title,
  })),
}))

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(itemListSchema.value) }],
})
</script>

<template>
  <MainLayout>
    <ServicesGrid
      :services="servicesStore.services"
      title="Услуги адвоката"
      :show-link-to-all="false"
      page-heading
    />
  </MainLayout>
</template>
