<script setup lang="ts">
import Logo from '@/components/ui/Logo.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-[#191917] px-4 text-primary-50">
    <div class="mb-8">
      <Logo />
    </div>
    <main class="w-full max-w-2xl">
      <slot />
    </main>
  </div>
</template>
