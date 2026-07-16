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
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="mb-6">
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="text-xl text-gray-600 mb-8"
        >
          {{ subtitle }}
        </p>

        <div
          v-if="actionButton || secondaryButton"
          class="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <a
            v-if="actionButton"
            :href="actionButton.href"
            class="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-center font-semibold"
          >
            {{ actionButton.text }}
          </a>
          <a
            v-if="secondaryButton"
            :href="secondaryButton.href"
            class="px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-full hover:bg-primary-50 transition-colors text-center font-semibold"
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
