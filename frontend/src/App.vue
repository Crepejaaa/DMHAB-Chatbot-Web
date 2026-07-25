<template>
  <!-- <router-view> จะทำหน้าที่ดึงคอมโพเนนต์ตาม URL (เช่น HomeView) มาแสดงผลตรงนี้ -->
  <router-view />
</template>

<script setup>
// หน้ารวมหลักจะปล่อยว่างไว้ เพื่อให้ Vue Router เป็นตัวจัดการดึงแต่ละหน้ามาแสดงผล
</script>

<style>
/* Style ส่วนกลาง (Global Style) สามารถใส่ font หรือการตั้งค่าพื้นฐานตรงนี้ได้ */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>