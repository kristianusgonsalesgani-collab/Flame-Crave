<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'

const cartStore = useCartStore()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Explore Menu', to: '/menu' },
  { name: 'About', to: '/about' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200'
      : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group" @click="mobileMenuOpen = false">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105"
          >
            <span class="text-xl">🍔</span>
          </div>
          <div class="leading-tight">
            <p
              class="font-extrabold text-lg tracking-tight transition-colors"
              :class="scrolled ? 'text-ink' : 'text-ink'"
            >
              Flame<span class="text-primary-600">&</span>Crave
            </p>
            <p class="text-[10px] font-medium tracking-widest uppercase text-muted">
              Fast Food Ordering
            </p>
          </div>
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-full text-sm font-semibold text-ink/70 hover:text-primary-600 hover:bg-primary-50 transition-all"
            active-class="text-primary-600 bg-primary-50"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <RouterLink
            to="/menu"
            class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all hover:scale-105"
          >
            Pesan Sekarang
          </RouterLink>

          <!-- Cart button -->
          <button
            class="relative w-11 h-11 rounded-full bg-stone-100 hover:bg-primary-50 flex items-center justify-center transition-all hover:scale-105"
            @click="cartStore.toggleCart()"
            aria-label="Keranjang belanja"
          >
            <svg class="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <transition name="badge">
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow-md"
              >
                {{ cartStore.totalItems }}
              </span>
            </transition>
          </button>

          <!-- Mobile menu toggle -->
          <button
            class="md:hidden w-11 h-11 rounded-full bg-stone-100 flex items-center justify-center"
            @click="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden pb-4">
          <div class="flex flex-col gap-1 bg-white rounded-2xl shadow-lg border border-stone-100 p-2">
            <RouterLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="px-4 py-3 rounded-xl text-sm font-semibold text-ink/70 hover:text-primary-600 hover:bg-primary-50 transition-all"
              active-class="text-primary-600 bg-primary-50"
              @click="mobileMenuOpen = false"
            >
              {{ link.name }}
            </RouterLink>
            <RouterLink
              to="/menu"
              class="px-4 py-3 rounded-xl text-sm font-bold text-white bg-primary-600 text-center"
              @click="mobileMenuOpen = false"
            >
              Pesan Sekarang
            </RouterLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
.badge-enter-active, .badge-leave-active {
  transition: all 0.25s ease;
}
.badge-enter-from, .badge-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
