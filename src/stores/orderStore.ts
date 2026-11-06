import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CartItem } from '../types'

export interface OrderResult {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  finalTotal: number
  customerName: string
  customerPhone: string
  notes: string
  createdAt: string
  status: 'confirmed'
}

export const useOrderStore = defineStore('order', () => {
  const lastOrder = ref<OrderResult | null>(null)

  function createOrder(
    items: CartItem[],
    subtotal: number,
    discount: number,
    finalTotal: number,
    customerName: string,
    customerPhone: string,
    notes: string,
  ): OrderResult {
    const order: OrderResult = {
      id: 'ORD-' + Date.now().toString().slice(-8),
      items: JSON.parse(JSON.stringify(items)),
      subtotal,
      discount,
      finalTotal,
      customerName,
      customerPhone,
      notes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    }
    lastOrder.value = order
    return order
  }

  function clearLastOrder() {
    lastOrder.value = null
  }

  return { lastOrder, createOrder, clearLastOrder }
})
