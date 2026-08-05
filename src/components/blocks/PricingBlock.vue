<script setup lang="ts">
import type { Service } from '@/types'

const props = defineProps<{
  services: Service[]
}>()
</script>

<template>
  <section
    v-if="services.some((s) => s.pricing?.length)"
    class="section-paper site-section"
  >
    <div class="site-container max-w-5xl">
      <h2 class="display-title mb-12">
        Стоимость услуг
      </h2>

      <div
        v-for="service in props.services"
        :key="service.id"
        class="mb-8"
      >
        <h3
          v-if="services.length > 1"
          class="mb-6 uppercase"
        >
          {{ service.title }}
        </h3>
        <table class="w-full border-collapse">
          <caption class="sr-only">
            Стоимость услуг: {{ service.title }}
          </caption>
          <thead>
            <tr class="border-b border-black/30">
              <th
                scope="col"
                class="py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-black/50"
              >
                Услуга
              </th>
              <th
                scope="col"
                class="py-4 text-right text-xs font-semibold uppercase tracking-[0.12em] text-black/50"
              >
                Стоимость
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in service.pricing"
              :key="item.service"
              class="border-b border-black/15"
            >
              <td class="py-5">
                {{ item.service }}
              </td>
              <td class="py-5 text-right font-semibold text-primary-800">
                {{ item.price }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
