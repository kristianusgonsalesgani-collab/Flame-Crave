import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CategoryId, Product } from '../types'
import { products as catalog } from '../data/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>(catalog)
  const searchQuery = ref('')
  const activeCategory = ref<CategoryId>('all')

  const filteredProducts = computed(() => {
    let list = products.value
    if (activeCategory.value !== 'all') {
      list = list.filter((p) => p.category === activeCategory.value)
    }
    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    return list
  })

  const popularProducts = computed(() =>
    products.value.filter((p) => p.popular && p.available).slice(0, 6),
  )

  const bestSellers = computed(() =>
    products.value.filter((p) => p.bestSeller && p.available),
  )

  const promoProducts = computed(() =>
    products.value.filter((p) => p.promo && p.available),
  )

  function getProductById(id: string): Product | undefined {
    return products.value.find((p) => p.id === id)
  }

  function setCategory(cat: CategoryId) {
    activeCategory.value = cat
  }

  function setSearch(query: string) {
    searchQuery.value = query
  }

  function resetFilters() {
    activeCategory.value = 'all'
    searchQuery.value = ''
  }

  return {
    products,
    searchQuery,
    activeCategory,
    filteredProducts,
    popularProducts,
    bestSellers,
    promoProducts,
    getProductById,
    setCategory,
    setSearch,
    resetFilters,
  }
})
