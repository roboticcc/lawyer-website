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
  <section class="page-hero section-soft relative overflow-hidden">
    <div class="site-container grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
      <div>
        <slot name="breadcrumb" />
        <h1 class="display-title max-w-4xl">
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="mb-6 mt-5 max-w-2xl text-lg text-[#c7c2b9]"
        >
          {{ subtitle }}
        </p>

        <slot name="details" />

        <div
          v-if="actionButton || secondaryButton"
          class="mt-7 flex flex-wrap gap-3"
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
      </div>

      <div>
        <slot name="image" />
      </div>
    </div>
  </section>
</template>
