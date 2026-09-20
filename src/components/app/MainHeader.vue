<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/ui/Logo.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'
import PhoneLink from '@/components/ui/PhoneLink.vue'

const isMenuOpen = ref(false)

const navLinks = [
  { to: '/uslugi', label: 'Услуги' },
  { to: '/priory-raboty', label: 'Порядок работы' },
  { to: '/faq', label: 'Вопросы и ответы' },
  { to: '/kontakt', label: 'Контакты' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-[#191917]/95 backdrop-blur-xl">
    <div class="site-container flex h-20 items-center justify-between gap-8">
      <Logo />

      <nav
        class="hidden items-center gap-7 lg:flex"
        aria-label="Основная навигация"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="border-b border-transparent py-2 text-xs uppercase tracking-[0.12em] text-[#c7c2b9] no-underline transition-colors hover:border-primary-500 hover:text-primary-50"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-5 lg:flex">
        <PhoneLink class="text-sm text-primary-300" />
        <SocialIcons variant="dark" />
      </div>

      <button
        type="button"
        class="relative h-11 w-11 border border-white/20 text-primary-50 lg:hidden"
        aria-label="Открыть меню"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span
          class="absolute left-3 right-3 top-[14px] h-px bg-current transition-transform"
          :class="{ 'translate-y-[6px] rotate-45': isMenuOpen }"
        />
        <span
          class="absolute left-3 right-3 top-[20px] h-px bg-current transition-opacity"
          :class="{ 'opacity-0': isMenuOpen }"
        />
        <span
          class="absolute left-3 right-3 top-[26px] h-px bg-current transition-transform"
          :class="{ '-translate-y-[6px] -rotate-45': isMenuOpen }"
        />
      </button>
    </div>

    <nav
      v-if="isMenuOpen"
      class="site-container flex flex-col gap-1 border-t border-white/10 py-5 lg:hidden"
      aria-label="Мобильная навигация"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="border-b border-white/10 py-4 text-sm uppercase tracking-[0.12em] text-primary-50 no-underline hover:text-primary-300"
        @click="closeMenu"
      >
        {{ link.label }}
      </RouterLink>
      <div class="flex items-center justify-between pt-4">
        <PhoneLink class="text-sm text-primary-300" />
        <SocialIcons variant="dark" />
      </div>
    </nav>
  </header>
</template>
