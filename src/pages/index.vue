<script setup lang="ts">
import { computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import ExperienceBanner from '@/components/blocks/ExperienceBanner.vue'
import WorkProcess from '@/components/blocks/WorkProcess.vue'
import ServicesGrid from '@/components/blocks/ServicesGrid.vue'
import OtherPracticesAccordion from '@/components/blocks/OtherPracticesAccordion.vue'
import LeadCaptureBlock from '@/components/blocks/LeadCaptureBlock.vue'
import CasesShowcase from '@/components/blocks/CasesShowcase.vue'
import FaqAccordion from '@/components/blocks/FaqAccordion.vue'
import ContactForm from '@/components/blocks/ContactForm.vue'
import RunningMarquee from '@/components/blocks/RunningMarquee.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { useServicesStore } from '@/stores/services'
import { useCasesStore } from '@/stores/cases'
import { useFaqStore } from '@/stores/faq'
import { useUiStore } from '@/stores/ui'
import { useAttorneySchema, usePageSeo } from '@/composables/useSchemaOrg'
import { generateAttorneyAltText } from '@/utils/seo'
import { workSteps } from '@/data/workSteps'

const attorneyStore = useAttorneyStore()
const servicesStore = useServicesStore()
const casesStore = useCasesStore()
const faqStore = useFaqStore()
const uiStore = useUiStore()

usePageSeo(
  `Адвокат ${attorneyStore.attorney.fullName} • Квалифицированная юридическая помощь в ${attorneyStore.attorney.city}`,
  `Адвокат с ${attorneyStore.attorney.experienceYears}-летним стажем. Защита по уголовным, гражданским и административным делам. ${attorneyStore.attorney.casesWon}+ успешных судебных процессов.`,
  'адвокат москва, защита прав, уголовный адвокат, гражданские споры, административные дела, юридическая помощь'
)

useAttorneySchema(attorneyStore.attorney, servicesStore.services)

const heroAltText = computed(() => generateAttorneyAltText(attorneyStore.attorney))
</script>

<template>
  <MainLayout>
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="mb-6">
            Квалифицированная юридическая поддержка в любой точке РФ
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            Столкнулись со сложной правовой ситуацией? Опишите свою проблему, и мы разработаем
            надежный план защиты ваших интересов
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              class="px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-center font-semibold"
              @click="uiStore.openLeadModal()"
            >
              Записаться на разбор дела
            </button>
            <a
              :href="`tel:${attorneyStore.attorney.phone}`"
              class="px-8 py-3 border-2 border-primary-500 text-primary-600 rounded-full hover:bg-primary-50 transition-colors text-center font-semibold no-underline"
            >
              Позвонить сейчас
            </a>
          </div>
        </div>

        <div>
          <img
            :src="attorneyStore.attorney.photos.hero"
            :alt="heroAltText"
            class="w-full h-auto rounded-2xl shadow-xl"
            loading="eager"
            fetchpriority="high"
            width="640"
            height="480"
          >
        </div>
      </div>
    </section>

    <RunningMarquee />

    <ExperienceBanner
      :cases-won="attorneyStore.attorney.casesWon"
      :experience-years="attorneyStore.attorney.experienceYears"
    />

    <WorkProcess
      :steps="workSteps"
      title="Порядок работы"
    />

    <ServicesGrid
      :services="servicesStore.mainCatalog"
      title="Защита адвоката по уголовным делам"
      :show-link-to-all="true"
    />

    <OtherPracticesAccordion />

    <LeadCaptureBlock />

    <CasesShowcase :cases="casesStore.cases" />

    <FaqAccordion :faq-items="faqStore.faqItems" />

    <section class="py-16 px-4 bg-white">
      <div class="max-w-2xl mx-auto">
        <h2 class="mb-4 text-center">
          Нужна экстренная юридическая помощь?
        </h2>
        <p class="text-gray-600 text-center mb-8">
          Оставьте свои координаты — мы оперативно свяжемся с вами для детального разбора ситуации
        </p>
        <ContactForm :show-message="false" />
      </div>
    </section>
  </MainLayout>
</template>
