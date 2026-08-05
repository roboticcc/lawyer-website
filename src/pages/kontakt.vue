<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import ContactForm from '@/components/blocks/ContactForm.vue'
import PhoneLink from '@/components/ui/PhoneLink.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { usePageSeo, useAttorneySchema } from '@/composables/useSchemaOrg'
import { CONTACT_EMAIL } from '@/utils/constants'

const attorneyStore = useAttorneyStore()

usePageSeo(
  `Контакты адвоката ${attorneyStore.attorney.fullName} в ${attorneyStore.attorney.city}`,
  `Свяжитесь с адвокатом ${attorneyStore.attorney.fullName}: телефон, email, адрес офиса в ${attorneyStore.attorney.city}.`,
  'контакты адвоката, адрес адвоката, телефон адвоката'
)

useAttorneySchema(attorneyStore.attorney)
</script>

<template>
  <MainLayout>
    <section class="section-paper site-section">
      <div class="site-container">
      <h1 class="display-title mb-16 max-w-5xl">
        Контакты
      </h1>

      <div class="grid gap-12 border-t border-black/20 pt-10 md:grid-cols-2 md:gap-24">
        <div>
          <h2 class="mb-8 text-4xl uppercase">
            Как с нами связаться
          </h2>
          <p class="mb-2">
            <PhoneLink show-icon />
          </p>
          <p class="mb-2">
            <a
              :href="`mailto:${CONTACT_EMAIL}`"
              class="text-primary-800 underline underline-offset-4 hover:text-primary-600"
            >
              {{ CONTACT_EMAIL }}
            </a>
          </p>
          <p class="mt-8 text-black/60">
            {{ attorneyStore.attorney.address }}
          </p>
          <p class="text-black/60">
            {{ attorneyStore.attorney.city }}, {{ attorneyStore.attorney.postalCode }}
          </p>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
      </div>
    </section>
  </MainLayout>
</template>
