<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import { useProductDetail } from '../composables/useProductDetail'
import { formatPrice } from '../utils/format'
import VariantSelector from '../components/product/VariantSelector.vue'
import QuantitySelector from '../components/product/QuantitySelector.vue'
import ProductCard from '../components/common/ProductCard.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = computed(() => productStore.getProductById(route.params.id as string))
const { selectedVariants, quantity, notes, selectSingle, toggleMulti, computedPrice, totalItemPrice, isValid } =
  useProductDetail(() => product.value)

const showToast = ref(false)

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter((p) => p.category === product.value!.category && p.id !== product.value!.id && p.available)
    .slice(0, 4)
})

function handleAddToCart() {
  if (!product.value || !isValid.value) return
  cartStore.addToCart({
    productId: product.value.id,
    quantity: quantity.value,
    selectedVariants: selectedVariants.value,
    notes: notes.value,
  })
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2500)
}
</script>

<template>
  <div class="pt-16 lg:pt-20 min-h-screen">
    <!-- Not found -->
    <div v-if="!product" class="max-w-2xl mx-auto px-4 py-20 text-center">
      <div class="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
        <span class="text-5xl">🤷</span>
      </div>
      <h1 class="text-2xl font-extrabold text-ink mb-2">Menu Tidak Ditemukan</h1>
      <p class="text-muted mb-8">Menu yang kamu cari mungkin tidak tersedia atau telah dihapus.</p>
      <RouterLink to="/menu" class="px-8 py-3.5 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors">
        Kembali ke Menu
      </RouterLink>
    </div>

    <div v-else>
      <!-- Breadcrumb -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center gap-2 text-sm text-muted">
          <RouterLink to="/" class="hover:text-primary-600">Home</RouterLink>
          <span>/</span>
          <RouterLink to="/menu" class="hover:text-primary-600">Menu</RouterLink>
          <span>/</span>
          <span class="text-ink font-semibold truncate">{{ product.name }}</span>
        </nav>
      </div>

      <!-- Detail -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Image -->
          <div class="relative animate-fade-in">
            <div class="relative rounded-3xl overflow-hidden bg-stone-100 aspect-square">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span v-if="product.badge" class="px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-md"
                  :class="product.promo ? 'bg-secondary-500' : 'bg-primary-600'">
                  {{ product.badge }}
                </span>
                <span v-if="!product.available" class="px-3 py-1.5 rounded-full text-sm font-bold text-white bg-stone-500 shadow-md">
                  Stok Habis
                </span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="animate-fade-in-up">
            <p class="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">{{ product.categoryLabel }}</p>
            <h1 class="text-3xl lg:text-4xl font-extrabold text-ink mb-3">{{ product.name }}</h1>
            <p class="text-muted leading-relaxed mb-6">{{ product.description }}</p>

            <!-- Price -->
            <div class="flex items-end gap-3 mb-8">
              <span class="text-3xl font-extrabold text-ink">{{ formatPrice(computedPrice) }}</span>
              <span v-if="product.discount" class="text-lg text-stone-400 line-through mb-1">{{ formatPrice(product.basePrice) }}</span>
            </div>

            <!-- Variants -->
            <div v-if="product.available" class="space-y-6 mb-6">
              <VariantSelector
                v-for="group in product.variants"
                :key="group.id"
                :group="group"
                :selected="selectedVariants[group.id] || []"
                @select="(optId) => group.type === 'single' ? selectSingle(group.id, optId) : toggleMulti(group.id, optId)"
              />

              <!-- Notes -->
              <div>
                <h4 class="font-bold text-ink text-sm mb-2">Catatan Tambahan</h4>
                <textarea
                  v-model="notes"
                  rows="2"
                  placeholder="Contoh: tanpa bawang, pedasnya banyak..."
                  class="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm text-ink placeholder-stone-400 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all resize-none"
                />
              </div>

              <!-- Quantity + Add to cart -->
              <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <QuantitySelector v-model="quantity" />
                <button
                  :disabled="!isValid"
                  class="flex-1 w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
                  :class="isValid
                    ? 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-[1.02]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'"
                  @click="handleAddToCart"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Tambah ke Keranjang · {{ formatPrice(totalItemPrice) }}
                </button>
              </div>
            </div>

            <!-- Unavailable -->
            <div v-else class="px-6 py-4 rounded-2xl bg-stone-100 text-center">
              <p class="font-bold text-stone-500">Menu ini sedang tidak tersedia</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Related -->
      <section v-if="relatedProducts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-extrabold text-ink mb-6">Menu Sejenis</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          <ProductCard
            v-for="(p, i) in relatedProducts"
            :key="p.id"
            :product="p"
            :index="i"
          />
        </div>
      </section>
    </div>

    <!-- Toast -->
    <Teleport to="body">
      <transition name="toast">
        <div
          v-if="showToast"
          class="fixed top-20 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold shadow-xl flex items-center gap-2 animate-toast-in"
        >
          <span class="text-lg">✅</span>
          Ditambahkan ke keranjang!
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-leave-to { opacity: 0; transform: translate(-50%, -10px); }
</style>
