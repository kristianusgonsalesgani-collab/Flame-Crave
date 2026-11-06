<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { formatPrice } from '../utils/format'
import OrderSummaryPanel from '../components/checkout/OrderSummaryPanel.vue'
import OrderConfirmed from '../components/checkout/OrderConfirmed.vue'

const cartStore = useCartStore()
const orderStore = useOrderStore()

const customerName = ref('')
const customerPhone = ref('')
const orderNotes = ref('')
const errors = ref<{ name?: string; phone?: string }>({})

const orderResult = computed(() => orderStore.lastOrder)

function validate(): boolean {
  const e: typeof errors.value = {}
  if (!customerName.value.trim()) e.name = 'Nama wajib diisi'
  if (!customerPhone.value.trim()) e.phone = 'Nomor telepon wajib diisi'
  else if (!/^0\d{8,13}$/.test(customerPhone.value.trim().replace(/[\s-]/g, '')))
    e.phone = 'Nomor telepon tidak valid'
  errors.value = e
  return Object.keys(e).length === 0
}

function placeOrder() {
  if (cartStore.isEmpty) return
  if (!validate()) return

  orderStore.createOrder(
    cartStore.items,
    cartStore.subtotal,
    cartStore.totalDiscount,
    cartStore.finalTotal,
    customerName.value.trim(),
    customerPhone.value.trim(),
    orderNotes.value.trim(),
  )
  cartStore.clearCart()
}
/* eslint-disable */
</script>

<template>
  <div class="pt-16 lg:pt-20 min-h-screen">
    <!-- If order confirmed -->
    <OrderConfirmed v-if="orderResult" :order="orderResult" />

    <!-- Checkout form -->
    <div v-else>
      <!-- Empty cart guard -->
      <div v-if="cartStore.isEmpty" class="max-w-2xl mx-auto px-4 py-20 text-center">
        <div class="w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 animate-float">
          <span class="text-5xl">🛒</span>
        </div>
        <h1 class="text-2xl font-extrabold text-ink mb-2">Keranjang Kosong</h1>
        <p class="text-muted mb-8">Tambahkan menu dulu sebelum checkout.</p>
        <RouterLink to="/menu" class="px-8 py-3.5 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
          Jelajahi Menu
        </RouterLink>
      </div>

      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-muted mb-6">
          <RouterLink to="/menu" class="hover:text-primary-600">Menu</RouterLink>
          <span>/</span>
          <button class="hover:text-primary-600" @click="cartStore.openCart()">Keranjang</button>
          <span>/</span>
          <span class="text-ink font-semibold">Checkout</span>
        </nav>

        <h1 class="text-3xl font-extrabold text-ink mb-8">Checkout</h1>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Form -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Customer info -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
              <h3 class="font-bold text-ink mb-4">Informasi Pemesan</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-ink mb-1.5">Nama Lengkap <span class="text-primary-500">*</span></label>
                  <input
                    v-model="customerName"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    class="w-full px-4 py-3 rounded-2xl border text-sm text-ink placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all"
                    :class="errors.name ? 'border-error-500' : 'border-stone-200 focus:border-primary-400'"
                  />
                  <p v-if="errors.name" class="text-xs text-error-500 mt-1">{{ errors.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-ink mb-1.5">Nomor Telepon <span class="text-primary-500">*</span></label>
                  <input
                    v-model="customerPhone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    class="w-full px-4 py-3 rounded-2xl border text-sm text-ink placeholder-stone-400 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all"
                    :class="errors.phone ? 'border-error-500' : 'border-stone-200 focus:border-primary-400'"
                  />
                  <p v-if="errors.phone" class="text-xs text-error-500 mt-1">{{ errors.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Notes -->
            <div class="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
              <h3 class="font-bold text-ink mb-4">Catatan Pesanan</h3>
              <textarea
                v-model="orderNotes"
                rows="3"
                placeholder="Catatan tambahan untuk pesanan ini (opsional)"
                class="w-full px-4 py-3 rounded-2xl border border-stone-200 text-sm text-ink placeholder-stone-400 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all resize-none"
              />
            </div>

            <!-- Payment placeholder (MVP 2) -->
            <div class="bg-stone-50 rounded-3xl p-6 border border-dashed border-stone-300">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-lg">💳</div>
                <div>
                  <h3 class="font-bold text-ink text-sm">Metode Pembayaran</h3>
                  <p class="text-xs text-muted">Pembayaran digital (DANA, QRIS) akan tersedia di MVP 2.</p>
                </div>
              </div>
            </div>

            <!-- Service type placeholder (MVP 3) -->
            <div class="bg-stone-50 rounded-3xl p-6 border border-dashed border-stone-300">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-lg">🍽️</div>
                <div>
                  <h3 class="font-bold text-ink text-sm">Jenis Layanan</h3>
                  <p class="text-xs text-muted">Dine-in & Take Away akan tersedia di MVP 3.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-4">
              <OrderSummaryPanel />

              <button
                class="w-full py-4 rounded-full bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 hover:scale-[1.02] transition-all shadow-lg shadow-primary-500/30"
                @click="placeOrder"
              >
                Buat Pesanan · {{ formatPrice(cartStore.finalTotal) }}
              </button>
              <p class="text-xs text-center text-muted">
                Dengan melakukan pemesanan, kamu menyetujui syarat & ketentuan kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
