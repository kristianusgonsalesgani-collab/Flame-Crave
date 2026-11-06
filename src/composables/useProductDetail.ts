import { computed, ref, watch, type ComputedRef } from 'vue'
import type { Product } from '../types'

export function useProductDetail(product: (() => Product | undefined) | ComputedRef<Product | undefined>) {
  const selectedVariants = ref<Record<string, string[]>>({})
  const quantity = ref(1)
  const notes = ref('')

  function initDefaults() {
    const p = product()
    if (!p) return
    const defaults: Record<string, string[]> = {}
    for (const group of p.variants) {
      if (group.required && group.type === 'single') {
        defaults[group.id] = [group.options[0].id]
      } else if (group.type === 'multi') {
        defaults[group.id] = []
      } else {
        defaults[group.id] = [group.options[0].id]
      }
    }
    selectedVariants.value = defaults
    quantity.value = 1
    notes.value = ''
  }

  watch(product, initDefaults, { immediate: true })

  function selectSingle(groupId: string, optionId: string) {
    selectedVariants.value = {
      ...selectedVariants.value,
      [groupId]: [optionId],
    }
  }

  function toggleMulti(groupId: string, optionId: string) {
    const current = selectedVariants.value[groupId] || []
    let next: string[]
    if (current.includes(optionId)) {
      next = current.filter((id) => id !== optionId)
    } else {
      next = [...current, optionId]
    }
    selectedVariants.value = { ...selectedVariants.value, [groupId]: next }
  }

  const computedPrice = computed(() => {
    const p = product()
    if (!p) return 0
    let price = p.price
    for (const group of p.variants) {
      const ids = selectedVariants.value[group.id]
      if (!ids) continue
      for (const opt of group.options) {
        if (ids.includes(opt.id)) {
          price += opt.priceDelta
        }
      }
    }
    return price
  })

  const totalItemPrice = computed(() => computedPrice.value * quantity.value)

  const isValid = computed(() => {
    const p = product()
    if (!p) return false
    return p.variants.every((g) => {
      if (!g.required) return true
      const ids = selectedVariants.value[g.id]
      return ids && ids.length > 0
    })
  })

  return {
    selectedVariants,
    quantity,
    notes,
    selectSingle,
    toggleMulti,
    computedPrice,
    totalItemPrice,
    isValid,
    initDefaults,
  }
}
