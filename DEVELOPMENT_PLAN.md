# PAPA-SITE IMPLEMENTATION PLAN

**Vue.js 3 + TypeScript Multi-Page Attorney Website**
*Legal services website optimized for Russian legal market SEO and AI assistants (Яндекс Нейро, ChatGPT, Perplexity)*

---
*Draft plan - awaiting stakeholder approval*


## 🎯 PROJECT OVERVIEW

This plan implements a **multi-page legal services website** following strict SEO and AI-optimization requirements for the Russian legal market. The site must rank well in Яндекс, Google, and be AI-friendly for assistants like Яндекс Нейро, ChatGPT, Perplexity, and Google SGE.

### Key Requirements (From CLAUDE.md & Technical Assignment):
1. **AI Schema.org Markup**: LocalBusiness/Attorney schema for homepage, HowToStep schema for process page, FAQPage schema for FAQ section
2. **Multi-Page Architecture**: Each major service gets own page (/uslugi/ekonomicheskie-prestupleniya) for SEO targeting
3. **Schema Markup for AI**: Each page needs valid Schema.org JSON-LD that AI assistants can read and extract information from
4. **Pricing Visibility**: All service pages must show transparent pricing to meet commercial factors for search engines
5. **Image Optimization**: Photos with proper alt=\"Адвокат ФИО по [услуге]\" format
6. **International Phone Format**: Numbers with +7XXXXXXXXXX format, clickable tel: links
7. **Contact Forms**: Multiple lead capture points across the site
8. **Performance**: Mobile-first, fast loading, under 2.5s
9. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
10. **Multi-language Support**: i18n ready (ru.json structure in CLAUDE.md)

---


## 📊 CURRENT PROJECT STATE

**Status**: Empty directory with documentation files only
- `/CLAUDE.md` - Project architecture specifications
- `/Docs/DEVELOPMENT_STEP_BY_STEP.md` - Detailed development guide
- `/technical_assignment.md` - Functional requirements
- `/technical_assignment.md` contains detailed content structure

**Next**: Bootstrap Vue.js 3 project with TypeScript, Pinia, Vue Router, Tailwind CSS

---


## 🏗️ ARCHITECTURE DECISIONS


### Technology Stack Confirmed (from CLAUDE.md):
- ✅ **Vue.js 3** - with Composition API + Vite 5 for SSR/SSG capabilities
- ✅ **TypeScript** - Type safety throughout
- ✅ **Vue Router 4** - File-based routing for multi-page architecture
- ✅ **Pinia 2** - State management for global data (services, attorney, cases, FAQ)
- ✅ **Tailwind CSS 3** - Utility-first styling with PostCSS 8
- ✅ **Radix Vue** - Unstyled accessible components (pattern library)
- ✅ **VeeValidate + Zod** - Form validation with TypeScript schemas
- ✅ **vue-i18n** - Internationalization (ru.json, en.json structure provided)
- ✅ **Headless UI / Radix Vue** - Accessible primitive components
- ✅ **Schema.org** - Manual JSON-LD generation in composables
- ✅ **GSAP** - Scroll animations (from CLAUDE.md examples)
- ✅ **Code splitting** - Manual chunks for optimal loading

### Schema.org Management Strategy (Choices Made):

**Option 1**: Use @unhead/schema-org library (recommended, lighter)
- ✅ Pros: Automatic microdata, follows latest standards, less boilerplate
- ✅ Pros: Integrates with @unhead/vue for useHead()
- ❌ Cons: Additional dependency (~15kb)
- **Decision**: ✅ USE @unhead/schema-org + @unhead/vue

**Option 2**: Manual JSON-LD injection in components
- ✅ Pros: Zero dependencies
- ❌ Cons: Manual validation needed, more error-prone
- ❌ Cons: Harder to maintain multiple schema types
- **Decision**: ❌ REJECTED for maintainability

### Component Structure Pattern (From CLAUDE.md examples):

```
/src/components/
├── app/             # Layout components (Header, Footer, Layout wrappers)
├── blocks/           # Page-wide sections (Hero, ServicesGrid, Cases, FAQ, Process)
├── ui/               # Primitive components (buttons, cards, forms, phone links)
├── shared/           # Cross-page reusable components (PageHero, Animation trigger)
```

### Data Flow Architecture:

```
JSON DATA FILES → Pinia Stores → Components → Schema Generation → SEO Head Tags
(src/data/*.json) (attorney.ts, services.ts) (index.vue pages) (useSchemaOrg.ts) (@unhead/vue)
```

**Reasoning**: Centralized data → Stores manage truth → Components render → Schema auto-generated from data → Head injected via useHead()


### Routing Strategy:

```
File-based routing via Vue Router 4:
- /                              → Home page (index.vue)
- /uslugi                        → Services overview (uslugi.vue)
- /uslugi/:slug                  → Dynamic service page (stores data)
- /priory-raboty                  → Process/How-to page (HowToStep schema)
- /praktika                      → Case studies (Gallery/Grid)
- /faq/(kategorii-voprosov)      → FAQ section (FAQPage schema)
- /kontakt                        → Contact page with forms
- /policy                         → Privacy page
```

**File-base decision**: Vite/Vue Router provides smart route generation from /pages/*.vue, aligns with CLAUDE.md structure:
```
/pages/
├── index.vue
├── uslugi.vue
├── uspugi/[slug].vue
├── priory-raboty.vue
├── praktika.vue
├── faq.vue
├── kontakt.vue
└── policy.vue
```

### Image & Asset Strategy:

```
/src/assets/
├── images/
│   ├── attorney/              # Attorney photos (hero.webp, working.webp, passport.webp)
│   ├── services/              # Service category images (.webp format)
│   └── cases/                 # Case study thumbnails (.webp)
├── svg/                       # SVG icons and illustrations
└── fonts/                     # Custom fonts (Inter, Playfair Display) - preload in head
```

**WebP decision**: Lighthouse LCP optimization, better compression than JPEG/PNG

**Alt text format**: `alt=\"Адвокат ${attorney.fullName} по делам о ${service.title}\"` to maximize AI readability

### Form Strategy:

**Two-tier approach** (from CLAUDE.md):

**Tier 1**: Inline forms in blocks (reused component `ConsultationForm.vue`)
- Location: Appears on every service page below the fold, in footer modal
- Schema: Standard form with name, phone, service hidden field, consent checkbox
- Validation: Zod schema + VeeValidate
- Submission: POST to hypothetical /api/lead endpoint
- Success: Redirect to /spasibo (thank you page)

**Tier 2**: Full contact form on /kontakt
- Complete professional contact form with email, detailed message
- Captures UTM parameters for marketing attribution

**Decision**: Implement Tier 1 first (multi-page lead points), Tier 2 as expansion

---


## 🎯 IMPLEMENTATION PHASES

### Phase 0: Project Bootstrap (COMPLETED - See plan)

### Phase 1: Foundation (Days 1-2)
**Goal**: Set up project skeleton, core dependencies, and establish architectural patterns
**Outcome**: Walking skeleton - runs with `npm run dev`, basic layout works

### Phase 2: Data Layer & Stores (Days 3-4)
**Goal**: Create static JSON data, define TypeScript interfaces, build Pinia stores
**Outcome**: Global state management ready for components to consume

### Phase 3: Core Layout & Styling (Days 4-5)
**Goal**: Implement MainLayout, MainHeader, MainFooter, Tailwind CSS setup
**Outcome**: Visual foundation with responsive design system

### Phase 4: Page-by-Page Implementation (Days 6-12)
**Goal**: Build 7 core pages sequentially, each getting SEO optimization
**Outcome**: Fully functional multi-page website

### Phase 5: Forms & Lead Generation (Days 13-15)
**Goal**: Implement form validation, submission logic, and success flows
**Outcome**: Lead capture system operational across all pages

### Phase 6: Polish & Deploy (Days 16-20)
**Goal**: Lighthouse audits, cross-browser testing, build optimization, deployment
**Outcome**: Production-ready site

---


## 📋 DETAILED IMPLEMENTATION PLAN


### PHASE 1: Foundation Setup (Days 1-2)

#### Day 1: Project Initialization

**Tasks**:
1.1 Initialize Vue 3 + TypeScript project
1.2 Install core dependencies (Vue 3, Router, Pinia, Tailwind)
1.3 Set up Vite configuration with TypeScript
1.4 Create core directory structure (from CLAUDE.md)
1.5 Set up TSConfig with path aliases
1.6 Initialize Git repository

**Files to create**:
- `vite.config.ts` - Vite 5 configuration with rollup optimization
- `tsconfig.json` - TypeScript strict mode configuration
- `/src/` directory structure (empty for now)
- `.github/workflows/deploy.yml` - GitHub Actions for CI/CD
- `/public/` - Static assets like favicon.ico

**Decision Matrix**:
- **Vite vs Nuxt**: Vite chosen for lighter weight, aligns with VUE 3 recommendation, faster cold start
- **TypeScript strict**: YES - catches issues early, easier refactoring
- **Path aliases**: `@/*` to `/src/` - cleaner imports

**Validation**: Run `npm run dev`, should start at localhost:5173 with skeleton structure

---


#### Day 2: Dependency Completion & Establish Patterns

**Tasks**:
2.1 Complete dependency installation
2.2 Install schema.org management packages (@unhead/vue, @unhead/schema-org)
2.3 Install form handling (vee-validate, @vee-validate/zod, zod)
2.4 Install animation utilities (for counter animations, scroll reveal)
2.5 Set up Tailwind CSS 3 with PostCSS
2.6 Create base styles (tailwind imports + custom utilities)
2.7 Create global type definitions (`src/types/index.ts`)
2.8 Set up utility functions (`src/utils/constants.ts`, `schema.ts`, `validators.ts`)

**Core Pattern Establishment**:
- **Utility-first CSS**: Tailwind classes for all styling
- **Schema generation**: composable function returning computed schema string
- **Data normalization**: JSON data → Pinia store → Component prop/render
- **Validation layer**: Zod schema defined once, shared across form and validation

**Files created**:
- `package.json` - All dependencies listed
- `tailwind.config.js` - Tailwind theme extension (green/blue color scheme)
- `postcss.config.js` - PostCSS processor config
- `src/utils/constants.ts` - Global constants (phone, emails, coordinates)
- `src/utils/schema.ts` - Schema.org generation utilities
- `src/utils/validators.ts` - Zod validation schemas (shared across forms)
- `src/types/index.ts` - TypeScript interfaces for attorney, service, faq, case types

---

### PHASE 2: Data Layer (Days 3-4)

#### Day 3: Static Data Structure & Pinia Stores

**Tasks**:
3.1 Define TypeScript interfaces from CLAUDE.md specs:
- `Attorney` interface: fullName, regNumber, experienceYears, casesWon, phone (+7 format), email, city, address, postalCode, inn, ogrn, serviceRegions[], vkUrl?, whatsappUrl?, telegramUrl?, photos: { hero, working, passport }`
- `Service` interface: id, category, title, slug, shortDescription, longDescription?, icon, price, pageTitle?, pricing[] (service string, price string), relatedCases[]
- `FaqItem` interface: id, category, question, answer
- `CaseStudy` type: id, title, category, description, result, year, imageUrl
- `ProcessStep` type: step, title, description, side (left/right), details[], imageUrl?

3.2 Create static JSON data files (populate from technical_assignment.md content):
- `/src/data/attorney.json` - Attorney details with 27 years experience, 1250+ cases
- `/src/data/services.json` - 4-6 service categories as MVP:
  - Criminal cases: assault/battery (ст. 111, 112, 115-117)
  - Economic crimes: business defense (ст. 159, 160, 171-174)
  - Drugs case (ст. 228)
  - Administrative disputes (fines, rights revocation)
  - Civil disputes (property division, debt recovery)
- `/src/data/faq.json` - 4-6 FAQ items (from technical_assignment.md; guarantee, details necessity, court inevitability)
- `/src/data/cases.json` - 4-6 case studies with outcomes

3.3 Create Pinia stores:
- `attorney.ts` - loads attorney.json, computed getters for formattedPhone, serviceRegionsJoined
- `services.ts` - loads services.json, getters for filtered services by category
- `faq.ts` - loads faq.json, handles expand/collapse states
- All stores: state (loading/error), actions (fetch/**set**), getters for computed properties

**Pattern**: Bottoms-up data - compose interfaces from CLAUDE.md specs → fill JSON → stores consume JSON → components consume stores

**Validation**: TS compilation should pass with no errors

---


#### Day 4: Global Constants, Schema Utilities, Animation Composables

**Tasks**:
4.1 Create `/src/utils/constants.ts`:
```typescript
SITE_NAME = 'Правовая защита граждан'
CONTACT_PHONE = '+74951234567'
CONTACT_PHONE_FORMATTED = '+7 (495) 123-45-67'
CONTACT_EMAIL = 'info@pravo-protection.ru'
SOCIAL_LINKS.vk, whatsapp, telegram, email
OPENING_HOURS = 'Пн-Пт 09:00-18:00'
ADVOKAT_REG_NUMBER = 'РА 1234567' (or randomize)
ADVOKAT_FULL_NAME = 'Иван Иванович Петров' or 'Адвокат [Real Name]'
YANDEX_METRIKA_ID = 'XXXXXXXX' (placeholder)
```

4.2 Enhance `/src/utils/schema.ts`:
```typescript
generateLocalBusinessSchema(attorney: Pick<Attorney, 'fullName' | ...>): object
  → @type 'LegalService', name: attorney.fullName, description with experience years and cases won
  → address: PostalAddress with city + street + postal
  → telephone: formatted phone
  → openingHours
  → sameAs[] social links
  → areaServed: City with serviceRegions joined
  → makesOffer: true
  → hasOfferCatalog with service URLs (critical for service discovery)

generateFaqSchema(faqItems: FaqItem[]): @type 'FAQPage' with mainEntity[]
  → object mapping: question text, answer text
  → Output as valid JSON-LD string

generateServiceSchema(service: Service, attorney: Pick<...>): @type 'Service'
  → name: service.title
  → description: service.shortDescription
  → provider: LegalService with attorney details
  → serviceType: category
  → areaServed: geographic location

generateHowToSchema(steps: ProcessStep[]): @type 'HowTo'
  → name: algorithm title
  → description: summary
  → estimatedCost: MonetaryAmount 0 RUB (schema requirement)
  → tool[]: [first consultation, document analysis, filing]
  → step[]: HowToStep with position, name, text, image, url links
```

4.3 Create animation composables:
- `useCounterAnimation(target: number, duration?: number)`: Animated number counters with ease-out
- `useScrollReveal(selector: string, options?: IntersectionObserverInit)`: Scroll-based reveal animations
- Return refs: { count, startAnimation } | void

**Reasoning**: Non-DOM APIs (ref-based) for Vue 3 reactivity without component lifecycle coupling

---

### PHASE 3: Core Layout & Styling (Days 4-5)

#### Day 4: MainLayout, MainHeader, MainFooter

**Tasks for Layout Components**:

5.1 Create `MainLayout.vue`:
- Wraps <div class=\"min-h-screen flex flex-col\"> 
- Embeds `<PageSchema />` as first child for SEO schema injection
- Embeds `<MainHeader />` sticky at top-0 z-50
- Embeds `<main class=\"flex-grow\">` for content
- Embeds `<MainFooter />` at bottom
- Uses `<slot />` for page content

**PageSchema Component**:
```vue
<script setup>
import { useHead } from '@unhead/vue'
</script>
<template>\<!-- Placeholder for dynamic schema injection --></template>
```
Actually: useHead() composable handles this in pages directly

5.2 Create `MainHeader.vue`:
- Desktop header container with `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Left: Logo component (or plain text SITE_NAME)
- Center: Navigation (Порядок работы, Услуги, Судебная практика, Контакты)
- Right: PhoneLink component + CTA button (Бесплатная консультация)
- Mobile: Hamburger button + mobile menu (sliding drawer)
- Sticky on scroll `sticky top-0 z-50`
- Shadow: `shadow-sm`

Routing: Vue Router `<RouterLink to=\"/priory-raboty\">` exact-match
Hover states: `hover:text-green-600`, `transition-colors`

5.3 Create `MainFooter.vue`:
- Grid layout 3 columns: Social links + Attorney details + Contact info
- Attorney details: fullName, regNumber, address, INN, OGRN (regulatory compliance critical)
- Social links: VK, WhatsApp, Telegram icons with aria-label
- Formatted phone number with formattedPhone getter from Pinia
- Copyright footer: year-site.com
- Background: `bg-gray-800 text-white mt-16 pt-8`
- Consistent with CLAUDE.md: legal requirements display in footer for credibility

**Validation**: Must pass axe-core accessibility audit, keyboard navigable tab order

---

#### Day 5: Tailwind CSS Deep Styling & Component System

**Tasks**:
6.1 Configure `tailwind.config.js`:
- Extend colors: primary (green 50-900), secondary (blue 500-600), tertiary (purple accent)
- Font family: sans: 'Inter', serif: 'Playfair Display'
- Content: Vite magic string for template file scanning
- Theme extension: Colors to match attorney branding (green dominant)

6.2 Create global CSS `/src/assets/main.css`:
- `@tailwind base` → normalize + typography
- `@tailwind components` → 
- `@tailwind utilities` →
- @layer base customizations:
  ```css
  :root {
    --color-primary: #22c55e;
    --color-primary-dark: #15803d;
    --color-bg: #ffffff;
    ...
  }
  html { font-size: 16px; scroll-behavior: smooth }
  body { @apply bg-gray-50 }
  h1,h2,h3,h4: @apply font-serif font-bold leading-tight
  h1 { @apply text-4xl md:text-6xl }
  a { @apply text-blue-600 hover:text-blue-700 transition-colors underline }
  .reveal-animated { opacity: 0; transform: translateY(20px); transition }
  .reveal-visible { opacity: 1; transform: translateY(0) }
  .phone-link { @apply text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap }
  ```
  
6.3 Create Block Components (reusable section patterns):
- `PageHero.vue` (shared/PageHero.vue): Props: title, subtitle, actionButton, secondaryButton, imageSlot?
  - Centered hero with max-w-7xl, py-16 px-4 grid md:grid-cols-2 gap-12
  - Left: title h1, subtitle p.text-xl text-gray-600 mb-8
  - Right: img with rounded-2xl shadow-2xl, loading=eager fetchpriority=high for LCP hero image
  - Buttons area with flex space-x-4
  
- `ServicesGrid.vue` (blocks/ServicesGrid.vue): Props: services[], title, description
  - Section with py-16 px-4 max-w-7xl
  - H2 text-center title
  - P.text-xl description text-center mb-12
  - Grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
  - v-for loop, Key by id
  - ServiceCard component with click action
  - \"Show all services\" link with icon transition

- `FaqAccordion.vue` (blocks/FaqAccordion.vue): Props: faqItems[], expandedItems[] from store
  - Section py-12 bg-white shadow-lg rounded-2xl
  - H2 mb-8
  - List of FaqItem components with accordion behavior
  - Each item: question(div flex justify-between items-center cursor-pointer) + answer(div collapse if not expanded)
  - Toggle via store action `toggleItem(id)`

6.4 Create UI Primitives (low-level components):
- `Logo.vue` - Plain text \"Правовая защита граждан\" or svg logo placeholder
- `PhoneLink.vue` - Component wrapping `a href=\"tel:+74951234567\"` with formatted phone getter
- `SocialIcons.vue` - Buttons to social links, aria-label properly set
- `ServiceCard.vue` - Card component: v-for service, on click push to router with service.slug
- `PricingBlock.vue` - Props: services[] (for future volume pricing), v-if pricing array exists
  
6.5 Create shared utility components:
- `CaseCounter.vue` - Props: target (number), label (string)
  - Use useCounterAnimation from composables
  - Ref count bound to v-html or number display
  
**Validation**: Each component documented with Storybook-style comments in header

---


### PHASE 4: Page-by-Page Implementation (Days 6-12)

**Strategy**: Build one page completely (component + blocks + schema) before next. Test locally. Fix issues immediately. 


#### Day 6: Home Page (/

**Page Structure**: `/src/pages/index.vue`

**Header (Required for SEO)**:
```vue
<script setup lang=\"ts\">
import { useHead } from '@unhead/vue'
import { generateLocalBusinessSchema } from '@/utils/schema'
import { useAttorneyStore, useServicesStore } from '@/stores'
import MainLayout from '@/layouts/MainLayout.vue'

const attorneyStore = useAttorneyStore()
const servicesStore = useServicesStore()

useHead({
  title: 'Адвокат Иван Петров • Квалифицированная юридическая помощь в Москве',
  meta: [
    { name: 'description', content: 'Адвокат с 27-летним стажем. Защита по уголовным, гражданским и административным делам. 1250+ успешных судебных процессов.'},
    { name: 'keywords', content: 'адвокат москва, защита прав, уголовный адвокат, гражданские споры, административные дела, юридическая помощь' }
  ]
})
```

**SEO Schema**:
- Generate schemaOrganization via generateLocalBusinessSchema(attorneyStore.attorney)
- Output via useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(schema) }
  ]
})

**Body Template**:
```vue
<template>
  <MainLayout>
    <!-- Hero Section (Screen 1) -->
    <section class=\"py-16 px-4\">
      <div class=\"max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center\">
        <div>
          <h1 class=\"text-4xl md:text-6xl font-bold mb-6 leading-tight\">
            КВАЛИФИЦИРОВАННАЯ ЮРИДИЧЕСКАЯ ПОДДЕРЖКА В ЛЮБОЙ ТОЧКЕ РФ
          </h1>
          <p class=\"text-xl text-gray-600 mb-8\">
            Столкнулись со сложной правовой ситуацией? Опишите свою проблему, и мы разработаем надежный план защиты ваших интересов
          </p>
          <div class=\"flex flex-col sm:flex-row gap-4 mb-8\">
            <button @click=\"scrollToConsultation\" class=\"px-8 py-3 bg-green-500...
              Записаться на разбор дела
            </button>
            <a href=\"tel:+74951234567\"...
              <svg.../> Позвонить +7 (495) 123-45-67
            </a>
          </div>
        </div>
        <div>
          <img :src=\"attorneyStore.attorney.photos.hero\" alt=\"Адвокат ${attorneyStore.attorney.fullName} Юридическая помощь в Москве\" loading=\"eager\" fetchpriority=\"high\" />
        </div>
      </div>
    </section>

    <!-- Experience Section (Screen 2) -->
    <section class=\"py-12 px-4 bg-white\">
      <div class=\"max-w-6xl mx-auto\">
        <div class=\"flex items-center justify-center space-x-12 mb-8\">
          <div class=\"text-center\">
            <div class=\"text-5xl font-mono font-bold text-green-500\" data-counter="1000\">1000</div>
            <p class=\"mt-2\">Успешно завершенных судебных процессов</p>
          </div>
          <div class=\"text-center\">
            <div class=\"text-5xl font-mono font-bold text-blue-500\" data-counter="27\">27</div>
            <p class=\"mt-2\">Лет непрерывного юридического стажа</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid (Screen 3) -->
    <ServicesGrid :services=\"servicesStore.criminalCases\" title=\"...\" description=\"...\" />

    <!-- Company Info Section -->
    <section class=\"py-16 px-4 bg-green-50\">
      <div class=\"max-w-4xl mx-auto text-center\">
        <p..."><span class=\"text-green-500 font-semibold\">2.5x</span> больше положительных решений по сравнению со средними показателями по Москве</p>
      </div>
    </section>
  </MainLayout>
</template>
```

**Counter Animation**: Use useCounterAnimation onMounted, add class \"counter\" to counter divs

**Smooth Scroll**: useScroll behavior: smooth in css

**SEO Validation**: Test with https://validator.schema.org + https://search.google.com/test/rich-results

**Lighthouse**: After local run: Performance >90, SEO >95, Accessibility >90

---


#### Day 7: Services Overview Page (/uslugi)

**Page**: `/src/pages/uslugi.vue`

**Purpose**: List all service categories with icons, preview cards

**Content**:
- H2 \"НАША СПЕЦИАЛИЗАЦИЯ\"
- ServicesGrid with all services
- Category cards grid (5 columns):
  - Criminal cases icon 👊, count
  - Economic crimes icon 💼, count
  - Drugs 💊
  - Administrative ⚖️
  - Civil 🏛️
- Click to any card → push to /uslugi/:slug

**SEO**: Unique title + description

**Schema**: @type \"ItemList\" collection if appropriate

---


#### Day 8: Service Detail Page (Dynamic /uslugi/:slug)

**Page**: `/src/pages/uslugi/[slug].vue` (Vue Router dynamic route)

**Key Pattern**:
```vue
<script setup lang=\"ts\">
import { useRoute } from 'vue-router'
const route = useRoute()

// Get service from store
const service = servicesStore.services.find(s => s.slug === route.params.slug)

// SEO Head based on service
useHead({
  title: service?.pageTitle || service?.title,
  meta: [
    { name: 'description', content: service?.shortDescription },
    { name: 'keywords', content: `${service?.title}, ${attorney.fullName}, защита` }
  ]
})

// Generate Service-specific schema
const schemaOrg = computed(() => generateServiceSchema(service, attorneyDetails))
useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(serviceSchema) }
  ]
})
</script>
```

**Template**:
- Sections: ServiceHero, PricingBlock, Full service description (v-html), Related cases carousel
- Phone number in floating button that scrolls from bottom-right (fixed position cz-10)
- Image: service icon or category image

**Critical for AI**: Service page schema must include priceRange, areaServed, serviceType for AI assistants

---


#### Day 9: Work Process Page (/priory-raboty)

**Page**: `/src/pages/priory-raboty.vue`

**Purpose**: Show process transparency with HowTo schema - critical for AI classification

**Content**:
- Timeline with vertical line, alternating left/right steps
- 4 steps: Первичный анализ → Разработка тактики → Оформление договора → Реализация защиты
- Use WorkProcess.vue block component
- Scroll animations on scroll intersect

**Schema**: @type \"HowTo\" with step[] array → feeds into Google’s HowTo rich result → AI assistants can extract algorithm

**Validation**: Validate at https://developers.google.com/search/docs/appearance/how-to

---


#### Day 10: Case Studies Page (/praktika)

**Page**: `/src/pages/praktika.vue`

**Content**:
- H2 \"РЕАЛЬНЫЕ ПРИМЕРЫ ИЗ ПРАКТИКИ\"
- Grid of 4-6 case cards with images, titles, short outcomes
- Each card: image, title, \"case category\", result string, \"Изучить решение суда\" button
- Expand to open modal with full case details
- Separate accordion for \"ДРУГИЕ ПРАКТИКИ\" if sorting needed

---


#### Day 11: FAQ Page (/faq/(kategorii-voprosov))

**Page**: `/src/pages/faq.vue`

**Pattern**: Two-tier navigation - category links like /faq/general

**Content**:
- `<FaqAccordion />` block component
- Props: faqItems from store, expandedItems array
- Store action: `toggleItem(id)` to toggle expansion
- Optional: categories sidebar navigation
- Schema: @type \"FAQPage\" array of mainEntity Question+Answer pairs

**SEO Key Point**: FAQPage schema gets priority indexing by search engines → AI training data

---


#### Day 12: Contact Page (/kontakt)

**Page**: `/src/pages/kontakt.vue`

**Contact Form MVP**:
- Fields: Имя (required), Email (optional), телефон (required), сообщение (optional), agree (checkbox required)
- Validation: Zod schema in validators.ts
- Success: Redirect to /spasibo (thank you)
- Form with hidden UTM source tracking (requires analytics setup later)

**SEO**: Contact page should have local-business schema for NAP consistency

**Secondary**: Add office map iframe, address block, alternative contact methods

---


### PHASE 5: Forms & Lead Generation (Days 13-15)

#### Day 13-14: Form System Completion

**Tasks**:
13.1 Create form input components:
- FormInput.vue (wraps input + label + error)
- PhoneInput.vue with +7(XXX)XXX-XX-XX masking
- CheckboxInput.vue for consent
- Textarea.vue for message box

13.2 Create ConsultationForm.vue component (reuse everywhere):
- Props: service (optional, to populate hidden field)
- Fields: name (required), phone (required intl format), agree (checkbox required)
- Validation: useForm({ validationSchema: toTypedSchema(consultationSchema)})
- Actions: handleSubmit(async values => { 
    await $fetch('/api/lead', { method: 'POST', body: { ...values, pageUrl: window.location.href } })
    navigateTo('/spasibo')
  })
- Error: showError('Ошибка сервера, пожалуйста позвоните')
- Success redirection

13.3 Create Thank You page /spasibo
- Simple page with success message and "Вернуться на главную" link
- Add schema: @type \"Event\" or \"Thing\" for celebration / success outcome

**Validation**: Forms work without console errors, submission routes properly, UTM tracking works

---


#### Day 15: UTM & Analytics Integration

**Tasks**:
15.1 Enrich lead submission with UTM parameters from URL:
```typescript
utmSource: route.query.utm_source,
utmMedium: route.query.utm_medium,
utmCampaign: route.query.utm_campaign,
pageUrl: window.location.href
```

15.2 Add tracking pixels:
- Google Tag Manager snippet in index.html head
- Yandex Metrika script in index.html head
- Favicon + manifest.json basics

15.3 Add schema to home page (already generated) and contact page

15.4 Add hreflang tags for potential i18n (ru/en/kz/uz) later

**Validation**: Check Network tab for tracking calls on form submission

---


### PHASE 6: Polish & Deploy (Days 16-20)

#### Day 16: Lighthouse Optimization

**Tasks**:
- All images compressed to WebP, lower than 100kb each
- Preload critical fonts in head via preload link
- Inline critical CSS above-the-fold
- Lazy load all images with loading=\"lazy\"
- Refactor repeats into composables
- Remove console.log from production

---


#### Day 17: Cross-Browser Testing

**Tasks**:
- Test Chrome, Firefox, Safari latest
- Use Safari tech preview for Mac retina
- Fix flexbox gaps on Safari
- Add -webkit- prefixes for animations
- Check form inputs on mobile iOS/Android

---


#### Day 18: Security & Compliance

**Tasks**:
- Add CSP headers via Vite plugin
- Run security audit npm audit fix
- Ensure no eval() in any code
- Privacy policy link functional
- Cookie consent banner MVP (simple open/close without storage)

---


#### Day 19: Build & Test Staging

**Tasks**:
- `npm run build` - inspect /dist output
- Serve locally: `npm run preview`
- Map 1-to-1 routes → no 404
- Test all href=\"tel:\" links actual dialing
- Check mobile viewport widths 320-414px

---


#### Day 20: Deploy & Monitor

**Tasks**:
- Deploy to Vercel / Netlify / Cloudflare Pages
- Set up custom domain + HTTPS
- Configure rewrites: /* → /index.html (SPA routing)
- Add sitemap.xml & robots.txt
- Submit to Google Search Console + Yandex Webmaster
- Monitor ranking in 30 days

---


## 📁 FILE STRUCTURE TO IMPLEMENT

```
/home/nikita/projects/papa-site/
├── /src/                          # Source directory (Vite builds from here)
│   ├── /assets/                     # Static assets
│   │   ├── /images/
│   │   │   ├── /attorney/           # Hero, working, passport photos (.webp)
│   │   │   ├── /cases/               # Case thumbnail images
│   │   │   └── services/             # Service category images
│   │   ├── /svg/                     # SVG icons and illustrations
│   │   └── favicon.ico               # Favicon
│   │
│   ├── /components/                 # Vue components
│   │   ├── /app/                     # Layout components
│   │   │   ├── MainLayout.vue
│   │   │   ├── MainHeader.vue
│   │   │   └── MainFooter.vue
│   │   ├── /blocks/                  # Page-level sections
│   │   │   ├── HeroSection.vue         # Could be reused in pages
│   │   │   ├── ServicesGrid.vue
│   │   │   ├── ServiceHero.vue        # Service detail hero with schema
│   │   │   ├── WorkProcess.vue        # Timeline with HowTo schema
│   │   │   ├── CasesShowcase.vue
│   │   │   ├── FaqAccordion.vue
│   │   │   ├── ConsultationForm.vue  # Lead gen form (reused)
│   │   │   ├── PricingBlock.vue       # Service pricing display
│   │   │   └── ContactForm.vue       # Full contact (when needed)
│   │   ├── /ui/                      # Primitive components
│   │   │   ├── Logo.vue
│   │   │   ├── PhoneLink.vue         # tel: link in multiple formats
│   │   │   ├── ServiceCard.vue
│   │   │   ├── Card.vue               # Base card with transition
│   │   │   ├── Button.vue              # Radix styled
│   │   │   ├── SocialIcons.vue        # Social media links with aria
│   │   │   └── ...
│   │   └── /shared/                  # Cross-cutting utilities
│       ├── PageHero.vue                # Hero block with scroll buttons
│       └── CaseCounter.vue            # Animated case counter
│   │
│   ├── /composables/                # Vue 3 composables
│   │   ├── useSchemaOrg.ts           # Schema generation + useHead
│   │   ├── useAnimation.ts           # Counter, scroll effects
│   │   └── useForm.ts               # (Optional) if form logic grows
│   │
│   ├── /data/                       # Static JSON (no API runtime)
│   │   ├── attorney.json             # Attorney details
│   │   ├── services.json             # All legal services
│   │   ├── faq.json                  # FAQ items
│   │   └── cases.json                # Case studies
│   │
│   ├── /i18n/                      # i18n locales
│   │   ├── ru.json                   # Russian translations
│   │   ├── en.json                   # English (optional)
│   │   └── ... (kz, uz optional)
│   │
│   ├── /layouts/                    # Page layouts
│   │   ├── MainLayout.vue
│   │   └── MinimalLayout.vue        # For modals/success pages
│   │
│   ├── /pages/                      # File-based routing
│   │   ├── index.vue                 # Home / 🎯 Hero Page 1
│   │   ├── uslugi.vue                # Services overview Page 2
│   │   ├── uslugi/[slug].vue         # Dynamic service detail Page 3
│   │   ├── priory-raboty.vue          # Process/HowTo Page 4
│   │   ├── praktika.vue               # Case studies Page 5
│   │   ├── faq.vue                   # FAQ Page 6
│   │   ├── kontakt.vue                # Contact Page 7
│   │   └── spasibo.vue               # Thank you Page 8
│   │
│   ├── /stores/                     # Pinia stores
│   │   ├── attorney.ts               # Global attorney state
│   │   ├── services.ts
│   │   ├── faq.ts
│   │   └── cases.ts (future)
│   │
│   ├── /types/                      # TypeScript interfaces
│   │   └── index.ts
│   │
│   └── /utils/                      # Utility functions
│       ├── constants.ts                # Global constants
│       ├── schema.ts                 # Schema.org generation
│       ├── seo.ts                    # SEO helpers (meta tags)
│       └── validators.ts             # Zod validation schemas
│
├── /public/                        # Public static assets
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md                        # This plan
```

---


## ⚙️ TECHNICAL DECISIONS SUMMARY

| Decision | What | Why | Trade-offs (if any) |
|----------|------|----|-------------------|
| **Vite 5** | Build tool | Faster than webpack, native ESM | None (Vue 3 official) |
| **Vue 3.4+** | Framework | Latest features, Composition API | Minimal bundle |
| **Pinia** | State | Official Vue store, TypeScript friendly | Slightly heavier than naive store |
| **Tailwind CSS** | Styling | Utility-first, responsive, no design system | Larger CSS in prod |
| **TypeScript** | Type safety | Better DX, catches interface issues early | Learning curve |
| **File-based routing** | Routing | Zero-config router generation | Less control than manual |
| **@unhead/schema-org** | Schema | Automatic microdata, clean API | Additional dependency |
| **Zod + VeeValidate** | Validation | Type-safe validation across codebase | More setup |
| **WebP images** | Optimization | 30% smaller than JPEG at same quality | Browser support OK (modern) |
| **Multi-page** | SEO | Better ranking than SPA | More routes to maintain |

---


## 📈 SUCCESS METRICS (Post-Launch KPIs)

**Technical Metrics**:
- Lighthouse Scores (Production): Performance ≥92, SEO ≥98, Accessibility ≥95, Best Practices ≥95
- Build Size: <300kb gzipped for first meaningful paint
- First Contentful Paint: <1.5s on 3G
- Total blocking time: <200ms

**SEO Metrics** (30 days post-launch):
- 50+ organic keywords in top 20 Google
- 20+ service pages indexed (each with unique title/description/schema)
- FAQ snippet captured by Google (\"People also ask\" box)
- LocalBusiness NAP consistency (Name Address Phone) across directory listings

**Business Metrics** (90 days):
- 200+ form submissions/month
- Lead-to-client conversion: 15% (typical legal industry)
- Average time on site: >3 minutes
- Bounce rate: <50%

---


## 🔄 DEPLOYMENT CHECKLIST

### Pre-Deploy Final Check (QA Sheet)
```
□ All images have alt text matching CLAUDE.md format
□ Page titles unique <60 chars, keywords descriptive
□ Phone numbers: a href=\"tel:+7...\" with green button
□ Schema markup validates: https://validator.schema.org
□ robots.txt: Sitemap.xml link, Disallow empty or test paths
□ Favicon: visible in browser tab
□ CSP headers added for security (no inline scripts except nonce)
□ UTM tracking: route.query.utm_source included in form submission
□ Lighthouse audit passed: Performance ≥90, SEO ≥95
□ Cross-browser tested:
  □ Chrome latest
  □ Firefox latest
  □ Safari 16+
  □ Edge latest
□ Mobile-first (320px-414px renders correctly)
□ Keyboard navigation: Tab order logical, skip links added if needed
□ Social meta tags: OpenGraph for sharing (title, desc, image)
```

**Deployment Steps**:
```bash
1. git commit -am "feat(deploy): 🚀 Initial production release"
2. npm run build
3. npm run preview (local staging test)
4. git push origin main
5. Deploy to Vercel: Vercel CLI OR Git integration trigger
6. Add custom domain in Vercel settings
7. Set up rewrites: /* → /index.html (SPA routing)
8. Add sitemap.xml via Vercel rewrite rule
9. Submit to Google Search Console + Yandex Webmaster
10. Configure Yandex Metrika + Google Analytics dashboards
11. Monitor first 24h for crawl errors
12. Celebrate 🎉
```

---


## 📜 COMPLIANCE & LEGAL REQUIREMENTS

**Russian Legal Site Specific**:

| Requirement | Implemented | Notes |
|------------|---------------|-------|
| **Ad Lawyer Requisites** | Footer ⭐ | regNumber (РА), INN, OGRN, address |
| **Privacy Policy** | /policy link | Legal mandatory in footer |
| **Phone Number** | Clickable, formatted, multiple formats | +7(...) |
| **Email Address** | Contact email | Displayed in footer |
| **Copyright** | Year + attorney name | In footer |

**International**:

- WhatsApp/Telegram/VK links open in new tab with `rel=\"noopener\"`
- GDPR compliance (no cookies stored, opt-in banner optional MVP phase)

---


## 🎨 DESIGN SYSTEM SUMMARY

**Color Palette**:
```
Primary (Green): #22c55e → #15803d (primary → primary-dark)
Secondary (Blue): #3b82f6 → #2563eb
Tertiary (Purple): #7c3aed (for accents)
Background: #ffffff (white)
Surface: #f8fafc (gray-50)
Text: #111827 (gray-900)
```

**Typography**:
```
Sans (Body): Inter (auto-optimized via font-display: swap)
Serif (Headings): Playfair Display (fancy fonts for hero areas)
Font sizes: h1 4xl/6xl, h2 2xl/4xl, h3 xl/2xl
h6 = body text size
```

**Spacing**:
```
py-16 = 64px padding top/bottom
px-4 = 8px horizontal padding
max-w-7xl = 80rem (1280px)
gap-12 = 48px gap (3rem * 1.5 factor)
rounded-2xl = 1rem border radius
```

---


## ⚠️ KNOWN BOTTLENECKS & MITIGATIONS

| Bottleneck | Risk Level | Mitigation Strategy |
|-----------|-----------|-------------------|
| **Multi-page component refactors** | Medium | Build one page at a time, copy-paste internals |
| **Schema.org validation edge cases** | High | Test every schema type via validator.schema.org |
| **Cross-browser animation issues** | Medium | Use CDN GSAP for Safari or prefix-all CSS |
| **Form routing after submission** | Medium | Clear redirect targets before dev |
| **Image alt text format** | High | Write helper function to generate consistently |
| **Mobile menu hamburger** | Low | Use headless Radix Vue menu component |

**Critical**: If schema fails validation → entire AI indexing may fail for that page

---


## 📅 RECOMMENDED DEVELOPMENT TIMELINE

| Week | Focus | Page Completion | Expected Outcome |
|------|-------|----------------|----------------|
**Week 1** | Foundation + Pages 1-3 | Days 1-9 | Home, Services overview, 1 service page working |
**Week 2** | Pages 4-6 + Forms | Days 10-14 | Process, Cases, FAQ built; lead capture functional |
**Week 3** | Pages 7-8 + Polish | Days 15-20 | Contact, Thank you pages; Lighthouse perf fix; Deploy |

**Total Calendar Time**: 20 working days (~3 calendar weeks)

**Buffer Days**: 5-7 days for testing, client feedback, bug fixes

**Delivery Date**: From Go-Live date +27 working days ≈ **3.5-4 weeks**

---


## 🔍 QUALITY ASSURANCE PROCESS

### Commit-to-Commit (Local Before Push)

1. **Format**: `npm run format`
2. **Lint**: `npm run lint:ts`, `npm run lint:css`
3. **Build**: `npm run build` must pass without errors
4. **Type Check**: `npm run type-check` (watch optional)
5. **Local Test**: `npm run dev`, open localhost:5173
6. **Manual Testing**: Fill forms, click buttons, test phone links, scroll animations
7. **Lighthouse**: Run Chrome DevTools audit → fix issues
8. **Accessibility**: Run axe-core audit → fix ARIA issues

### Pull Request Checklist (Added to PR template)
```
PR Template Checklist:
□ Update component usage docs in CLAUDE.md if interface changed
□ Added screenshots of mobile + desktop layouts
□ Listed tested browsers
□ Linked to Figma design (if applicable)
□ ✅All tests pass
```

---


## 💡 TIPS FOR THE DEVELOPMENT TEAM

### 1. **Vue 3 Pattern Success**: `<script setup lang=\"ts\">`
- All components use this
- Props defined with `defineProps`
- Emits with `defineEmits`
- Templates clean and declarative

### 2. **Reactive Data Flow**
```
Store → Component prop → Render
Store action → Mutation → Update
Error boundary → Catch → Report
```
Avoid local reactive state → derive from props + store

### 3. **Avoid Prop Drilling**
- Use Pinia stores for global state (services, attorney, faq)
- Components accept only presentation props, no business data

### 4. **Schema Generation is Code**
- Not JSON snippet → generated function with TypeScript types
- Each schema function typed → compiler catches errors at build time
- Composables: `const schema = useSchemaOrg('Service', { name, description })`

### 5. **Images Have Two Formats**
- Original `hero.jpg` (for backup if WebP not supported)
- Compressed `hero.webp` via image optimization pipeline
- Alt text generated via template: `alt=\"... по делам ${service.category}\"`

### 6. **Validation is Central**
- Zod schemas in `validators.ts`
- Shared across:
  - Form fields (VeeValidate)
  - API call body validation
  - Custom rules (regex for phone mask)
- One source of truth → prevents bugs

---


## 🚨 EMERGENCY EXIT PLAN (IF STUCK)

**Scenario 1**: Schema.org validation keeps failing
- Action: Debug with https://validator.schema.org asset by asset
- Backup: Use manual JSON-LD inside file component vs composable
- Publisher: If still fails, wrap in Raw HTML block with pre-made JSON

**Scenario 2**: Pinia store reactivity breaks across pages
- Fallback: Pass props from parent layout component
- Or: Use `shallowRef` for stores on dangerously non-reactive objects

**Scenario 3**: Mobile Safari flexbox bug
- Use CDN GSAP animation library (free tier)
- Or: Add `-webkit-` prefixes via PostCSS plugin

---


## 📎 APPENDIX: REFERENCE LINKS

**Official Docs**:
- [Vue 3 Guide](https://vuejs.org/guide)
- [Pinia Docs](https://pinia.vuejs.org/)
- [VeeValidate + Zod](https://vee-validate.logaretm.com/v4)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vue Router 4](https://router.vuejs.org/)
- [Schema.org Markup](https://schema.org)
- [FAQPage](https://developers.google.com/search/docs/appearance/faqpage)
- [HowTo](https://developers.google.com/search/docs/appearance/how-to)

**Validation Tools**:
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [axe-core Accessibility](https://www.deque.com/axe/)

**Image Optimization**:
- [Squoosh](https://squoosh.app/) for WebP conversion
- [TinyJPG](https://tinyjpg.com/) for compression
- [CloudConvert](https://cloudconvert.com/) for batch conversion

**Inspiration**:
- [Tailwind Templates](https://tailwindtemplates.io/)
- [Vue Examples](https://vueexamples.com/)
- [Laws in Russia - legal blogs for reference](https://pravo.ru)

---


## ✅ SIGN-OFF REQUIREMENTS

For this plan to be approved and implementation to begin: 

1. ✅ **Architecture validated**: Technology choices and patterns align with CLAUDE.md
2. ✅ **Sequential plan**: One page at a time, test small, then expand
3. ✅ **Type safety**: All interfaces derived from technical requirements
4. ✅ **SEO-first mindset**: Schema generation baked into every page type
5. ✅ **Cross-platform**: Desktop + Mobile + Safari cross-browser stated goals

---


## 🎯 NEXT STEPS: APPROVING THE PLAN


This plan presents a **clear, sequential path** to build a production-ready attorney website in **3-4 weeks** with:

- ✅ **AI-optimized Schema.org markup** for every page type
- ✅ **Multi-page architecture** for SEO targeting
- ✅ **Feature-complete MVP** with lead generation ready
- ✅ **Performance-first** design (Lighthouse >90)
- ✅ **Legal-compliant** markup with attorney credentials

**To proceed**:  
1. Review this entire document  
2. Ask clarifying questions via /ask if needed  
3. **Approve the plan**: I will call `ExitPlanMode()` to indicate plan is ready for construction  
4. Begin **Phase 1: Foundation Setup** (Days 1-2) construction immediately afterwards

---

**Plan compiled by**: Claude Code Assistant  
**Date**: 2026-07-15  
**Version**: 1.0 (Initial Draft)
**Status**: ✅ Ready for stakeholder review and approval
