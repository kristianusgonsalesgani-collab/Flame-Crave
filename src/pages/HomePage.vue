<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/common/ProductCard.vue'
import { categories } from '../data/categories'

const productStore = useProductStore()

const featuredCategories = categories.filter((c) => c.id !== 'all')

const stats = [
  { value: '15+', label: 'Menu Pilihan' },
  { value: '5⭐', label: 'Kualitas' },
  { value: '10min', label: 'Siap Saji' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700"></div>
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(250,204,21,0.2) 0%, transparent 50%);"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div class="text-white animate-fade-in-up">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold tracking-wider uppercase mb-6">
              🔥 #1 Fast Food Ordering
            </span>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-balance">
              Pesan Makanan Favoritmu<br />
              <span class="text-accent-300">Cepat & Mudah</span>
            </h1>
            <p class="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
              Jelajahi menu pilihan, kustomisasi sesuai selera, dan nikmati hidangan terbaik tanpa antre.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <RouterLink
                to="/menu"
                class="px-8 py-4 rounded-full bg-white text-primary-700 font-bold text-sm hover:scale-105 transition-transform shadow-2xl text-center"
              >
                Jelajahi Menu →
              </RouterLink>
              <RouterLink
                to="/about"
                class="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-colors text-center"
              >
                Tentang Kami
              </RouterLink>
            </div>

            <!-- Stats -->
            <div class="flex gap-8 mt-12">
              <div v-for="s in stats" :key="s.label">
                <p class="text-2xl font-extrabold">{{ s.value }}</p>
                <p class="text-xs text-white/60 uppercase tracking-wider">{{ s.label }}</p>
              </div>
            </div>
          </div>

          <!-- Hero image -->
          <div class="hidden lg:flex justify-center relative animate-fade-in" style="animation-delay: 0.2s">
            <div class="relative w-80 h-80">
              <div class="absolute inset-0 bg-accent-300/30 rounded-full blur-3xl animate-pulse"></div>
              <img
                src="https://images.pexels.com/photos/31372162/pexels-photo-31372162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Fast food spread"
                class="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
              />
              <div class="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <p class="text-xs text-muted">Mulai dari</p>
                <p class="font-extrabold text-primary-600">Rp 18.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-10">
        <span class="text-xs font-bold text-primary-500 uppercase tracking-widest">Kategori</span>
        <h2 class="text-3xl font-extrabold text-ink mt-2">Pilih Kategori Favoritmu</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <RouterLink
          v-for="(cat, i) in featuredCategories"
          :key="cat.id"
          :to="`/menu?cat=${cat.id}`"
          class="group flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-3xl border border-stone-100 hover:border-primary-200 hover:shadow-lg transition-all animate-fade-in-up"
          :style="`animation-delay: ${i * 60}ms`"
        >
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {{ cat.icon }}
          </div>
          <span class="font-bold text-sm text-ink">{{ cat.name }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-end justify-between mb-8">
        <div>
          <span class="text-xs font-bold text-primary-500 uppercase tracking-widest">Best Seller</span>
          <h2 class="text-3xl font-extrabold text-ink mt-2">Paling Laris Minggu Ini</h2>
        </div>
        <RouterLink to="/menu" class="text-sm font-bold text-primary-600 hover:text-primary-700 hidden sm:inline-flex items-center gap-1">
          Lihat semua →
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <ProductCard
          v-for="(product, i) in productStore.bestSellers"
          :key="product.id"
          :product="product"
          :index="i"
        />
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary-500 to-primary-600 p-8 lg:p-12">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-accent-300/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-white text-center md:text-left">
            <span class="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">🔥 Limited Time</span>
            <h2 class="text-2xl lg:text-3xl font-extrabold mb-2">Hemat hingga Rp 25.000</h2>
            <p class="text-white/80">Dengan paket promo spesial kami. Buruan sebelum kehabisan!</p>
          </div>
          <RouterLink
            to="/menu"
            class="px-8 py-4 rounded-full bg-white text-primary-700 font-bold text-sm hover:scale-105 transition-transform shadow-xl whitespace-nowrap"
          >
            Lihat Promo →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Promo Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-10">
        <span class="text-xs font-bold text-secondary-500 uppercase tracking-widest">Promo Spesial</span>
        <h2 class="text-3xl font-extrabold text-ink mt-2">Paket Hemat & Menu Diskon</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <ProductCard
          v-for="(product, i) in productStore.promoProducts"
          :key="product.id"
          :product="product"
          :index="i"
        />
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <h2 class="text-3xl lg:text-4xl font-extrabold text-ink mb-4 text-balance">Lapar? Tidak Perlu Tunggu</h2>
        <p class="text-muted mb-8 max-w-md mx-auto">Pesan sekarang dan nikmati makanan favoritmu tanpa ribet.</p>
        <RouterLink
          to="/menu"
          class="inline-flex px-10 py-4 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 hover:scale-105 transition-all shadow-2xl shadow-primary-500/40"
        >
          Mulai Pesanan
        </RouterLink>
      </div>
    </section>
  </div>
</template>
