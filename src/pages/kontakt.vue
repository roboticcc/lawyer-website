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
    <section class="py-16 px-4 max-w-7xl mx-auto">
      <h1 class="mb-12 text-center">
        Контакты
      </h1>

      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <h2 class="mb-4">
            Как с нами связаться
          </h2>
          <p class="mb-2">
            <PhoneLink show-icon />
          </p>
          <p class="mb-2">
            <a
              :href="`mailto:${CONTACT_EMAIL}`"
              class="text-blue-600 hover:text-blue-700"
            >
              {{ CONTACT_EMAIL }}
            </a>
          </p>
          <p class="text-gray-600 mt-4">
            {{ attorneyStore.attorney.address }}
          </p>
          <p class="text-gray-600">
            {{ attorneyStore.attorney.city }}, {{ attorneyStore.attorney.postalCode }}
          </p>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  </MainLayout>
</template>
