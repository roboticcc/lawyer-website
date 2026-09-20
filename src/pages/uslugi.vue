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
    <section class="section-soft site-section--compact">
      <div class="site-container grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12">
        <div>
          <span class="eyebrow mb-4">Услуги адвоката</span>
          <h1 class="display-title">
            Направления практики
          </h1>
        </div>
        <p class="max-w-xl text-lg text-[#c7c2b9]">
          Защита по уголовным делам, помощь бизнесу и представительство в гражданских и административных спорах.
        </p>
      </div>
    </section>

    <ServicesGrid
      :services="servicesStore.services"
      title=""
      :show-link-to-all="false"
    />
  </MainLayout>
</template>
