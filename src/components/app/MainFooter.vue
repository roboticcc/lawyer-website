<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'
import PhoneLink from '@/components/ui/PhoneLink.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'
import { CONTACT_EMAIL, SITE_NAME } from '@/utils/constants'

const attorneyStore = useAttorneyStore()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/10 bg-[#131312] pb-8 pt-16 text-primary-50">
    <div class="site-container grid gap-12 md:grid-cols-3">
      <div>
        <p class="eyebrow mb-5">
          {{ SITE_NAME }}
        </p>
        <RouterLink
          to="/policy"
          class="block text-sm text-[#aaa69e] underline underline-offset-4 hover:text-primary-200"
        >
          Политика конфиденциальности
        </RouterLink>
        <PhoneLink class="mt-7 block text-primary-200" />
        <a
          :href="`mailto:${CONTACT_EMAIL}`"
          class="mt-2 block text-sm text-[#aaa69e] hover:text-primary-200"
        >
          {{ CONTACT_EMAIL }}
        </a>
      </div>

      <div>
        <h4 class="mb-5 text-primary-50">
          Реквизиты адвоката
        </h4>
        <p class="text-sm text-[#aaa69e]">
          {{ attorneyStore.attorney.fullName }}
        </p>
        <p class="text-sm text-[#aaa69e]">
          Рег. номер: {{ attorneyStore.attorney.regNumber }}
        </p>
        <p class="text-sm text-[#aaa69e]">
          {{ attorneyStore.attorney.address }}
        </p>
        <p
          v-if="attorneyStore.attorney.inn"
          class="text-sm text-[#aaa69e]"
        >
          ИНН: {{ attorneyStore.attorney.inn }}
        </p>
        <p
          v-if="attorneyStore.attorney.ogrn"
          class="text-sm text-[#aaa69e]"
        >
          ОГРН: {{ attorneyStore.attorney.ogrn }}
        </p>
      </div>

      <div>
        <h4 class="mb-5 text-primary-50">
          Связаться с нами
        </h4>
        <SocialIcons variant="dark" />
      </div>
    </div>

    <div class="site-container mt-12 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.12em] text-[#77746e]">
      © {{ year }} {{ attorneyStore.attorney.fullName }}. Все права защищены.
    </div>
  </footer>
</template>
