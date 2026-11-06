<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(true)
let timer: ReturnType<typeof setTimeout>

onMounted(() => {
  timer = setTimeout(() => { visible.value = false }, 2500)
})
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <Teleport to="body">
    <transition name="toast">
      <div
        v-if="visible"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold shadow-xl flex items-center gap-2 animate-toast-in"
      >
        <span class="text-lg">✅</span>
        Ditambahkan ke keranjang!
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-leave-to { opacity: 0; transform: translate(-50%, -10px); }
</style>
