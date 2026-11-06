<script setup lang="ts">
import type { VariantGroup } from '../../types'

defineProps<{
  group: VariantGroup
  selected: string[]
}>()

const emit = defineEmits<{ select: [optionId: string] }>()
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-3">
      <h4 class="font-bold text-ink text-sm">{{ group.label }}</h4>
      <span v-if="group.required" class="text-xs font-semibold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">Wajib</span>
      <span v-else class="text-xs text-muted">Opsional</span>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="opt in group.options"
        :key="opt.id"
        class="flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border-2 text-sm font-semibold transition-all"
        :class="selected.includes(opt.id)
          ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
          : 'border-stone-200 bg-white text-ink/70 hover:border-primary-300'"
        @click="emit('select', opt.id)"
      >
        <span>{{ opt.name }}</span>
        <span v-if="opt.priceDelta > 0" class="text-xs font-bold" :class="selected.includes(opt.id) ? 'text-primary-600' : 'text-stone-400'">
          +{{ opt.priceDelta.toLocaleString('id-ID') }}
        </span>
        <span v-else-if="opt.priceDelta < 0" class="text-xs font-bold" :class="selected.includes(opt.id) ? 'text-success-600' : 'text-stone-400'">
          {{ opt.priceDelta.toLocaleString('id-ID') }}
        </span>
      </button>
    </div>
  </div>
</template>
