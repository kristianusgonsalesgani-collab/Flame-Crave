<script setup lang="ts">
const props = defineProps<{ modelValue: number; min?: number }>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const minVal = props.min ?? 1

function decrease() {
  if (props.modelValue > minVal) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
function increase() {
  emit('update:modelValue', props.modelValue + 1)
}
</script>

<template>
  <div class="flex items-center gap-3 bg-white rounded-full border border-stone-200 p-1.5 shadow-sm">
    <button
      class="w-9 h-9 rounded-full bg-stone-100 hover:bg-primary-50 hover:text-primary-600 text-ink flex items-center justify-center transition-all"
      :disabled="modelValue <= minVal"
      :class="modelValue <= minVal ? 'opacity-40 cursor-not-allowed' : ''"
      @click="decrease"
      aria-label="Kurangi jumlah"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
      </svg>
    </button>
    <span class="w-10 text-center font-bold text-ink text-lg">{{ modelValue }}</span>
    <button
      class="w-9 h-9 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all hover:scale-105"
      @click="increase"
      aria-label="Tambah jumlah"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
