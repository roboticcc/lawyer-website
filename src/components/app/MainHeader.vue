<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/ui/Logo.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'

const isMenuOpen = ref(false)

const navLinks = [
  { to: '/#work-process', label: 'Порядок работы' },
  { to: '/#services-section', label: 'Специализация' },
  { to: '/#cases', label: 'Примеры дел' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <Logo />

      <nav
        class="hidden lg:flex items-center gap-8"
        aria-label="Основная навигация"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-gray-700 hover:text-primary-600 transition-colors no-underline"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden lg:flex items-center">
        <SocialIcons />
      </div>

      <button
        type="button"
        class="lg:hidden p-2"
        aria-label="Открыть меню"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <nav
      v-if="isMenuOpen"
      class="lg:hidden border-t border-gray-100 px-4 py-4 flex flex-col gap-4"
      aria-label="Мобильная навигация"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="text-gray-700 hover:text-primary-600 no-underline"
        @click="closeMenu"
      >
        {{ link.label }}
      </RouterLink>
      <SocialIcons />
    </nav>
  </header>
</template>
