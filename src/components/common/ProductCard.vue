<script setup lang="ts">
import type { Product } from '../../types'
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/format'
import { useRouter } from 'vue-router'

defineProps<{ product: Product; index?: number }>()

const cartStore = useCartStore()
const router = useRouter()

function quickAdd(product: Product) {
  const defaults: Record<string, string[]> = {}
  for (const group of product.variants) {
    if (group.options.length) defaults[group.id] = [group.options[0].id]
  }
  cartStore.addToCart({
    productId: product.id,
    quantity: 1,
    selectedVariants: defaults,
    notes: '',
  })
}

function goDetail(id: string) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div
    class="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 cursor-pointer animate-fade-in-up flex flex-col"
    :style="index !== undefined ? `animation-delay: ${index * 50}ms` : ''"
    @click="goDetail(product.id)"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-stone-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <!-- Badge -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5">
        <span
          v-if="product.badge"
          class="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-md"
          :class="product.promo
            ? 'bg-secondary-500'
            : product.bestSeller
              ? 'bg-primary-600'
              : 'bg-ink/70'"
        >
          {{ product.badge }}
        </span>
        <span
          v-if="!product.available"
          class="px-2.5 py-1 rounded-full text-xs font-bold text-white bg-stone-500 shadow-md"
        >
          Habis
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-1">
      <p class="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">
        {{ product.categoryLabel }}
      </p>
      <h3 class="font-bold text-ink leading-tight mb-1 line-clamp-1">{{ product.name }}</h3>
      <p class="text-xs text-muted leading-relaxed line-clamp-2 mb-3 flex-1">{{ product.description }}</p>

      <div class="flex items-center justify-between gap-2 mt-auto">
        <div class="flex flex-col">
          <span v-if="product.discount" class="text-xs text-stone-400 line-through">{{ formatPrice(product.basePrice) }}</span>
          <span class="font-bold text-lg text-ink">{{ formatPrice(product.price) }}</span>
        </div>
        <button
          :disabled="!product.available"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0"
          :class="product.available
            ? 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110 shadow-lg shadow-primary-500/30'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'"
          @click.stop="quickAdd(product)"
          :aria-label="`Tambah ${product.name} ke keranjang`"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
