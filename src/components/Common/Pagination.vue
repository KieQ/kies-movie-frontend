<template>
  <div class="w-full flex flex-col items-center mt-3">
    <ul class="flex items-center space-x-1">
      <li>
        <button @click="click_previous" class="block px-1 py-1 ml-0 leading-tight text-gray-500 bg-white border bg-purple-50 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-300" :disabled="page===0">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        </button>
      </li>
      <li v-for="(item, idx) of divide_page" :key="idx">
        <div class="px-2 py-1 leading-tight text-gray-500 bg-white/0" v-if="item.type==='abbr'">...</div>
        <button @click="click(item.page)" class="min-w-[30px] inline-block py-1 leading-tight text-gray-500 bg-white border-[1px] border-gray-300 rounded-lg bg-purple-50" :class="{'text-blue-500 border-blue-300 bg-blue-200':item.page===page, 'hover:bg-gray-100 hover:text-gray-700':item.page !== page}" v-if="item.type==='btn'">{{item.text}}</button>
      </li>
      <li>
        <button @click="click_next" class="block px-1 py-1 leading-tight text-gray-500 bg-white border bg-purple-50 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-300" :disabled="page===total_pages-1">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

  const page = ref(0);

  const props = defineProps({
    total:Number,
    size:Number,
    callback:Function,
  })

  function click_previous(){
    page.value--;
    props.callback(page.value);
  }

  function click_next(){
    page.value++;
    props.callback(page.value);
  }

  function click(idx){
    page.value = idx;
    props.callback(idx);
  }

  let total_pages = computed(()=>{
    return Math.ceil(props.total/props.size);
  })

  let divide_page = computed(()=>{
    let total_pages = Math.ceil(props.total/props.size);
    let result = [];
    function btn(index){
      return {page:index, text:index+1, type:'btn'};
    }
    let abbr = {type:'abbr'};
    if(total_pages<=7){
      for(let i=0; i<total_pages; i++){
        result.push(btn(i))
      }
    }else{
        if(page.value-4 < 0 ){
          for(let i=0; i<Math.max(page.value+3, 5); i++){
            result.push(btn(i))
          }
          result.push(abbr);
          result.push(btn(total_pages-1));
        }else if(page.value + 4 > total_pages){
          result.push(btn(0));
          result.push(abbr);
          for(let i=page.value-2; i<total_pages; i++){
            result.push(btn(i));
          }
        }else{
          result.push(btn(0))
          result.push(abbr);
          for(let i=page.value-2; i<page.value+3; i++){
            result.push(btn(i))
          }
          result.push(abbr);
          result.push(btn(total_pages-1));
        }
    }
    return result;
  })
</script>

<style scoped>

</style>