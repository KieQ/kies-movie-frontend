<template>
  <div v-if="dialog_operator.dialogs.size>0" class="fixed w-full h-screen flex flex-row justify-center items-center bg-gray-700/30 z-50 select-none">
  </div>
  <TransitionGroup name="bounce">
    <template v-for="[key, item] of dialog_operator.dialogs.entries()" :key="key">
      <div class="fixed w-full h-screen flex flex-row justify-center items-center z-50 select-none">
        <div class=" p-5 border w-11/12 md:w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full" :class="get_color(item.color, 0)">
              <svg class="h-6 w-6" :class="get_color(item.color, 1)" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="item.type==='ok'">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" :class="get_color(item.color, 1)" fill="currentColor" class="bi bi-info-circle h-6 w-6" viewBox="0 0 16 16" v-if="item.type==='info'">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="get_color(item.color, 1)" class="bi bi-dash-circle h-6 w-6" viewBox="0 0 16 16" v-if="item.type==='warn'">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" :class="get_color(item.color, 1)" class="bi bi-x-circle h-6 w-6" viewBox="0 0 16 16" v-if="item.type==='error'">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{item.title}}</h3>
            <div class="mt-2 px-7 py-3">
              <p class="text-sm text-gray-500">
                {{item.content}}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center px-4 py-3 space-x-4">
              <button id="ok-btn" class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2" v-for="(btn, idx) in item.button" :key="idx"
              :class="[get_color(btn.color, 2),get_color(btn.color, 3),get_color(btn.color, 4), {grow:btn.grow}] "
              @click="handle_click(btn.callback, ...btn.param)">
                {{btn.text}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TransitionGroup>
</template>

<script setup>
import {dialog_operator} from "@/utility/components_common";

function get_color(color, i){
  switch(color){
    case "blue":
      return ['bg-blue-100','text-blue-600', 'bg-blue-500', 'hover:bg-blue-600', 'focus:ring-blue-300'][i];
    case "red":
      return ['bg-red-100','text-red-600', 'bg-red-500', 'hover:bg-red-600', 'focus:ring-red-300'][i];
    case "pink":
      return ['bg-pink-100','text-pink-600', 'bg-pink-500', 'hover:bg-pink-600', 'focus:ring-pink-300'][i];
    case "green":
      return ['bg-green-100','text-green-600', 'bg-green-500', 'hover:bg-green-600', 'focus:ring-green-300'][i];
    case "yellow":
      return ['bg-yellow-100','text-yellow-600', 'bg-yellow-500', 'hover:bg-yellow-600', 'focus:ring-yellow-300'][i];
  }
}

function handle_click(callback, ...param){
  if(callback !== undefined){
    callback(...param);
  }
}

</script>

<style scoped>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>