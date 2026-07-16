<script setup lang="ts">
import MainHeader from '@/components/app/MainHeader.vue'
import MainFooter from '@/components/app/MainFooter.vue'
import LeadModal from '@/components/blocks/LeadModal.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <MainHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <MainFooter />
    <LeadModal />
  </div>
</template>
