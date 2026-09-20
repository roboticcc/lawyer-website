<script setup lang="ts">
import { useHead } from '@unhead/vue'
import MainLayout from '@/layouts/MainLayout.vue'
import WorkProcess from '@/components/blocks/WorkProcess.vue'
import ServicesGrid from '@/components/blocks/ServicesGrid.vue'
import OtherPracticesAccordion from '@/components/blocks/OtherPracticesAccordion.vue'
import LeadCaptureBlock from '@/components/blocks/LeadCaptureBlock.vue'
import CasesShowcase from '@/components/blocks/CasesShowcase.vue'
import FaqAccordion from '@/components/blocks/FaqAccordion.vue'
import ContactActions from '@/components/ui/ContactActions.vue'
import { useAttorneyStore } from '@/stores/attorney'
import { useServicesStore } from '@/stores/services'
import { useCasesStore } from '@/stores/cases'
import { useFaqStore } from '@/stores/faq'
import { useAttorneySchema, usePageSeo, useWebSiteSchema } from '@/composables/useSchemaOrg'
import { workSteps } from '@/data/workSteps'

const attorneyStore = useAttorneyStore()
const servicesStore = useServicesStore()
const casesStore = useCasesStore()
const faqStore = useFaqStore()

usePageSeo(
  `Адвокат ${attorneyStore.attorney.fullName} в Омске | Юридическая помощь`,
  'Адвокат Игорь Мосензов в Омске: защита по уголовным делам, представительство в гражданских и административных спорах. Связь напрямую через почту и мессенджеры.'
)

useAttorneySchema(attorneyStore.attorney, servicesStore.services)
useWebSiteSchema()
useHead({ link: [{ rel: 'preload', as: 'image', href: '/images/legal-office.webp' }] })

</script>

<template>
  <MainLayout>
    <section class="editorial-hero">
      <div class="site-container hero-layout">
        <div>
          <span class="eyebrow">{{ attorneyStore.attorney.fullName }}</span>
          <h1 class="hero-title">
            Адвокат в Омске. Правовая поддержка в любой точке РФ
          </h1>
        </div>

        <div class="relative z-10 border-t border-primary-500/60 pt-6">
          <p class="hero-copy">
            Столкнулись со сложной правовой ситуацией? Опишите свою проблему, и мы разработаем
            надежный план защиты ваших интересов
          </p>
          <div class="hero-actions">
            <ContactActions />
            <a
              v-if="attorneyStore.attorney.phone"
              :href="`tel:${attorneyStore.attorney.phone}`"
              class="button-outline"
            >
              Позвонить сейчас
            </a>
          </div>
        </div>
      </div>
    </section>

    <WorkProcess
      :steps="workSteps"
      title="Порядок работы"
    />

    <ServicesGrid
      :services="servicesStore.mainCatalog"
      title="Услуги адвоката"
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
            Свяжитесь с адвокатом напрямую удобным способом.
          </p>
          <ContactActions />
        </div>
      </div>
    </section>
  </MainLayout>
</template>
