<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { usePageSeo } from '@/composables/useSchemaOrg'

const attorneyStore = useAttorneyStore()

usePageSeo(
  'Политика обработки персональных данных',
  'Политика обработки персональных данных пользователей сайта в соответствии с требованиями законодательства РФ.',
  undefined
)
</script>

<template>
  <MainLayout>
    <section class="py-16 px-4 max-w-3xl mx-auto prose">
      <h1 class="mb-8">
        Политика обработки персональных данных
      </h1>

      <p class="mb-4">
        Настоящая политика определяет порядок обработки персональных данных пользователей сайта
        адвокатом {{ attorneyStore.attorney.fullName }} (рег. номер {{ attorneyStore.attorney.regNumber }}).
      </p>

      <h2 class="mb-4">
        1. Общие положения
      </h2>
      <p class="mb-4">
        Оставляя свои данные через формы на сайте, пользователь дает согласие на их обработку в
        целях предоставления юридических консультаций и обратной связи.
      </p>

      <h2 class="mb-4">
        2. Состав обрабатываемых данных
      </h2>
      <p class="mb-4">
        Имя, номер телефона, адрес электронной почты, а также сведения, добровольно указанные
        пользователем в тексте обращения.
      </p>

      <h2 class="mb-4">
        3. Цели обработки
      </h2>
      <p class="mb-4">
        Данные используются исключительно для связи с пользователем по вопросу оказания
        юридической помощи и не передаются третьим лицам без согласия пользователя.
      </p>

      <h2 class="mb-4">
        4. Контакты
      </h2>
      <p>
        По вопросам обработки персональных данных обращайтесь по адресу:
        {{ attorneyStore.attorney.email }}
      </p>
    </section>
  </MainLayout>
</template>
