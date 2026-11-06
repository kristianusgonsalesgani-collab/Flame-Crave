import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../pages/ExploreMenuPage.vue'),
    meta: { title: 'Explore Menu' },
  },
  {
    path: '/product/:id',
    name: 'detail',
    component: () => import('../pages/DetailPage.vue'),
    meta: { title: 'Detail Produk' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../pages/CheckoutPage.vue'),
    meta: { title: 'Checkout' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || ''
  document.title = title ? `${title} — Flame & Crave` : 'Flame & Crave'
})

export default router
