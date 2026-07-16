<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div class="mb-8">
      <Logo />
    </div>
    <main class="w-full max-w-2xl">
      <slot />
    </main>
  </div>
</template>
