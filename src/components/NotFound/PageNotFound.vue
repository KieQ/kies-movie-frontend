<template>
  <div class="grow flex items-center justify-center w-screen h-full bg-gradient-to-br from-purple-200 to-indigo-400">
    <div class="px-40 py-20 bg-white rounded-md shadow-xl">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-blue-600 text-9xl">404</h1>
        <h6 class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
          <span class="text-red-500">{{ translate("Oops!","我的天！") }}</span>
          {{translate("Page not found", "网页找不到了")}}
        </h6>
        <p class="mb-8 text-center text-gray-500 md:text-lg">
          {{translate("The page you’re looking for doesn’t exist.", "您访问的网页不存在")}}
        </p>
        <a href="/" class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">{{translate("Go Home", "回到主页")}}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {translate} from "@/utility/language";
</script>

<style scoped>

</style>