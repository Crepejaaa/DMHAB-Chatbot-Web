<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-start justify-center p-6 pointer-events-none">
    <div class="w-full max-w-6xl animate-pulse space-y-4">
      <div class="h-6 bg-white/20 rounded-full w-1/4"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="space-y-3">
          <div class="h-40 bg-white/10 rounded-2xl"></div>
          <div class="h-4 bg-white/10 rounded w-3/4"></div>
          <div class="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
        <div class="space-y-3">
          <div class="h-40 bg-white/10 rounded-2xl"></div>
          <div class="h-4 bg-white/10 rounded w-3/4"></div>
          <div class="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
        <div class="space-y-3">
          <div class="h-40 bg-white/10 rounded-2xl"></div>
          <div class="h-4 bg-white/10 rounded w-3/4"></div>
          <div class="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
      <div class="h-6 bg-white/20 rounded-full w-1/6 mt-6"></div>
    </div>
  </div>
</template>

<script setup>
import { isLoading } from '../skeletonStore'
</script>

<style scoped>
/* semi-transparent dark backdrop to mimic loading */
div[role="backdrop"] {
  background: rgba(0,0,0,0.45);
}
</style>
