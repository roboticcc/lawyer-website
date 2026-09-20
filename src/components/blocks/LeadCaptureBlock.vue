<script setup lang="ts">
import ContactActions from '@/components/ui/ContactActions.vue'
import { useAttorneyStore } from '@/stores/attorney'

const attorneyStore = useAttorneyStore()
</script>

<template>
  <section class="section-soft site-section overflow-hidden">
    <div class="site-container grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
      <img
        :src="attorneyStore.attorney.photos.consultation"
        alt="Иллюстрация: адвокат беседует с доверителем"
        loading="lazy"
        decoding="async"
        width="1536"
        height="1024"
        class="order-2 h-[18rem] w-full rounded-lg object-cover md:order-1 md:h-[24rem]"
      >

      <div class="order-1 md:order-2">
        <span class="eyebrow mb-4">Связаться напрямую</span>
        <h2 class="display-title mb-5">
          Обсудим вашу ситуацию
        </h2>
        <p class="mb-8 max-w-lg text-lg text-[#c7c2b9]">
          Позвоните или напишите адвокату в удобном мессенджере либо по электронной почте. Кратко опишите вопрос, чтобы начать разговор.
        </p>
        <ContactActions />
      </div>
    </div>
  </section>
</template>
