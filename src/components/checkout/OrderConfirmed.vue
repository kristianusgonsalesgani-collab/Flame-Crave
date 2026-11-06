<script setup lang="ts">
import type { OrderResult } from '../../stores/orderStore'
import { formatPrice } from '../../utils/format'

defineProps<{ order: OrderResult }>()
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-16 text-center">
    <div class="w-24 h-24 rounded-full bg-success-500/10 flex items-center justify-center mx-auto mb-6 animate-scale-in">
      <svg class="w-12 h-12 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h1 class="text-3xl font-extrabold text-ink mb-2">Pesanan Berhasil!</h1>
    <p class="text-muted mb-2">Terima kasih atas pesanan Anda. Pesanan Anda telah kami terima dan sedang diproses.</p>
    <p class="text-sm font-semibold text-primary-600 mb-8">No. Pesanan: {{ order.id }}</p>

    <div class="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 text-left mb-8">
      <h3 class="font-bold text-ink mb-4">Detail Pesanan</h3>
      <div class="space-y-3 mb-4">
        <div v-for="item in order.items" :key="item.uid" class="flex gap-3 items-center">
          <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-xl object-cover" loading="lazy" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-ink truncate">{{ item.name }}</p>
            <p v-if="item.variantSummary" class="text-xs text-muted truncate">{{ item.variantSummary }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-muted">{{ item.quantity }}x</p>
            <p class="font-bold text-sm text-ink">{{ formatPrice(item.unitPrice * item.quantity) }}</p>
          </div>
        </div>
      </div>
      <div class="border-t border-stone-100 pt-3 space-y-1.5">
        <div class="flex justify-between text-sm">
          <span class="text-muted">Subtotal</span>
          <span class="font-semibold">{{ formatPrice(order.subtotal) }}</span>
        </div>
        <div v-if="order.discount > 0" class="flex justify-between text-sm">
          <span class="text-success-600">Diskon</span>
          <span class="font-semibold text-success-600">-{{ formatPrice(order.discount) }}</span>
        </div>
        <div class="flex justify-between font-bold text-base pt-1.5 border-t border-stone-100">
          <span>Total</span>
          <span class="text-primary-600">{{ formatPrice(order.finalTotal) }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <RouterLink
        to="/menu"
        class="px-8 py-3.5 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30"
      >
        Pesan Lagi
      </RouterLink>
      <RouterLink
        to="/"
        class="px-8 py-3.5 rounded-full bg-stone-100 text-ink font-bold text-sm hover:bg-stone-200 transition-all"
      >
        Kembali ke Home
      </RouterLink>
    </div>
  </div>
</template>
