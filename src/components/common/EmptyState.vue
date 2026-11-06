<script setup lang="ts">
defineProps<{ message?: string; submessage?: string }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mb-4 animate-float">
      <span class="text-5xl">🔍</span>
    </div>
    <h3 class="font-bold text-lg text-ink mb-2">{{ message || 'Tidak ada menu ditemukan' }}</h3>
    <p class="text-sm text-muted">{{ submessage || 'Coba kata kunci atau kategori lain.' }}</p>
  </div>
</template>
