<script setup lang="ts">
import MainHeader from '@/components/app/MainHeader.vue'
import MainFooter from '@/components/app/MainFooter.vue'
import LeadModal from '@/components/blocks/LeadModal.vue'
</script>

<template>
  <div class="min-h-screen bg-[#191917] text-primary-50">
    <MainHeader />
    <main>
      <slot />
    </main>
    <MainFooter />
    <LeadModal />
  </div>
</template>
