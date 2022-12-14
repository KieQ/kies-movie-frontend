<script setup>
import Body from "@/views/Body.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <Body/>
    <Footer/>
  </div>
</template>

<style scoped>
* { -webkit-tap-highlight-color: rgba(0,0,0,0); }
</style>
