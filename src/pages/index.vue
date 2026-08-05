<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import ExperienceBanner from '@/components/blocks/ExperienceBanner.vue'
import WorkProcess from '@/components/blocks/WorkProcess.vue'
import ServicesGrid from '@/components/blocks/ServicesGrid.vue'
import OtherPracticesAccordion from '@/components/blocks/OtherPracticesAccordion.vue'
import LeadCaptureBlock from '@/components/blocks/LeadCaptureBlock.vue'
import CasesShowcase from '@/components/blocks/CasesShowcase.vue'
import FaqAccordion from '@/components/blocks/FaqAccordion.vue'
import ContactForm from '@/components/blocks/ContactForm.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { useServicesStore } from '@/stores/services'
import { useCasesStore } from '@/stores/cases'
import { useFaqStore } from '@/stores/faq'
import { useUiStore } from '@/stores/ui'
import { useAttorneySchema, usePageSeo } from '@/composables/useSchemaOrg'
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

</script>

<template>
  <MainLayout>
    <section class="editorial-hero">
      <div class="site-container hero-layout">
        <div>
          <span class="eyebrow">{{ attorneyStore.attorney.fullName }}</span>
          <h1 class="hero-title">
            Квалифицированная юридическая поддержка в любой точке РФ
          </h1>
        </div>

        <div class="relative z-10 border-t border-primary-500/60 pt-6">
          <p class="hero-copy">
            Столкнулись со сложной правовой ситуацией? Опишите свою проблему, и мы разработаем
            надежный план защиты ваших интересов
          </p>
          <div class="hero-actions">
            <button
              type="button"
              class="button-primary"
              @click="uiStore.openLeadModal()"
            >
              Записаться на разбор дела
            </button>
            <a
              :href="`tel:${attorneyStore.attorney.phone}`"
              class="button-outline"
            >
              Позвонить сейчас
            </a>
          </div>
        </div>
      </div>
    </section>

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

    <section class="section-paper site-section">
      <div class="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <h2 class="display-title">
          Нужна экстренная юридическая помощь?
          </h2>
        </div>
        <div class="border-t border-black/20 pt-7">
          <p class="mb-8 max-w-xl text-black/60">
          Оставьте свои координаты — мы оперативно свяжемся с вами для детального разбора ситуации
          </p>
          <ContactForm :show-message="false" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>
