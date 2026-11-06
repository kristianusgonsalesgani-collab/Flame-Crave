<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProductStore } from '../../stores/productStore'

const productStore = useProductStore()
const localQuery = ref(productStore.searchQuery)

let timer: ReturnType<typeof setTimeout>
watch(localQuery, (val) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    productStore.setSearch(val)
  }, 200)
})
</script>

<template>
  <div class="relative w-full">
    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
    <input
      v-model="localQuery"
      type="text"
      placeholder="Cari menu favoritmu..."
      class="w-full pl-12 pr-12 py-3.5 rounded-full bg-white border border-stone-200 text-sm text-ink placeholder-stone-400 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all shadow-sm"
    />
    <button
      v-if="localQuery"
      class="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink transition-colors"
      @click="localQuery = ''"
      aria-label="Hapus pencarian"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
