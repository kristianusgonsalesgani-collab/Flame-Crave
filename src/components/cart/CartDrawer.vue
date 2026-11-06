<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cartStore'
import { formatPrice } from '../../utils/format'
import CartItemCard from './CartItemCard.vue'

const cartStore = useCartStore()
const router = useRouter()

const canCheckout = computed(
  () => !cartStore.isEmpty && cartStore.items.every((i) => i.available),
)

function goCheckout() {
  cartStore.closeCart()
  router.push('/checkout')
}
</script>

<template>
  <Teleport to="body">
    <transition name="overlay">
      <div
        v-if="cartStore.isOpen"
        class="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
        @click="cartStore.closeCart()"
      />
    </transition>
    <transition name="drawer">
      <aside
        v-if="cartStore.isOpen"
      class="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-background shadow-2xl flex flex-col"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 bg-white border-b border-stone-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
            <span class="text-xl">🛒</span>
          </div>
          <div>
            <h2 class="font-bold text-ink">Keranjang</h2>
            <p class="text-xs text-muted">{{ cartStore.totalItems }} item</p>
          </div>
        </div>
        <button
          class="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          @click="cartStore.closeCart()"
          aria-label="Tutup keranjang"
        >
          <svg class="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Items -->
      <div v-if="cartStore.isEmpty" class="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div class="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mb-4 animate-float">
          <span class="text-5xl">🛒</span>
        </div>
        <h3 class="font-bold text-lg text-ink mb-2">Keranjang Kosong</h3>
        <p class="text-sm text-muted mb-6">Belum ada item di keranjangmu. Yuk pilih makanan favoritmu!</p>
        <RouterLink
          to="/menu"
          @click="cartStore.closeCart()"
          class="px-6 py-3 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
        >
          Jelajahi Menu
        </RouterLink>
      </div>

      <div v-else class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <CartItemCard
          v-for="item in cartStore.items"
          :key="item.uid"
          :item="item"
        />
      </div>

      <!-- Footer -->
      <div v-if="!cartStore.isEmpty" class="px-5 py-4 bg-white border-t border-stone-200 space-y-3">
        <div class="space-y-1.5">
          <div class="flex justify-between text-sm">
            <span class="text-muted">Subtotal</span>
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
        <button
          :disabled="!canCheckout"
          class="w-full py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary-500/30"
          :class="canCheckout
            ? 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-[1.02]'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'"
          @click="goCheckout"
        >
          {{ canCheckout ? 'Lanjut ke Checkout' : 'Beberapa item tidak tersedia' }}
        </button>
      </div>
    </aside>
    </transition>
  </Teleport>
</template>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.3s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s ease; }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
</style>
