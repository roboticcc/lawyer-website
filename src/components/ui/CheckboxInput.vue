<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const { value, errorMessage } = useField<boolean>(() => props.name)
const inputId = computed(() => `field-${props.name}`)
</script>

<template>
  <div>
    <div class="flex items-start gap-3">
      <input
        :id="inputId"
        v-model="value"
        type="checkbox"
        class="mt-1 accent-primary-600"
        :aria-invalid="!!errorMessage"
        required
      >
      <label
        :for="inputId"
        class="text-sm leading-relaxed text-black/55"
      >
        Отправляя форму, вы подтверждаете согласие с условиями
        <RouterLink
          to="/policy"
          class="text-primary-800 underline underline-offset-2"
          target="_blank"
        >
          обработки персональных данных
        </RouterLink>
      </label>
    </div>
    <p
      v-if="errorMessage"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
