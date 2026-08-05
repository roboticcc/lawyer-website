<script setup lang="ts">
import { useAttorneyStore } from '@/stores/attorney'

const attorneyStore = useAttorneyStore()
const text = `Адвокат ${attorneyStore.attorney.fullName} • Профессиональная защита прав • `
</script>

<template>
  <div
    class="marquee-wrapper overflow-hidden border-y border-primary-500/35 bg-[#131312] py-4 text-primary-300"
    aria-hidden="true"
  >
    <div class="marquee-track">
      <span
        v-for="n in 4"
        :key="n"
        class="marquee-item"
      >{{ text }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrapper {
  width: 100%;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee-scroll 22s linear infinite;
}

.marquee-item {
  padding-right: 1.5rem;
  font-family: "Iowan Old Style", Baskerville, "Times New Roman", serif;
  font-size: 1rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
