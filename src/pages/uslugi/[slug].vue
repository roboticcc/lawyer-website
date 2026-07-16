<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import ServiceHero from '@/components/blocks/ServiceHero.vue'
import PricingBlock from '@/components/blocks/PricingBlock.vue'
import ConsultationForm from '@/components/blocks/ConsultationForm.vue'
import { useServicesStore } from '@/stores/services'
import { useAttorneyStore } from '@/stores/attorney'
import { useServiceSchema, usePageSeo } from '@/composables/useSchemaOrg'

const route = useRoute()
const servicesStore = useServicesStore()
const attorneyStore = useAttorneyStore()

const service = computed(() => servicesStore.getBySlug(String(route.params.slug)))

if (service.value) {
  usePageSeo(
    service.value.pageTitle || service.value.title,
    service.value.shortDescription,
    `${service.value.title}, ${attorneyStore.attorney.fullName}, защита`
  )
  useServiceSchema(service.value, attorneyStore.attorney)
}
</script>

<template>
  <MainLayout>
    <template v-if="service">
      <ServiceHero :service="service" />

      <section class="py-16 px-4 max-w-4xl mx-auto">
        <p class="text-lg text-gray-700 leading-relaxed">
          {{ service.longDescription }}
        </p>
      </section>

      <PricingBlock :services="[service]" />

      <section class="py-16 px-4 bg-white">
        <div class="max-w-2xl mx-auto">
          <h2 class="mb-8 text-center">
            Получить консультацию
          </h2>
          <ConsultationForm :service-name="service.title" />
        </div>
      </section>
    </template>

    <section
      v-else
      class="py-24 px-4 text-center"
    >
      <h1 class="mb-4">
        Услуга не найдена
      </h1>
      <RouterLink
        to="/uslugi"
        class="text-secondary-600 underline"
      >
        Вернуться к списку услуг
      </RouterLink>
    </section>
  </MainLayout>
</template>
