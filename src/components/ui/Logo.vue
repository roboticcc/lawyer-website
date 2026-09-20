<script setup lang="ts">
import { SITE_NAME } from '@/utils/constants'
</script>

<template>
  <RouterLink
    to="/"
    class="group inline-flex items-center gap-3 no-underline"
    :aria-label="SITE_NAME"
  >
    <span class="flex h-11 w-11 items-center justify-center rounded-full border border-primary-500/60 font-sans text-lg text-primary-100 transition-colors group-hover:bg-primary-500 group-hover:text-[#191917]">
      ПЗ
    </span>
    <span class="hidden max-w-[10rem] text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.16em] text-primary-50 sm:block">
      {{ SITE_NAME }}
    </span>
  </RouterLink>
</template>
