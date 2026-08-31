<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-50 bg-[#FAF9F5] animate-pulse"
    aria-live="polite"
    aria-busy="true"
  >
    <div class="max-w-6xl mx-auto px-6 py-8">
      <div class="h-16 rounded-2xl bg-[#E5E7EB] w-full mb-8"></div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div class="space-y-4">
          <div class="h-10 w-2/3 rounded-xl bg-[#E5E7EB]"></div>
          <div class="h-5 w-full rounded-lg bg-[#E5E7EB]"></div>
          <div class="h-5 w-5/6 rounded-lg bg-[#E5E7EB]"></div>
          <div class="h-12 w-36 rounded-full bg-[#D9EDE8]"></div>
        </div>
        <div class="h-64 rounded-[2rem] bg-[#E5E7EB]"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="space-y-4 rounded-[2rem] border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div class="h-40 rounded-[1.5rem] bg-[#E5E7EB]"></div>
          <div class="h-5 w-3/4 rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-full rounded bg-[#E5E7EB]"></div>
          <div class="h-4 w-2/3 rounded bg-[#E5E7EB]"></div>
          <div class="h-10 w-28 rounded-full bg-[#D9EDE8]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isLoading } from '../skeletonStore'
</script>
