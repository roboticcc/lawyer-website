<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import ContactActions from '@/components/ui/ContactActions.vue'
import PhoneLink from '@/components/ui/PhoneLink.vue'
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
        <div class="mb-10 max-w-2xl">
          <span class="eyebrow mb-4">На связи</span>
          <h1 class="display-title mb-4">
            Контакты
          </h1>
          <p class="text-lg text-black/65">
            Выберите удобный способ связи с адвокатом или найдите адрес офиса в Омске.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-black/10 bg-[#ebe6dc] p-8 md:p-10">
            <h2 class="mb-7 text-2xl">
              Офис и реквизиты
            </h2>
            <address class="not-italic">
              <p class="mb-2 font-semibold">
                {{ attorneyStore.attorney.fullName }}
              </p>
              <p class="mb-6 text-black/65">
                Регистрационный номер {{ attorneyStore.attorney.regNumber }}
              </p>
              <p class="mb-1">
                {{ attorneyStore.attorney.city }}, {{ attorneyStore.attorney.address }}
              </p>
              <p class="text-black/65">
                Индекс {{ attorneyStore.attorney.postalCode }}
              </p>
            </address>
            <div class="mt-8 border-t border-black/10 pt-6">
              <PhoneLink
                v-if="attorneyStore.attorney.phone"
                show-icon
              />
              <a
                :href="`mailto:${CONTACT_EMAIL}`"
                class="block break-all text-primary-800 underline underline-offset-4 hover:text-primary-600"
              >
                {{ CONTACT_EMAIL }}
              </a>
            </div>
          </div>

          <div class="rounded-lg border border-black/10 bg-white/50 p-8 md:p-10">
            <h2 class="mb-5 text-2xl">
              Написать адвокату
            </h2>
            <p class="mb-8 max-w-md text-black/65">
              Расскажите о ситуации в удобном мессенджере. Ответ поступит в выбранном приложении.
            </p>
            <ContactActions />
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>
