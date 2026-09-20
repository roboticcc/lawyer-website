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

      <section class="section-ink site-section--compact">
        <div class="site-container max-w-4xl border-l border-primary-500/60 pl-7 md:pl-12">
          <p class="font-sans text-2xl leading-relaxed text-[#c7c2b9] md:text-3xl">
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
            Напишите адвокату напрямую, чтобы обсудить вашу ситуацию.
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
