<script setup lang="ts">
import MainHeader from '@/components/app/MainHeader.vue'
import MainFooter from '@/components/app/MainFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#191917] text-primary-50">
    <MainHeader />
    <main>
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
