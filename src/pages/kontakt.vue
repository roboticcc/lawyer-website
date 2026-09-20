<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import ContactActions from '@/components/ui/ContactActions.vue'
import PhoneLink from '@/components/ui/PhoneLink.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { usePageSeo, useAttorneySchema } from '@/composables/useSchemaOrg'
import { CONTACT_EMAIL } from '@/utils/constants'

const attorneyStore = useAttorneyStore()

usePageSeo(
  `Контакты адвоката ${attorneyStore.attorney.fullName} в ${attorneyStore.attorney.city}`,
  `Адрес адвоката Игоря Мосензова: Омск, ул. Красный Путь, 78, офис 3. Напишите по электронной почте или в мессенджере.`
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
            <div class="mt-8">
              <SocialIcons variant="light" />
            </div>
          </div>

          <div>
            <h2 class="mb-6 text-3xl uppercase">
              Написать адвокату
            </h2>
            <p class="mb-7 text-black/60">
              Выберите удобный способ связи. Сообщение откроется в выбранном приложении.
            </p>
            <ContactActions />
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>
