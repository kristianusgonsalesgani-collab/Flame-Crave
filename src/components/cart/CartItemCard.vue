<script setup lang="ts">
import type { CartItem } from '../../types'
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/format'

defineProps<{ item: CartItem }>()
const cartStore = useCartStore()
</script>

<template>
  <div class="flex gap-3 bg-white rounded-2xl p-3 shadow-sm border border-stone-100 animate-fade-in">
    <img
      :src="item.image"
      :alt="item.name"
      class="w-20 h-20 rounded-xl object-cover flex-shrink-0"
      loading="lazy"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <h4 class="font-bold text-sm text-ink truncate">{{ item.name }}</h4>
          <p v-if="item.variantSummary" class="text-xs text-muted mt-0.5 truncate">{{ item.variantSummary }}</p>
          <p v-if="item.notes" class="text-xs text-stone-500 italic truncate">"{{ item.notes }}"</p>
          <p class="font-bold text-sm text-primary-600 mt-1">{{ formatPrice(item.unitPrice) }}</p>
        </div>
        <button
          class="text-stone-400 hover:text-error-500 transition-colors flex-shrink-0"
          @click="cartStore.removeItem(item.uid)"
          aria-label="Hapus item"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center gap-1 bg-stone-100 rounded-full p-1">
          <button
            class="w-7 h-7 rounded-full bg-white text-ink hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-all"
            @click="cartStore.decreaseQty(item.uid)"
            aria-label="Kurangi"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span class="w-8 text-center text-sm font-bold text-ink">{{ item.quantity }}</span>
          <button
            class="w-7 h-7 rounded-full bg-white text-ink hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center transition-all"
            @click="cartStore.increaseQty(item.uid)"
            aria-label="Tambah"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <span class="font-bold text-sm text-ink">{{ formatPrice(item.unitPrice * item.quantity) }}</span>
      </div>
    </div>
  </div>
</template>
