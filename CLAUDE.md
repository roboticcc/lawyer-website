# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# PAPA-SITE - Legal Attorney Multi-Page Website
**A Vue.js-based, AI-optimized, multi-service attorney website for Russian legal market SEO and lead generation**

---

## Overview
This project is a multi-page legal services website following strict SEO and AI-optimization requirements for Russian legal market (Яндекс, Google, AI assistants like Яндекс Нейро, ChatGPT, Perplexity, Google SGE). The site is built with Vue.js 3 for dynamic, component-based architecture with SSR/SSG capabilities.

## Project Architecture

### Core Technology Stack
- **Frontend Framework**: Vue.js 3 (Composition API) + Vite 5
- **Styling**: Tailwind CSS 3 + PostCSS 8
- **UI Components**: Radix Vue (unstyled, accessible) + custom components
- **State Management**: Pinia 2
- **Routing**: Vue Router 4
- **Internationalization**: i18n + vue-i18n
- **Schema Markup**: Vue SchemaOrg / manual JSON-LD generation
- **Animations**: GSAP for scroll animations + CSS transitions
- **Forms**: VeeValidate + custom validation rules
- **Deploy**: Any static hosting (Netlify, Vercel, Cloudflare, GitHub Pages)

### Project Structure
```
/src
  /assets              # Static assets (images, fonts, favicons)
    /images
      /attorney        # Attorney photos
      /services        # Service category images
      /cases           # Case study images
    /fonts            # Custom fonts
    favicon.ico       # Favicon
    /svg              # SVG icons and illustrations

  /components          # Reusable Vue components
    app/              # Global components
    blocks/           # Section components (Hero, Services, Cases, FAQ, etc.)
    ui/               # Headless UI primitives
    shared/           # Shared components (buttons, cards, forms, etc.)

  /composables         # Vue 3 composables
    useSchemaOrg.ts   # Schema.org generation
    useAnimation.ts   # Animation utilities
    useForm.ts       # Form handling
    useCaseCounter.ts # Counter animations

  /data                # Static data (JSON)
    attorney.json      # Attorney details
    services.json      # All legal services with URLs
    faq.json          # FAQ items
    cases.json        # Case studies
    faqCategories.json # FAQ category structure

  /i18n                # i18n locales
    en.json           # English translations
    ru.json           # Russian translations
    kz.json           # Kazakh translations (optional)
    uz.json           # Uzbek translations (optional)

  /layouts             # Page layouts
    MainLayout.vue     # Default layout with header/footer
    MinimalLayout.vue  # Clean layout for modal/popups

  /pages               # Main pages (Vue Router routes)
    index.vue          # Main landing page
    /[lang]          # Language routes (optional)
      services/       # Service category pages
        uslugi.vue          # Main services index
        ekonomicheskie-prestupleniya.vue  # Economics crimes page
        ugolovnye-dela.vue              # Criminal cases page
        grazhdanskie-spory.vue           # Civil disputes page
        administrativnye-dela.vue        # Administrative cases page
      uslugi/[slug].vue # Dynamic service pages
        sluzhba-po-delu-o-narkotikah.vue  # Drugs defense
        sluzhba-advokat-po-pobojam.vue     # Assault defense
        sluzhba-po-hischeniu-klevety.vue   # Defamation
      uslugi/neskolko-napravlenii.vue      # "Other practices" consolidated
    priory-raboty.vue   # Work process page
    praktika.vue        # Case studies page
    kontakt.vue         # Contact page
    policy.vue         # Privacy policy page
    
  /stores              # Pinia stores
    attorney.ts        # Attorney information
    services.ts        # Services data
    cases.ts           # Case studies data
    faq.ts            # FAQ data
    forms.ts          # Form state management
    
  /types              # TypeScript interfaces
    index.ts          # Global type definitions

  /utils               # Utility functions
    schema.ts         # Schema.org generation helpers
    seo.ts          # SEO utilities
    constants.ts     # Site constants (phone, emails, coordinates)
    validators.ts    # Form validation rules

  App.vue             # Root Vue component
  main.ts             # Vue app initialization
```

## Key Implementation Features

### 1. Multi-Page Architecture & Routing
**Strategy**: File-based routing using Vue Router with dynamic service pages
```typescript
// vue-router configuration (src/router/index.ts)
const routes = [
  { path: '/', component: () => import('@/pages/index.vue') },
  { path: '/priory-raboty', component: () => import('@/pages/priory-raboty.vue') },
  { path: '/praktika', component: () => import('@/pages/praktika.vue') },
  { path: '/kontakt', component: () => import('@/pages/kontakt.vue') },
  { path: '/policy', component: () => import('@/pages/policy.vue') },
  // Service categories
  { path: '/:lang?/uslugi', component: () => import('@/pages/services/uslugi.vue') },
  { path: '/:lang?/uslugi/:slug', component: () => import('@/pages/uslugi/[slug].vue') },
]
```

### 2. AI Schema.org Markup Generator
**Component**: `useSchemaOrg.ts` composable
```typescript
// Generate LocalBusiness / Attorney schema for homepage
export const useAttorneySchema = (attorney: AttorneyType) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: attorney.fullName,
    description: attorney.bio,
    telephone: attorney.phone,
    email: attorney.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: attorney.city,
      streetAddress: attorney.address,
      postalCode: attorney.postalCode
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: [
      attorney.vkUrl,
      attorney.whatsappUrl,
      attorney.telegramUrl
    ],
    priceRange: '$$$',
    areaServed: {
      '@type': 'City',
      name: attorney.serviceRegions.join(', ')
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: services.value.map(service => ({
        '@type': 'Offer',
        name: service.title,
        url: generateServiceUrl(service.slug),
        description: service.shortDescription
      }))
    }
  }
  
  return ref(JSON.stringify(schema, null, 2))
}
```

**Service page schema** (`HowToStep` for "Process" page):
```typescript
// Work process step-by-step schema
export const useProcessStepsSchema = (steps: ProcessStep[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Порядок работы с адвокатом',
    description: 'Пошаговый алгоритм юридической помощи от первого анализа до судебного решения',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'RUB', value: { '@type': 'PriceSpecification', price: 0, priceCurrency: 'RUB' } },
    tool: [
      { '@type': 'HowToTool', name: 'Первичная консультация' },
      { '@type': 'HowToTool', name: 'Анализ документов' },
      { '@type': 'HowToTool', name: 'Составление искового заявления' }
    ],
    step: steps.map(step => ({
      '@type': 'HowToStep',
      url: generatePageUrl(step.url),
      name: step.title,
      text: step.description,
      image: step.imageUrl,
      position: step.index,
      itemListElement: step.details?.map((detail, idx) => ({
        '@type': 'HowToDirection',
        text: detail
      }))
    }))
  }
  
  return ref(JSON.stringify(schema, null, 2))
}
```

### 3. FAQPage Schema Markup (Critical for AI)
```typescript
// FAQ schema generation (FAQPage type)
export const useFaqSchema = (faqItems: FaqItem[]) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
  
  return ref(JSON.stringify(schema, null, 2))
}
```

### 4. Service Page Structure Pattern
**Example**: `/uslugi/ekonomicheskie-prestupleniya.vue`
```vue
<script setup lang="ts">
import { useServicesStore } from '@/stores/services'
import { useAttorneyStore } from '@/stores/attorney'
import ServiceHero from '@/components/blocks/ServiceHero.vue'
import PricingBlock from '@/components/blocks/PricingBlock.vue'
import SeoContent from '@/components/blocks/SeoContent.vue'

const { params: { lang = 'ru' } } = useRoute()
const servicesStore = useServicesStore()
const attorneyStore = useAttorneyStore()

// Get specific service by URL or title
const service = computed(() => 
  servicesStore.services.find(s => s.title === 'Адвокат для бизнеса: экономические, налоговые и должностные преступления')
)

// Schema generation
useSchemaOrgGenerate(
  'Service',
  {
    name: service.value?.title,
    description: service.value?.longDescription,
    provider: {
      '@type': 'LegalService',
      name: attorneyStore.attorney.fullName,
      telephone: attorneyStore.attorney.phone,
      address: attorneyStore.attorney.address
    },
    areaServed: attorneyStore.attorney.serviceRegions.join(', '),
    category: 'Economic Crimes Defense',
    potentialAction: {
      '@type': 'ViewAction',
      target: `${window.location.origin}/${lang}/uslugi/ekonomicheskie-prestupleniya`,
      name: 'View Service'
    }
  }
)
</script>

template
  <MainLayout>
    <ServiceHero :service="service" />
    
    <!-- Anatomy of Economic Crimes Defense -->
    <SeoOptimizedContent
      title="Что такое защита от экономических преступлений?"
      description="Комплексная правовая помощь по делам ст. 159, 160, 171-174, 195-197 УК РФ. Агрессивная защита интересов бизнеса."
    >
      <FullLegalContent />
    </SeoOptimizedContent>
    
    <!-- Pricing Table -->
    <PricingBlock :services="[service]" />
    
    <!-- Contact CTA -->
    <LeadGenerationBlock />
  </MainLayout>
```

### 5. Hero Section Component (Reusable Pattern)
```vue
<!-- src/components/blocks/ServiceHero.vue -->
<script setup lang="ts">
import PageHero from '@/components/shared/PageHero.vue'
import PhoneLink from '@/components/ui/PhoneLink.vue'
import SocialIcons from '@/components/ui/SocialIcons.vue'

const props = defineProps({
  service: {
    type: Object as PropType<ServiceType>,
    required: true
  },
  attorneyPhoto: {
    type: String,
    required: true
  }
})

const rotatingText = ref('Адвокат Иван Иванов • Профессиональная защита прав • Адвокат Иван Иванов')
</script>

template
  <PageHero
    :title="service.title"
    :subtitle="service.shortDescription"
    :action-button="{
      text: 'Бесплатная консультация',
      href: '#consultation-form',
      variant: 'primary'
    }"
    :secondary-button="{
      text: 'Позвонить сейчас',
      href: 'tel:+74951234567',
      icon: 'phone'
    }"
  >
    <template #image>
      <img
        :src="attorneyPhoto"
        :alt="\`Адвокат ${attorney.fullName} ${service.title}\`"
        class="w-full h-auto rounded-2xl shadow-xl"
        loading="eager"
        fetchpriority="high"
      />
    </template>
    
    <template #details>
      <div class="text-xs text-gray-500 mt-4">
        <span v-for="(region, i) in attorney.serviceRegions" :key="i" class="mx-2">
          {{ region }}
        </span>
      </div>
      
      <!-- Trust indicators -->
      <div class="flex items-center space-x-4 mt-4 text-sm">
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span>{{ attorney.experienceYears }} лет стажа</span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <span>{{ attorney.casesWon }}+ успешных дел</span>
        </div>
      </div>
    </template>
  </PageHero>
```

### 6. Service Card Grid Component
```vue
<!-- src/components/blocks/ServicesGrid.vue -->
<script setup lang="ts">
const props = defineProps({
  services: Array as PropType<ServiceCardType[]>,
  title: String,
  description: String
})

const router = useRouter()

const openServiceInNewTab = (slug: string) => {
  router.push({ name: 'service', params: { slug } })
}
</script>

template
  <section class="py-16 px-4 max-w-7xl mx-auto" id="services-section">
    <h2 class="text-4xl font-bold mb-8 text-center">{{ title || 'Наша специализация' }}</h2>
    
    <p class="text-xl text-gray-600 mb-12 max-w-4xl mx-auto text-center">
      {{ description }}
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :title="service.title"
        :description="service.shortDescription"
        :icon="service.icon"
        :category="service.category"
        @click="openServiceInNewTab(service.slug)"
        class="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-100"
      />
    </div>
    
    <div class="mt-8 text-center">
      <RouterLink
        to="/uslugi"
        class="inline-flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        <span>Показать все услуги</span>
        <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </RouterLink>
    </div>
  </section>
```

### 7. Work Process Timeline Component
```vue
<!-- src/components/blocks/WorkProcess.vue -->
<script setup lang="ts">
import { useAnimation } from '@/composables/useAnimation'

const workSteps = ref([
  {
    step: 1,
    title: 'Первичный анализ',
    description: 'Детальное изучение вашей проблемы, изучение имеющихся документов и оценка возможных правовых рисков',
    side: 'left'
  },
  {
    step: 2,
    title: 'Разработка тактики',
    description: 'Подготовка нескольких альтернативных вариантов ведения дела, согласование финальной стратегии с доверителем',
    side: 'right'
  },
  {
    step: 3,
    title: 'Оформление договора',
    description: 'Официальное закрепление условий сотрудничества и объема помощи в соглашении об оказании адвокатских услуг',
    side: 'left'
  },
  {
    step: 4,
    title: 'Реализация защиты',
    description: 'Проведение комплексной работы по графику: участие в переговорах, судах и досудебных процедурах',
    side: 'right'
  }
])

// Animate counters on scroll
useAnimation(() => {
  const counters = document.querySelectorAll('.counter')
  // IntersectionObserver logic here
}, { target: '.work-process-section' })
</script>

template
  <section class="py-16 px-4 bg-gray-50 work-process-section relative overflow-hidden" id="work-process">
    <div class="max-w-6xl mx-auto relative">
      <!-- Vertical timeline -->
      <div class="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-green-500 opacity-80"></div>
      
      <!-- Timeline items -->
      <div v-for="step in workSteps" :key="step.step" 
           class="timeline-item relative mb-16"
           :class="step.side === 'right' ? 'timeline-right' : 'timeline-left'"
      >
        <div class="timeline-dot absolute w-6 h-6 bg-green-500 rounded-full border-4 border-white z-10"></div>
        <div class="timeline-balloon p-6 rounded-2xl"
             :class="step.side === 'right' ? 'timeline-right-balloon ml-8' : 'timeline-left-balloon mr-8'"
        >
          <span class="text-sm text-gray-400 font-mono">ШАГ {{ step.step }}</span>
          <h3 class="text-2xl font-bold mt-2 mb-3">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
```

### 8. Case Counter Animation Component
```vue
<!-- src/components/shared/CaseCounter.vue -->
<script setup lang="ts">
import { useCaseCounterAnimation } from '@/composables/useCaseCounter'

const props = defineProps({
  target: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: 'успешно завершенных судебных процессов'
  }
})

const { count, startAnimation } = useCaseCounterAnimation(props.target)

onMounted(() => {
  startAnimation()
})
</script>

template
  <div class="flex items-center justify-between p-6 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl text-white">
    <div class="flex-1">
      <div class="text-green-400 text-5xl font-mono tabular-nums" ref="counterRef">
        {{ count }}
      </div>
      <p class="text-lg mt-2">{{ label }}</p>
    </div>
    <div class="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
      <svg class="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
  </div>
```

## Data Management Strategy

### Static JSON Data Files Structure
```json
// src/data/attorney.json
{
  "fullName": "Иван Иванович Петров",
  "bio": "Адвокат с 27-летним стажем, защитивший более 1000 дел. Специализация: уголовные дела, экономические преступления, административные споры.",
  "regNumber": "РА 1234567",
  "experienceYears": 27,
  "casesWon": 1250,
  "phone": "+74951234567",
  "email": "petrov@legal-service.ru",
  "city": "Москва",
  "address": "ул. Большая Дмитровка, д. 28",
  "postalCode": "127006",
  "inn": "770123456789",
  "ogrn": "31677460001234567012",
  "serviceRegions": ["Москва", "Московская область", "Россия (удалённое обслуживание)"],
  "vkUrl": "https://vk.com/advokat_petrov",
  "whatsappUrl": "https://wa.me/79031234567",
  "telegramUrl": "https://t.me/advokat_petrov",
  "photos": {
    "hero": "/images/attorney/hero.jpg",
    "working": "/images/attorney/working.jpg",
    "passport": "/images/attorney/passport.jpg"
  }
}

// src/data/services.json
[
  {
    "id": "criminal-law",
    "category": "Уголовные дела",
    "title": "Адвокат по уголовным делам: побои, угрозы, причинение вреда здоровью",
    "slug": "ugolovnye-dela",
    "shortDescription": "Экстренная помощь при уголовных обвинениях. Защита по ст. 111, 112, 115, 116, 117 УК РФ.",
    "icon": "\\f100",
    "price": "от 300 000 ₽",
    "longDescription": "Полный комплекс защиты на всех стадиях уголовного процесса..."
  },
  {
    "id": "economic-crimes",
    "category": "Бизнес-защита",
    "title": "Адвокат для бизнеса: экономические, налоговые и должностные преступления",
    "slug": "ekonomicheskie-prestupleniya",
    "pageTitle": "Защита от экономических преступлений: ст. 159-160, 171-174 УК РФ",
    "pricing": [
      { "service": "Предварительное следствие", "price": "150 000-300 000 ₽" },
      { "service": "Следственные действия", "price": "250 000-500 000 ₽" },
      { "service": "Судебное разбирательство", "price": "от 500 000 ₽" }
    ]
  }
]
```

## SEO & Performance Optimization Strategy

### Critical SEO Requirements Implemented

1. **Semantic HTML Structure**
   - Proper H1-H6 hierarchy
   - Schema.org markup in each page
   - OpenGraph and Twitter cards for social sharing

2. **Page Speed Optimization**
   ```bash
   # Measures Reactivity:
   - Preload attorney photo (priority)
   - Lazy load service images
   - Critical CSS inlined
   - Font loading optimization (preload key fonts)
   - Static generation (each service page = separate build entry)
   ```

3. **Technical SEO Checklist**
   - [x] Multiple pages with unique meta titles/descriptions
   - [x] Schema.org JSON-LD in `<head>`
   - [x] Canonical URLs
   - [x] Mobile-first responsive design (min-width: 320px)
   - [ ] Image alt text with attorney name + service keyword
   - [ ] OpenGraph tags for social media
   - [ ] Language alternate tags (hreflang) for multilingual support
   - [ ] Fast loading (aim: < 2.5s)

### Build Optimization Configuration
```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

const isBuild = process.env.NODE_ENV === 'production'

// Dynamic imports for code splitting
export default defineConfig({
  plugins: [
    vue(),
    visualizer() // For bundle analysis (remove in production)
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/pages/')) return 'pages'
          if (id.includes('/components/blocks/')) return 'block-components'
          if (id.includes('@/stores')) return 'stores'
          return 'vendor'
        },
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: ['error'],
        drop_debugger: true
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 8080
  }
})
```

## Lead Generation System

### Multi-Page Contact Strategy

**Location**: Contact form appears on:
- Main landing page (footer section)
- Each service page (#consultation-form)
- Contact page (/kontakt)
- In popup modals after X seconds
- Success pages after form submission

```vue
<!-- src/components/blocks/ConsultationForm.vue -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      name: zod.string().min(2, 'Пожалуйста, укажите ваше имя'),
      phone: zod.string()
        .regex(/^\+7[0-9]{10}$/, 'Неверный формат: +7XXXXXXXXXX')
        .min(12, 'Введите номер полностью'),
      service: zod.string().optional(),
      agree: zod.boolean().refine(v => v === true, 'Необходимо согласие')
    })
  )
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: {
        ...values,
        utmSource: useRoute().query.utm_source,
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
      }
    })
    
    navigateTo('/spasibo') // Thank you page
  } catch (error) {
    showError('Произошла ошибка. Пожалуйста, позвоните по телефону.')
  }
})
</script>

template
  <form @submit="onSubmit" class="space-y-6" id="consultation-form">
    <fieldset>
      <legend class="text-lg font-semibold mb-4">Ваши данные для обратного звонка</legend>
      
      <FormField name="name">
        <FormInput
          placeholder="Иван Иванов"
          class="w-full p-3 border rounded-lg"
          autocomplete="name"
        />
      </FormField>
      
      <FormField name="phone">
        <FormInput
          type="tel"
          placeholder="Телефон в формате +7XXXXXXXXXX"
          class="w-full p-3 border rounded-lg"
          inputmode="tel"
        />
      </FormField>
      
      <input type="hidden" name="service" :value="currentService?.title || 'Главная страница'" />
      
      <div class="flex items-start space-x-3">
        <input type="checkbox" id="agree" name="agree" class="mt-1" required />
        <label for="agree" class="text-sm text-gray-500">
          Отправляя форму, вы подтверждаете согласие с условиями 
          <a href="/policy" class="text-blue-600 underline" target="_blank">обработки персональных данных</a>
        </label>
      </div>
    </fieldset>
    
    <button
      type="submit"
      class="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
      :disabled="isSubmitting"
    >
      <span v-if="!isSubmitting">Получить консультацию</span>
      <span v-else>Отправка...</span>
    </button>
    
    <p class="text-xs text-gray-400">
      Мы оперативно свяжемся с вами — оставьте телефон в формате +7XXXXXXXXXX
    </p>
  </form>
```

---

## Development Commands & Workflow

### Essential Commands (Package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit --watch",
    "lint:ts": "eslint . --ext .ts,.vue --fix",
    "lint:css": "stylelint **/*.{css,vue} --fix",
    "test:unit": "vitest",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "format": "prettier --write .",
    "prepare": "simple-git-hooks"
  }
}
```

### Common Development Tasks

| Task | Command | Description |
|------|---------|-------------|
| Start dev server | `npm run dev` | Start Vite dev server with hot reload |
| Build for production | `npm run build` | Create optimized production build |
| Preview production build | `npm run preview` | Serve production build locally |
| Type checking | `npm run type-check` | Watch ts files for type errors |
| Lint TypeScript | `npm run lint:ts` | Auto-fix TS/TS Vue lint issues |
| Run unit tests | `npm run test:unit` | Execute Vite + Vitest test suite |
| Build & analyze | `npm run build:analyze` | Generate bundle analyzer report |

### Environment Variables (.env files)
```
# .env (development)
VITE_API_BASE_URL=https://api.legal-service.ru
VITE_GTM_ID=GTM-XXXXXXX
VITE_YANDEX_METRIKA_ID=XXXXXXXX
VITE_ADVOKAT_NAME="Иван Петров"
VITE_ADVOKAT_REG_NUMBER="РА 1234567"
VITE_ADVOKAT_PHONE="+74951234567"

# .env.production (overrides .env)
VITE_API_BASE_URL=https://api.legal-service.ru
```

---

## Development Best Practices

### Component Design Principles
1. **Stateless Components First**: Use props + events for simple presentation
2. **Single Responsibility**: Each component does one thing well
3. **Accessible by Default**: ARIA attributes, keyboard navigation support
4. **SEO Optimized**: Schema generation, meta tags, semantic HTML
5. **Performance First**: Lazy load, size matters for mobile users

### Important Vue.js Patterns Used

1. **`<script setup>` syntax**: Composition API with less boilerplate
2. **Pinia stores**: Global state for attorney data, services, cases
3. **Composables**: Reusable logic (SEO generation, animations, form handling)
4. **Dynamic imports**: Code splitting for lazy loading
5. **TypeScript**: Full type safety for components and data structures
6. **CSS Scoping**: Scoped styles + Tailwind utility classes

### Multilingual Support (i18n)
```javascript
// i18n/ru.json (partial)
{
  "home": {
    "title": "КВАЛИФИЦИРОВАННАЯ ЮРИДИЧЕСКАЯ ПОДДЕРЖКА",
    "cta": "Записаться на разбор дела",
    "consultation": "Позвонить сейчас +7 (495) 123-45-67"
  },
  "services": {
    "criminal": "Уголовные дела",
    "economic": "Экономические преступления",
    "civil": "Гражданские споры"
  },
  "faq": {
    "guarantee": "Можно ли гарантировать 100% выигрыш дела до суда?",
    "yes": "Любое разбирательство уникально..."
  }
}
```

### Directory Structure Cheatsheet
```
📦 src                    # Source directory
├── 📂 assets            # Static assets (images, fonts)
├── 📂 components         # UI building blocks
│   ├── app            # Layout wrappers
│   ├── blocks         # Page-wide sections (ServicesGrid, Hero, etc)
│   ├── ui             # Atomic design primitives
│   └── shared         # Reused across multiple pages
├── 📂 composables       # Vue 3 Composable utilities
├── 📂 data             # Static JSON data (no runtime handling needed)
├── 📂 i18n             # Internationalization
├── 📂 layouts          # Page layout variations
├── 📂 pages            # File-based routing (index, services, kontakt)
├── 📂 stores           # Pinia state management
├── 📂 types            # TypeScript interfaces
└── 📂 utils            # Pure utility functions (no state)
```

---

## How to Work with This Codebase

### Getting Started (First Session)
```bash
# 1. Check out the repository
cd /path/to/papa-site

# 2. Install dependencies (if package.json exists)
npm install

# 3. Run dev server
npm run dev
```

### Running Tests
```bash
# Unit tests (Vue components)
npm run test:unit

# Interactive Cypress tests
npm run cy:open

# Headless test run
npm run cy:run
```

### Building for Production
```bash
# Standard production build
npm run build

# Build with bundle analysis (for optimization)
npm run build:analyze

# Test production build locally
npm run preview
```

### Common Edits You'll Make

**Adding a new service page:**
1. Create `/src/pages/services/[slug].vue` (copy from similar service)
2. Update `/src/data/services.json` with new service entry
3. Create service image: `/src/assets/images/services/[slug].webp`
4. Update `/src/stores/services.ts` if custom logic needed
5. Test: `npm run dev` → visit `/uslugi/[slug]`

**Changing attorney information:**
1. Update `/src/data/attorney.json`
2. Update `/src/composables/useSchemaOrg.ts` if fields changed
3. Create new photo in `/src/assets/images/attorney/`
4. Update hero component references

**Modifying forms:**
1. Update validation in `/src/components/blocks/ConsultationForm.vue`
2. Add new field to Zod schema if needed
3. Add `v-model` binding if connecting to Pinia store
4. Test all validation scenarios

---

## Deployment Guide

### Recommended Hosting Platforms
1. **Vercel** (Recommended - automatic Git integration, edge functions)
2. **Netlify** (Easy deploy, forms integration)
3. **Cloudflare Pages** (Great for global CDN + speed)
4. **GitHub Pages** (Free, static only)

### Vercel Deployment (.vercel/project.json)
```json
{
  "projectId": "prj_XXXXXXXXXXXXXX",
  "orgId": "org_XXXXXXXX"
}
```

**Environment variables** (vercel env settings):
```
VITE_API_BASE_URL=https://api.legal-service.ru
VITE_GTM_ID=GTM-XXXXXXX
VITE_YANDEX_METRIKA_ID=XXXXXXXX
VITE_ADVOKAT_NAME=Иван Петров
```

### Build Step for Static Hosts
Since this is a single-page app with file-based routing:
1. Build with `npm run build`
2. Upload the entire `/dist` directory to your host
3. Set up redirects (SPA mode):
   - Every unknown route should redirect to `/index.html`
   - Configure React router/Vue router for 404 fallback to `/`

---

## Code Quality & Maintenance

### Linting Rules (.eslintrc.cjs)
- TypeScript strict mode
- Vue 3 best practices
- ESLint recommended rules
- Prettier for code formatting

### Git Hooks (simple-git-hooks)
```javascript
// .husky/pre-commit
#!/bin/sh
.\\node_modules\\simple-git-hooks\\pre-commit

echo "🔍 Running type check..."
npm run type-check --silent

if [ $? -ne 0 ]; then
  echo "❌ Type check failed. Please fix errors."
  exit 1
fi

echo "✅ Type check passed!"
```

---

## Important Notes & Warnings

### 🚨 Critical SEO Requirements (DO NOT SKIP)
- Each service page MUST have unique `<title>` and `<meta description>`
- Schema.org markup MUST be valid JSON-LD in `<head>`
- Pricing MUST be visible on-page (not just in Schema)
- Phone number MUST be clickable: `<a href="tel:+74951234567">+7 (495) 123-45-67</a>`
- Images MUST have descriptive ALT tags with attorney name + service keyword

### ⚠️ Performance Budget
**Mobile**: < 2.5s load time
**Desktop**: < 1.5s load time
**Bundle size**: < 300kb gzipped

### 🔧 Build Optimization Checklist
- [ ] All images optimized (WebP format)
- [ ] Critical CSS inlined
- [ ] Font subset loaded
- [ ] Code splitting enabled
- [ ] Hydration optimized for SEO

---

## Helpful Resources

1. **Vue.js 3 Docs**: https://vuejs.org/guide
2. **Pinia Docs**: https://pinia.vuejs.org/
3. **Tailwind CSS**: https://tailwindcss.com/docs
4. **Schema.org Markup**: https://schema.org/LegalService
5. **FAQPage Schema**: https://developers.google.com/search/docs/appearance/faqpage
6. **HowTo Schema**: https://developers.google.com/search/docs/appearance/how-to

---

## Troubleshooting Common Issues

### Issue 1: Router broken on refresh
**Solution**: Configure server-side redirects to `/index.html` for all routes
**Reference**: Vue Router history mode + static hosting

### Issue 2: Schema markup shows errors in Rich Results Test
**Solution**:
1. Validate JSON at https://validator.schema.org/
2. Ensure all required fields present
3. Escape special characters properly

### Issue 3: Images not loading on mobile
**Solution**:
1. Check image path is `/assets/images/...`
2. Ensure WebP fallback exists
3. Add `loading="lazy"` and proper sizes

### Issue 4: Form submissions failing
**Solution**:
1. Check API endpoint in console
2. Validate phone regex: `^\+7[0-9]{10}$`
3. Ensure backend is running or mock enabled

### Issue 5: SEO tags showing wrong title/description
**Solution**:
1. Check `useHead()` composable usage
2. Verify data source (props vs stores)
3. Check for duplicate head tags in layout components

---

## Future Enhancements

### Roadmap Items (High Priority)
1. **Backend API integration** - Form submissions + lead dashboard
2. **Admin panel** - For managing services, FAQ, cases without code changes
3. **Appointment booking** - Calendar integration with lawyer availability
4. **Payment integration** - For paid consultations/ad retainers
5. **Analytics dashboard** - Track form submissions + page views per service

### Nice-to-Have Features
- A/B testing for CTAs
- Chat widget integration
- Video consultation booking
- Document upload portal for clients
- Client portal (authenticated area)
- Lawyer blog with SEO articles
- Video testimonials section

---

## Big Picture Architecture Overview


```
                                ┌──────────────────────────────────┐
                                │   PAPA-SITE Legal Services    │
                                │  Vue.js 3 + Vite 5 + TS     │
                                └──────────────────────────────────┘
                                           │
                                           ▼
                                ┌──────────────────────────────────┐
                                │         Static Data            │
                                │  (services.json, faq.json)    │
                                └──────────────────────────────────┘
                                           │
                                           ▼
                                ┌──────────────────────────────────┐
                                │      Pinia Stores              │
                                │  attorney, services, cases     │
                                └──────────────────────────────────┘
                                           │
                                           ▼
┌────────────────┐ ┌────────────────┐ ┌─────────────────┐
│  PageHero.vue │ │ServiceHero.vue │ │ContactForm.vue │...
└──────┬────────┘ └──────┬────────┘ └───────┬─────────┘
       │                │                  │
       └────────┬───────┘                  │
                │                        │
        ┌──────▼───────────┐        ┌──────▼───────────┐
        │ Composable:     │        │ Composable:     │
        │ useSchemaOrg.ts  │        │ useAnimation.ts │
        └──────┬───────────┘        └──────────────────┘
               │
        ┌──────▼───────────┐
        │ Schema.org      │
        │ Markup         │
        └──────────────────┘
```

**Core Principle**: Each page is built from:
1. **Layout** (Header + Content + Footer)
2. **Blocks** (content sections: Hero, Services, Process, Cases, FAQ)
3. **Shared Components** (Reusable UI pieces)
4. **Composables** (Logic + Schema generation)
5. **Data** (JSON files for easy updates)

---

## Next Steps & Immediate Actions

Wondering where to start? Pick one of these mini-milestones:

### Milestone 1: Foundation (1-2 days)
- [ ] Initialize Vue app: `npm create vue@latest papa-site`
- [ ] Set up Tailwind CSS
- [ ] Create attorney.json and services.json structure
- [ ] Implement MainLayout with header/footer
- [ ] Create HomeHero component

### Milestone 2: Core Pages (3-5 days)
- [ ] Main landing page (/)
- [ ] Services overview (/uslugi)
- [ ] One service detail page (pick any slug)
- [ ] Contact page
- [ ] Privacy policy page

### Milestone 3: SEO & AI Optimization (2-3 days)
- [ ] Schema.org generator for homepage
- [ ] Schema.org for services
- [ ] FAQ schema implementation
- [ ] Page titles + meta descriptions per page
- [ ] Image alt tags with proper format

### Milestone 4: Polish & Deploy (1-2 days)
- [ ] Form validation + submission
- [ ] Mobile responsiveness fix
- [ ] Performance optimization (build analysis)
- [ ] Deploy to Vercel/Netlify
- [ ] Google Search Console + Analytics setup

---

Now you're ready to build! Start with the next page of this file for environment setup instructions, or jump directly into creating the first component using the patterns above.

**Key Success**: Keep each page focused → build up over time → validate SEO requirements at each step.