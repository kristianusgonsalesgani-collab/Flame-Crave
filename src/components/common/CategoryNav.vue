<script setup lang="ts">
import { useProductStore } from '../../stores/productStore'
import { categories } from '../../data/categories'

const productStore = useProductStore()
</script>

<template>
  <div class="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
      :class="productStore.activeCategory === cat.id
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
        : 'bg-white text-ink/70 border border-stone-200 hover:border-primary-300 hover:text-primary-600'"
      @click="productStore.setCategory(cat.id)"
    >
      <span>{{ cat.icon }}</span>
      {{ cat.name }}
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
