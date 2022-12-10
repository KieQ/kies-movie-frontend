<template>
  <div class="h-full flex flex-row justify-center space-x-0 relative">
    <TransitionGroup :name="move_left?'slide_left':'slide_right'">
      <template v-for="(item, idx) of content" :key="idx">
        <div class="absolute top-0 h-full overflow-hidden flex flex-col justify-end not-select" v-if="idx===active_idx">
          <img class="object-cover -z-10 absolute w-full h-full" :src="item.background_image" alt="">
          <div class="flex flex-col px-32 py-24">
            <h1 class="text-white text-lg md:text-2xl">{{item.title}}</h1>
            <p class="text-white text-sm md:text-lg">{{wrap_if_too_long(item.content, 400)}}</p>
          </div>
        </div>
      </template>
    </TransitionGroup>
  </div>
  <!-- Button-->
  <div class="absolute h-full w-12 left-8 flex flex-col justify-center z-0">
    <button class="text-white/50 hover:text-white/70" @click="click_left">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-circle w-full" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>
    </button>
  </div>
  <div class="absolute h-full w-12 right-8 flex flex-col justify-center">
    <button class="text-white/50 hover:text-white/70" @click="click_right">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle w-full" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg>
    </button>
  </div>

  <!--Bottom Button-->
  <div class="absolute w-full bottom-16 bg-white/0 flex flex-row justify-center items-center space-x-1">
    <template v-for="idx in content.length">
      <button class="w-10 h-10 cursor-pointer" @click="change_active_index(idx)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record" viewBox="0 0 16 16" v-if="active_idx===idx-1">
          <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16" v-if="active_idx!==idx-1">
          <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {english} from "@/utility/language";
import {wrap_if_too_long} from "@/utility/utility";

  const content = reactive([{"poster_image":"https://image.tmdb.org/t/p/original/34mHYXohSsyxu7QLJTG0IYW7zMr.jpg","background_image":"https://image.tmdb.org/t/p/original/4rpGuAgfIBVSytvPoYYJfFjaxpF.jpg","title":"小门神","content":"故事发生在当代的人间江南小镇和神界。 门神神荼和郁垒是两兄弟。因为近年人间不再关注神仙，神界经济萧条，门神、土地爷、八仙等等小神们面临下岗失业的危险。门神郁垒决定去人间，做一番惊天动地的事情，证明门神的价值。郁垒和神荼先后来到人间，遇到了小镇上的单亲母女小英和雨儿，之后发生了一系列意想不到的有趣惊险故事……","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/guvDsSrSYtOHu4EWbUK55NaMZqH.jpg","background_image":"https://image.tmdb.org/t/p/original/ptgoTztfxbz0qFo129FwyisORRs.jpg","title":"捉妖记","content":"　　山雄伟，海辽阔，经奇幻。自古以来人妖共存于世，人欲主天下，妖遂被驱逐入山。其后历朝，妖偶有越界，皆由捉妖天师秘密处理。老妖王辞世，妖界大乱，众妖越界流窜，一时间世间人妖难辨。在偏安深山的永宁村中，村长宋天荫（井柏然 饰）偶遇一路逐妖而来的菜鸟天师霍小岚（白百何 饰），在意外共度一夜后，被妖后托胎，随即生下了小妖王胡巴。为了自己的私心，小岚带着天荫一路同行前往顺天府，保护他躲过各种妖怪，也渐渐与天荫及胡巴产生了感情。然而为时已晚，胡巴已落入坏人之手，为营救胡巴，小岚与天荫在众人的帮助下勇闯登仙楼，与大反派葛千户（钟汉良 饰）展开一场殊死对决……人妖相克，究竟谁主天下？","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/77QFDqbgiLVkdp9lDDlsp6Lmuen.jpg","background_image":"https://image.tmdb.org/t/p/original/qwBpO7Lal9tjElcazD922wzQDNE.jpg","title":"脱口秀大会","content":"　　《脱口秀大会》是由企鹅影视、上海笑果文化传媒有限公司联合出品的脱口秀高手对战节目。","value":""}])

  const active_idx = ref(0)
  const move_left = ref(true);

  let timeout;
  function click_right() {
    clearTimeout(timeout);
    move_left.value = true;
    active_idx.value++;
    if(active_idx.value >= content.length){
      active_idx.value -= content.length;
    }
    timeout = setTimeout(click_right, 5000);
  }

  function click_left() {
    clearTimeout(timeout);
    move_left.value = false;
    active_idx.value--;
    if(active_idx.value < 0){
      active_idx.value += content.length;
    }
    timeout = setTimeout(click_right, 5000);
  }

  function change_active_index(idx){
    clearTimeout(timeout);
    if(active_idx.value < idx-1){
      move_left.value = true;
    }else if(active_idx.value > idx-1){
      move_left.value= false;
    }
    active_idx.value = idx - 1;
    timeout = setTimeout(click_right, 5000);
  }

  onMounted(async ()=> {
    if (content.length === 0) {
      let lang = english.value ? "en" : "zh-cn"
      let result = await fetch(`https://kies.cf/api/homepage/content?lang=${lang}`);
      if (result.status === 200) {
        let j = await result.json();
        if (j.status_code === 0) {
          content.push(...j.data.carousel_items);
        }
      }
    }
    timeout = setTimeout(click_right, 5000);
  })



</script>

<style scoped>
.not-select {
  user-select: none;
}
.slide_left-enter-active {
  transition: all 0.8s ease-out;
}

.slide_left-leave-active {
  transition: all 0.8s ease-out;
}

.slide_left-enter-from{
  transform: translateX(100%);
}
.slide_left-leave-to {
  transform: translateX(-100%);
}

.slide_right-enter-active {
  transition: all 0.8s ease-out;
}

.slide_right-leave-active {
  transition: all 0.8s ease-out;
}

.slide_right-enter-from{
  transform: translateX(-100%);
}
.slide_right-leave-to {
  transform: translateX(100%);
}

</style>