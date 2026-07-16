<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import PhoneLink from '@/components/ui/PhoneLink.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'
import { CONTACT_EMAIL, SITE_NAME } from '@/utils/constants'

const attorneyStore = useAttorneyStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-gray-800 text-white mt-16 pt-12 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
      <div>
        <h4 class="text-white mb-4">
          {{ SITE_NAME }}
        </h4>
        <RouterLink
          to="/policy"
          class="block text-gray-300 hover:text-white underline"
          target="_blank"
        >
          © Политика конфиденциальности
        </RouterLink>
        <PhoneLink class="block mt-4 text-white" />
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="block text-gray-300 hover:text-white mt-2"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </div>

      <div>
        <h4 class="text-white mb-4">
          Реквизиты адвоката
        </h4>
        <p class="text-gray-300 text-sm">
          {{ attorneyStore.attorney.fullName }}
        </p>
        <p class="text-gray-300 text-sm">
          Рег. номер: {{ attorneyStore.attorney.regNumber }}
        </p>
        <p class="text-gray-300 text-sm">
          {{ attorneyStore.attorney.address }}
        </p>
        <p class="text-gray-300 text-sm">
          ИНН: {{ attorneyStore.attorney.inn }}
        </p>
        <p class="text-gray-300 text-sm">
          ОГРН: {{ attorneyStore.attorney.ogrn }}
        </p>
      </div>

      <div>
        <h4 class="text-white mb-4">
          Связаться с нами
        </h4>
        <SocialIcons variant="dark" />
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400">
      © {{ year }} {{ attorneyStore.attorney.fullName }}. Все права защищены.
    </div>
  </footer>
</template>
