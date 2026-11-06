<template>
  <!-- ปุ่มสลับภาษา TH | EN -->
  <div class="flex items-center bg-black/10 rounded-full border border-white/20 shadow-sm p-0.5 text-xs font-semibold">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="setLocale(lang.code)"
      :class="locale === lang.code ? 'bg-white text-[#045F54]' : 'text-white hover:bg-white/10'"
      class="px-2.5 py-1 rounded-full transition-colors duration-200"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()

const languages = [
  { code: 'th', label: 'TH' },
  { code: 'en', label: 'EN' },
]
</script>

