<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import ServiceHero from '@/components/blocks/ServiceHero.vue'
import PricingBlock from '@/components/blocks/PricingBlock.vue'
import ContactActions from '@/components/ui/ContactActions.vue'
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
    `${service.value.shortDescription} Адвокат Игорь Мосензов, Омск.`
  )
  useServiceSchema(service.value, attorneyStore.attorney)
}
</script>

<template>
  <MainLayout>
    <template v-if="service">
      <ServiceHero :service="service" />

      <section class="section-paper site-section--compact border-b border-black/10">
        <div class="site-container grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:gap-12">
          <div>
            <span class="eyebrow mb-4">Подход к делу</span>
            <h2 class="text-2xl md:text-3xl">
              Как помогаю
            </h2>
          </div>
          <p class="max-w-3xl text-base leading-relaxed text-black/75 md:text-lg">
            {{ service.longDescription }}
          </p>
        </div>
      </section>

      <PricingBlock :services="[service]" />

      <section
        id="contact-options"
        class="section-paper site-section border-t border-black/15"
      >
        <div class="site-container max-w-2xl">
          <h2 class="display-title mb-12">
            Получить консультацию
          </h2>
          <p class="mb-8 text-black/65">
            Позвоните или напишите адвокату напрямую, чтобы обсудить вашу ситуацию.
          </p>
          <ContactActions />
        </div>
      </section>
    </template>

    <section
      v-else
      class="section-ink site-section text-center"
    >
      <h1 class="mb-4">
        Услуга не найдена
      </h1>
      <RouterLink
        to="/uslugi"
        class="mt-7 inline-block text-primary-300 underline underline-offset-4"
      >
        Вернуться к списку услуг
      </RouterLink>
    </section>
  </MainLayout>
</template>
