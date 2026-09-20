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
        <div class="hero-content">
          <span class="eyebrow">{{ attorneyStore.attorney.fullName }}</span>
          <h1 class="hero-title">
            Адвокат в Омске. Правовая поддержка в любой точке РФ
          </h1>
          <p class="hero-copy">
            Защита по уголовным делам, помощь в гражданских и административных спорах.
            Расскажите о ситуации напрямую адвокату — подскажем, с чего начать.
          </p>
          <ContactActions />
          <div class="hero-facts">
            <span>Омск, ул. Красный Путь, 78</span>
            <span>Рег. № {{ attorneyStore.attorney.regNumber }}</span>
          </div>
        </div>
      </div>
    </section>

    <ServicesGrid
      :services="servicesStore.mainCatalog"
      title="Чем я могу помочь"
      description="Выберите направление, чтобы посмотреть, как строится работа и из чего складывается стоимость."
      :show-link-to-all="true"
    />

    <WorkProcess
      :steps="workSteps"
      title="Как строится работа"
    />

    <OtherPracticesAccordion />

    <CasesShowcase :cases="casesStore.cases" />

    <FaqAccordion :faq-items="faqStore.faqItems" />

    <LeadCaptureBlock />
  </MainLayout>
</template>
