<script setup lang="ts">
import { RouterLink } from 'vue-router'

const values = [
  { icon: '🔥', title: 'Selalu Fresh', desc: 'Setiap hidangan dibuat dari bahan segar setiap hari.' },
  { icon: '⚡', title: 'Cepat & Praktis', desc: 'Pesan online, jadi tanpa antre di kasir.' },
  { icon: '⭐', title: 'Kualitas Terjamin', desc: 'Resep pilihan dengan standar mutu tinggi.' },
  { icon: '💚', title: 'Bahan Pilihan', desc: 'Bahan baku terbaik dari mitra terpercaya.' },
]

const timeline = [
  { year: '2019', title: 'Awal Mula', desc: 'Flame & Crave lahir dari kecintaan pada fast food berkualitas.' },
  { year: '2021', title: 'Ekspansi Menu', desc: 'Menambah Pizza, Burger, dan menu pendamping untuk semua selera.' },
  { year: '2023', title: 'Digital Ordering', desc: 'Platform pemesanan online resmi diluncurkan.' },
  { year: '2026', title: 'Sekarang', desc: 'Melayani ribuan pelanggan dengan menu terlengkap.' },
]
</script>

<template>
  <div class="pt-16 lg:pt-20">
    <!-- Hero -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600"></div>
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%);"></div>
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span class="text-xs font-bold uppercase tracking-widest text-white/70">Tentang Kami</span>
        <h1 class="text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-balance">Flame & Crave</h1>
        <p class="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Kami percaya makanan cepat saji harus tetap berkualitas, fresh, dan memuaskan. Sejak 2019, kami melayani pelanggan dengan menu pilihan dan pemesanan yang mudah.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <span class="text-xs font-bold text-primary-500 uppercase tracking-widest">Mengapa Memilih Kami</span>
        <h2 class="text-3xl font-extrabold text-ink mt-2">Komitmen Kualitas Kami</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(v, i) in values"
          :key="v.title"
          class="bg-white rounded-3xl p-6 text-center border border-stone-100 hover:shadow-lg hover:border-primary-200 transition-all animate-fade-in-up"
          :style="`animation-delay: ${i * 80}ms`"
        >
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-3xl mx-auto mb-4">
            {{ v.icon }}
          </div>
          <h3 class="font-bold text-ink mb-2">{{ v.title }}</h3>
          <p class="text-sm text-muted leading-relaxed">{{ v.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Story Timeline -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <span class="text-xs font-bold text-primary-500 uppercase tracking-widest">Cerita Kami</span>
        <h2 class="text-3xl font-extrabold text-ink mt-2">Perjalanan Brand</h2>
      </div>
      <div class="space-y-8">
        <div
          v-for="(item, i) in timeline"
          :key="item.year"
          class="flex gap-6 animate-fade-in-up"
          :style="`animation-delay: ${i * 80}ms`"
        >
          <div class="flex flex-col items-center">
            <div class="w-14 h-14 rounded-full bg-primary-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
              {{ item.year }}
            </div>
            <div v-if="i < timeline.length - 1" class="w-0.5 flex-1 bg-stone-200 mt-2"></div>
          </div>
          <div class="pb-8">
            <h3 class="font-bold text-lg text-ink mb-1">{{ item.title }}</h3>
            <p class="text-muted leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Restaurant Info -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Quality -->
        <div class="bg-white rounded-3xl p-8 border border-stone-100">
          <div class="w-14 h-14 rounded-2xl bg-accent-100 flex items-center justify-center text-2xl mb-4">🏆</div>
          <h3 class="text-xl font-bold text-ink mb-3">Informasi Kualitas Makanan</h3>
          <ul class="space-y-2 text-sm text-muted">
            <li class="flex items-start gap-2"><span class="text-success-600 mt-0.5">✓</span> Bahan baku segar dari mitra terpercaya</li>
            <li class="flex items-start gap-2"><span class="text-success-600 mt-0.5">✓</span> Dibuat saat dipesan, bukan dipanaskan ulang</li>
            <li class="flex items-start gap-2"><span class="text-success-600 mt-0.5">✓</span> Standar kebersihan dan food safety tinggi</li>
            <li class="flex items-start gap-2"><span class="text-success-600 mt-0.5">✓</span> Tanpa pengawet berbahaya</li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="bg-white rounded-3xl p-8 border border-stone-100">
          <div class="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center text-2xl mb-4">📍</div>
          <h3 class="text-xl font-bold text-ink mb-3">Hubungi & Kunjungi Kami</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3 text-muted">
              <span class="text-lg">📍</span>
              <div>
                <p class="font-semibold text-ink">Alamat</p>
                <p>Jl. Merdeka No. 88, Jakarta Pusat 10110</p>
              </div>
            </div>
            <div class="flex items-start gap-3 text-muted">
              <span class="text-lg">📞</span>
              <div>
                <p class="font-semibold text-ink">Telepon</p>
                <p>(021) 555-0199</p>
              </div>
            </div>
            <div class="flex items-start gap-3 text-muted">
              <span class="text-lg">🕐</span>
              <div>
                <p class="font-semibold text-ink">Jam Operasional</p>
                <p>Setiap hari, 10:00 — 22:00 WIB</p>
              </div>
            </div>
            <div class="flex items-start gap-3 text-muted">
              <span class="text-lg">✉️</span>
              <div>
                <p class="font-semibold text-ink">Email</p>
                <p>hello@flamecrave.id</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-ink mb-4 text-balance">Sudah Lapar?</h2>
        <p class="text-muted mb-8 max-w-md mx-auto">Pesan sekarang dan rasakan kelezatan Flame & Crave.</p>
        <RouterLink to="/menu" class="inline-flex px-10 py-4 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 hover:scale-105 transition-all shadow-2xl shadow-primary-500/40">
          Mulai Pesanan
        </RouterLink>
      </div>
    </section>
  </div>
</template>
