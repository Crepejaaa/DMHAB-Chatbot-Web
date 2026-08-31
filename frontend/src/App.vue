<!-- App.vue -->
<template>
  <div :class="{ 'grayscale-mode': isColorBlindMode }">
    <SkeletonLoader />
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'
import SkeletonLoader from './components/SkeletonLoader.vue'

// อ่านค่าที่เคยตั้งไว้จาก localStorage (ถ้ามี) เพื่อให้จำค่าไว้แม้ refresh หน้า
const isColorBlindMode = ref(localStorage.getItem('colorBlindMode') === 'true')

// เมื่อค่าเปลี่ยน ให้บันทึกลง localStorage ด้วย
watch(isColorBlindMode, (val) => {
  localStorage.setItem('colorBlindMode', val)
})

// ส่งค่านี้ไปให้ทุกหน้า/ทุกคอมโพเนนต์ลูกใช้งานผ่าน inject
provide('isColorBlindMode', isColorBlindMode)
</script>

<script>
export default {
  components: {
    SkeletonLoader
  }
}
</script>

<style>
/* Style ส่วนกลาง (Global Style) สามารถใส่ font หรือการตั้งค่าพื้นฐานตรงนี้ได้ */
html, body, #app {
  margin: 0;
  width: 100%;
  min-height: 100%;
  background: #e9ece5;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.grayscale-mode {
  filter: grayscale(100%);
}
</style>