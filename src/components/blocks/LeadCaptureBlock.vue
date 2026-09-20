<script setup lang="ts">
import ContactActions from '@/components/ui/ContactActions.vue'
</script>

<template>
  <section class="section-soft site-section overflow-hidden">
    <div class="site-container grid items-center gap-12 md:grid-cols-2 md:gap-20">
      <img
        src="/images/legal-desk.webp"
        alt="Иллюстрация юридического кабинета"
        loading="lazy"
        decoding="async"
        width="1536"
        height="1024"
        class="order-2 h-[22rem] w-full border border-white/15 object-cover md:order-1 md:h-[30rem]"
      >

      <div class="order-1 md:order-2">
        <h2 class="display-title mb-7">
          Обсудите вашу ситуацию с адвокатом
        </h2>
        <p class="mb-9 max-w-lg text-lg text-[#b9b5ad]">
          Напишите напрямую в удобный мессенджер или на почту.
        </p>
        <ContactActions />
      </div>
    </div>

    <div class="site-container mt-20 border-t border-white/15 pt-12 md:mt-28 md:pt-16">
      <h2 class="display-title mx-auto max-w-5xl text-center">
        Полное правовое сопровождение: от первой встречи до контроля за исполнением судебного решения
      </h2>
    </div>
  </section>
</template>
