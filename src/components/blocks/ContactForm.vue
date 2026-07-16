<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRoute, useRouter } from 'vue-router'
import { contactSchema } from '@/utils/validators'
import FormInput from '@/components/ui/FormInput.vue'
import CheckboxInput from '@/components/ui/CheckboxInput.vue'
import Textarea from '@/components/ui/Textarea.vue'

withDefaults(
  defineProps<{
    showMessage?: boolean
  }>(),
  { showMessage: true }
)

const route = useRoute()
const router = useRouter()
const submitError = ref('')

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(contactSchema),
  initialValues: { agree: false },
})

const onSubmit = handleSubmit(async (values) => {
  submitError.value = ''
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        utmSource: route.query.utm_source,
        utmMedium: route.query.utm_medium,
        utmCampaign: route.query.utm_campaign,
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) throw new Error('Request failed')

    resetForm()
    router.push('/spasibo')
  } catch {
    submitError.value = 'Произошла ошибка. Пожалуйста, позвоните по телефону.'
  }
})
</script>

<template>
  <form
    class="space-y-6"
    @submit="onSubmit"
  >
    <fieldset class="space-y-4">
      <legend class="text-lg font-semibold mb-2">
        Свяжитесь с нами
      </legend>

      <FormInput
        name="name"
        label="Имя"
        placeholder="Иван Иванов"
        autocomplete="name"
      />
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="ivan@mail.ru"
        autocomplete="email"
      />
      <FormInput
        name="phone"
        label="Телефон"
        type="tel"
        placeholder="+7XXXXXXXXXX"
        autocomplete="tel"
      />
      <Textarea
        v-if="showMessage"
        name="message"
        label="Сообщение"
        placeholder="Опишите вашу ситуацию"
      />
      <CheckboxInput name="agree" />
    </fieldset>

    <p
      v-if="submitError"
      class="text-sm text-red-600"
      role="alert"
    >
      {{ submitError }}
    </p>

    <button
      type="submit"
      class="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:bg-primary-300"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">Отправить сообщение</span>
      <span v-else>Отправка...</span>
    </button>
  </form>
</template>
