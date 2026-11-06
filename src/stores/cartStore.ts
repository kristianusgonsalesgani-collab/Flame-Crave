import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { CartItem, VariantGroup } from '../types'
import { generateUid } from '../utils/format'
import { useProductStore } from './productStore'

const STORAGE_KEY = 'ffo-cart'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export interface AddToCartPayload {
  productId: string
  quantity: number
  selectedVariants: Record<string, string[]>
  notes: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())
  const isOpen = ref(false)

  watch(
    items,
    (val) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
      } catch {
        /* ignore */
      }
    },
    { deep: true },
  )

  const productStore = useProductStore()

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
  )

  const totalDiscount = computed(() =>
    items.value.reduce((sum, i) => {
      const p = productStore.getProductById(i.productId)
      if (p?.discount) return sum + p.discount * i.quantity
      return sum
    }, 0),
  )

  const finalTotal = computed(() => subtotal.value - totalDiscount.value)

  const isEmpty = computed(() => items.value.length === 0)

  function buildVariantSummary(
    variants: VariantGroup[] | undefined,
    selected: Record<string, string[]>,
  ): string {
    if (!variants) return ''
    const parts: string[] = []
    for (const group of variants) {
      const ids = selected[group.id]
      if (!ids || ids.length === 0) continue
      const names = group.options
        .filter((o) => ids.includes(o.id))
        .map((o) => o.name)
      if (names.length) parts.push(names.join(', '))
    }
    return parts.join(' · ')
  }

  function calculateUnitPrice(
    productId: string,
    selected: Record<string, string[]>,
  ): number {
    const product = productStore.getProductById(productId)
    if (!product) return 0
    let price = product.price
    for (const group of product.variants) {
      const ids = selected[group.id]
      if (!ids) continue
      for (const opt of group.options) {
        if (ids.includes(opt.id)) {
          price += opt.priceDelta
        }
      }
    }
    return price
  }

  function addToCart(payload: AddToCartPayload) {
    const product = productStore.getProductById(payload.productId)
    if (!product || !product.available) return

    const summary = buildVariantSummary(product.variants, payload.selectedVariants)
    const unitPrice = calculateUnitPrice(payload.productId, payload.selectedVariants)

    const existing = items.value.find(
      (i) =>
        i.productId === payload.productId &&
        i.variantSummary === summary &&
        i.notes === payload.notes,
    )

    if (existing) {
      existing.quantity += payload.quantity
    } else {
      items.value.push({
        uid: generateUid(),
        productId: payload.productId,
        name: product.name,
        image: product.image,
        unitPrice,
        quantity: payload.quantity,
        selectedVariants: payload.selectedVariants,
        variantSummary: summary,
        notes: payload.notes,
        available: product.available,
      })
    }
    openCart()
  }

  function removeItem(uid: string) {
    items.value = items.value.filter((i) => i.uid !== uid)
  }

  function increaseQty(uid: string) {
    const item = items.value.find((i) => i.uid === uid)
    if (item) item.quantity += 1
  }

  function decreaseQty(uid: string) {
    const item = items.value.find((i) => i.uid === uid)
    if (item && item.quantity > 1) {
      item.quantity -= 1
    }
  }

  function setQty(uid: string, qty: number) {
    const item = items.value.find((i) => i.uid === uid)
    if (item) item.quantity = Math.max(1, qty)
  }

  function clearCart() {
    items.value = []
  }

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  return {
    items,
    isOpen,
    totalItems,
    subtotal,
    totalDiscount,
    finalTotal,
    isEmpty,
    addToCart,
    removeItem,
    increaseQty,
    decreaseQty,
    setQty,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }
})
