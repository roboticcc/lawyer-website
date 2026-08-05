<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label: string
  placeholder?: string
}>()

const { value, errorMessage } = useField<string>(() => props.name)
const inputId = computed(() => `field-${props.name}`)
</script>

<template>
  <div>
    <label
      :for="inputId"
      class="form-label"
    >{{ label }}</label>
    <textarea
      :id="inputId"
      v-model="value"
      :placeholder="placeholder"
      rows="4"
      class="form-field resize-none"
      :class="errorMessage ? '!border-red-600' : ''"
    />
    <p
      v-if="errorMessage"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
