import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/index.vue') },
  { path: '/uslugi', name: 'services', component: () => import('@/pages/uslugi.vue') },
  {
    path: '/uslugi/dopolnitelnye/:groupId/:itemIndex',
    name: 'additional-service-detail',
    component: () => import('@/pages/uslugi/dopolnitelnye.vue'),
  },
  {
    path: '/uslugi/:slug',
    name: 'service-detail',
    component: () => import('@/pages/uslugi/[slug].vue'),
  },
  {
    path: '/priory-raboty',
    name: 'process',
    component: () => import('@/pages/priory-raboty.vue'),
  },
  { path: '/praktika', name: 'practice', component: () => import('@/pages/praktika.vue') },
  {
    path: '/praktika/:id',
    name: 'case-detail',
    component: () => import('@/pages/praktika/[id].vue'),
  },
  { path: '/faq', name: 'faq', component: () => import('@/pages/faq.vue') },
  { path: '/kontakt', name: 'contact', component: () => import('@/pages/kontakt.vue') },
  { path: '/policy', name: 'policy', component: () => import('@/pages/policy.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})
