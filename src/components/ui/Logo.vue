<script setup lang="ts">
import { SITE_NAME } from '@/utils/constants'
</script>

<template>
  <RouterLink
    to="/"
    class="text-xl font-serif font-bold text-gray-900 no-underline"
  >
    {{ SITE_NAME }}
  </RouterLink>
</template>
