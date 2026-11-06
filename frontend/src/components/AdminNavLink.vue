<template>
  <!-- ลิงก์ Admin Dashboard บน navbar (แสดงเฉพาะแอดมิน) ใช้ร่วมกันทุกหน้า -->
  <router-link
    v-if="isAdmin"
    to="/admin"
    class="hover:text-[#D1FAE5] transition"
    active-class="text-white font-bold underline decoration-2 underline-offset-4"
  >
    {{ $t('nav.admin') }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const isAdmin = computed(
  () => authStore.user?.role === 'ADMIN' || localStorage.getItem('userRole') === 'ADMIN'
)
</script>

