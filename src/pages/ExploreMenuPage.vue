<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import type { CategoryId } from '../types'
import ProductCard from '../components/common/ProductCard.vue'
import SearchBar from '../components/common/SearchBar.vue'
import CategoryNav from '../components/common/CategoryNav.vue'
import EmptyState from '../components/common/EmptyState.vue'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  const cat = route.query.cat as string
  if (cat) {
    productStore.setCategory(cat as CategoryId)
  }
})

function clearFilters() {
  productStore.resetFilters()
  router.replace({ query: {} })
}
</script>

<template>
  <div class="pt-16 lg:pt-20 min-h-screen">
    <!-- Heading -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <span class="text-xs font-bold text-primary-500 uppercase tracking-widest">Katalog Menu</span>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-ink mt-2 mb-2">Explore Menu</h1>
        <p class="text-muted mb-6 max-w-lg">Temukan semua makanan favoritmu di satu tempat. Cari, filter, dan pesan dengan mudah.</p>
        <SearchBar />
      </div>
    </section>

    <!-- Category + Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <CategoryNav />
      </div>

      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-muted">
          <span class="font-bold text-ink">{{ productStore.filteredProducts.length }}</span> menu ditemukan
        </p>
        <button
          v-if="productStore.searchQuery || productStore.activeCategory !== 'all'"
          class="text-sm font-semibold text-primary-600 hover:text-primary-700"
          @click="clearFilters"
        >
          Reset Filter
        </button>
      </div>

      <!-- Grid -->
      <div v-if="productStore.filteredProducts.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        <ProductCard
          v-for="(product, i) in productStore.filteredProducts"
          :key="product.id"
          :product="product"
          :index="i"
        />
      </div>

      <!-- Empty -->
      <EmptyState
        v-else
        message="Menu tidak ditemukan"
        submessage="Coba ubah kata kunci atau pilih kategori lain."
      />
    </section>
  </div>
</template>
