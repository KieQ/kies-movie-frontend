<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Body from "@/components/Body.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
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
