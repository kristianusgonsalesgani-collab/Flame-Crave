<script setup lang="ts">
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/format'

const cartStore = useCartStore()
</script>

<template>
  <div class="bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
    <h3 class="font-bold text-ink mb-4">Ringkasan Pesanan</h3>

    <div class="space-y-3 mb-4">
      <div
        v-for="item in cartStore.items"
        :key="item.uid"
        class="flex gap-3 items-center"
      >
        <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-xl object-cover" loading="lazy" />
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-sm text-ink truncate">{{ item.name }}</p>
          <p v-if="item.variantSummary" class="text-xs text-muted truncate">{{ item.variantSummary }}</p>
          <p class="text-xs text-muted">Qty: {{ item.quantity }}</p>
        </div>
        <span class="font-bold text-sm text-ink whitespace-nowrap">{{ formatPrice(item.unitPrice * item.quantity) }}</span>
      </div>
    </div>

    <div class="border-t border-stone-100 pt-4 space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-muted">Subtotal ({{ cartStore.totalItems }} item)</span>
        <span class="font-semibold text-ink">{{ formatPrice(cartStore.subtotal) }}</span>
      </div>
      <div v-if="cartStore.totalDiscount > 0" class="flex justify-between text-sm">
        <span class="text-success-600">Diskon</span>
        <span class="font-semibold text-success-600">-{{ formatPrice(cartStore.totalDiscount) }}</span>
      </div>
      <div class="flex justify-between text-base pt-2 border-t border-stone-100">
        <span class="font-bold text-ink">Total</span>
        <span class="font-bold text-primary-600">{{ formatPrice(cartStore.finalTotal) }}</span>
      </div>
    </div>
  </div>
</template>
