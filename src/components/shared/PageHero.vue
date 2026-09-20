<script setup lang="ts">
interface HeroButton {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
}

defineProps<{
  title: string
  subtitle?: string
  actionButton?: HeroButton
  secondaryButton?: HeroButton
}>()
</script>

<template>
  <section class="section-soft site-section relative overflow-hidden">
    <div class="site-container grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
      <div>
        <h1 class="display-title max-w-5xl">
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="mb-9 mt-8 max-w-2xl border-t border-white/15 pt-6 text-lg text-[#b9b5ad]"
        >
          {{ subtitle }}
        </p>

        <div
          v-if="actionButton || secondaryButton"
          class="mb-8 flex flex-col gap-3 sm:flex-row"
        >
          <a
            v-if="actionButton"
            :href="actionButton.href"
            class="button-primary"
          >
            {{ actionButton.text }}
          </a>
          <a
            v-if="secondaryButton"
            :href="secondaryButton.href"
            :target="secondaryButton.href.startsWith('http') ? '_blank' : undefined"
            :rel="secondaryButton.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="button-outline"
          >
            {{ secondaryButton.text }}
          </a>
        </div>

        <slot name="details" />
      </div>

      <div>
        <slot name="image" />
      </div>
    </div>
  </section>
</template>
