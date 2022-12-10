<template>
  <div class="h-full flex flex-row justify-center space-x-0 relative">
    <TransitionGroup name="slide">
        <div class="absolute top-0 h-full overflow-hidden flex flex-col justify-end not-select" v-if="next">
          <img class="object-cover -z-10 absolute w-full h-full" src="https://image.tmdb.org/t/p/original/oAXW5slkqWZ5qVlK3gUoSC3i4Lp.jpg" alt="">
          <div class="flex flex-col px-32 py-24">
            <h1 class="text-white text-2xl">Title</h1>
            <p class="text-white text-lg">许半夏的母亲生许半夏的时候难产而死，父亲自许半夏出生起便不闻不问，反而养成了许半夏天生傲骨、敢闯敢拼的性格。随着中国经济的腾飞，许半夏带着兄弟小陈、童骁骑做起了废钢、运输生意，在男性占据绝对主导地位的钢铁行业中，许半夏硬是凭借敢想敢闯的冒险精神和务实的处事态度，勇闯俄罗斯，历经千辛万苦甚至生死考验，开辟了独立的国际钢铁进口业务，收获了事业的第一桶金。此时钢材市场竞争激烈，凭借着卓越的眼光和果敢的个性以及对市场的嗅觉，许半夏排除万难，逐渐将事业版图扩大。在一次次生活、感情、工作的历练后，许半夏懂得了如何果断解决问题，如何突破自己，收获了事业和爱情。</p>
          </div>
        </div>
        <div class="absolute top-0 h-full overflow-hidden flex flex-col justify-end not-select" v-if="!next">
          <img class="object-cover -z-10 absolute w-full h-full" src="https://image.tmdb.org/t/p/original/mMA2YNddowV8MZtxpbn0a7Yilum.jpg" alt="">
          <div class="flex flex-col px-32 py-24">
            <h1 class="text-white text-2xl">Title</h1>
            <p class="text-white text-lg">许半夏的母亲生许半夏的时候难产而死，父亲自许半夏出生起便不闻不问，反而养成了许半夏天生傲骨、敢闯敢拼的性格。随着中国经济的腾飞，许半夏带着兄弟小陈、童骁骑做起了废钢、运输生意，在男性占据绝对主导地位的钢铁行业中，许半夏硬是凭借敢想敢闯的冒险精神和务实的处事态度，勇闯俄罗斯，历经千辛万苦甚至生死考验，开辟了独立的国际钢铁进口业务，收获了事业的第一桶金。此时钢材市场竞争激烈，凭借着卓越的眼光和果敢的个性以及对市场的嗅觉，许半夏排除万难，逐渐将事业版图扩大。在一次次生活、感情、工作的历练后，许半夏懂得了如何果断解决问题，如何突破自己，收获了事业和爱情。</p>
          </div>
        </div>
    </TransitionGroup>
  </div>
  <!-- Button-->
  <div class="absolute h-full w-12 left-8 flex flex-col justify-center z-0">
    <button class="text-white/50 hover:text-white/70" @click="click">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-circle w-full" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
      </svg>
    </button>
  </div>
  <div class="absolute h-full w-12 right-8 flex flex-col justify-center">
    <button class="text-white/50 hover:text-white/70">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle w-full" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg>
    </button>
  </div>

  <!--Bottom Button-->
  <div class="absolute w-full bottom-16 bg-white/0 flex flex-row justify-center items-center space-x-1">
    <button class="w-10 h-10 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record" viewBox="0 0 16 16" v-if="true">
        <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16" v-if="false">
        <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
    </button>
    <button class="w-10 h-10 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record" viewBox="0 0 16 16" v-if="true">
        <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16" v-if="false">
        <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
    </button>
    <button class="w-10 h-10 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record" viewBox="0 0 16 16" v-if="true">
        <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16" v-if="false">
        <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {english} from "@/utility/language";
import {wrap_if_too_long} from "@/utility/utility";

  const content = reactive([{"poster_image":"https://image.tmdb.org/t/p/original/5TYgKxYhnhRNNwqnRAKHkgfqi2G.jpg","background_image":"https://image.tmdb.org/t/p/original/rFxWhQB3JmmwCU5kcQQFrnpzGtF.jpg","title":"Mulan","content":"To save her father from certain death in the army, a young woman secretly enlists in his place and becomes one of China's greatest heroines in the process.","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg","background_image":"https://image.tmdb.org/t/p/original/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg","title":"Toy Story","content":"Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/euhgvAtvBx4CElItl5qwEgWxpdh.jpg","background_image":"https://image.tmdb.org/t/p/original/g84UGBI440SAY3uta189P9rgQme.jpg","title":"Lie to Me","content":"The world's leading deception researcher, Dr. Cal Lightman, studies facial expression, body language and tone of voice to determine when a person is lying and why, which helps law enforcement and government agencies uncover the truth. But his skills also make it easier for him to deceive others.","value":""}])

  const next = ref(true)

  function click() {
    next.value = !next.value;
  }

  onMounted(async ()=>{
    if(content.length===0){
      let lang = english.value?"en":"zh-cn"
      let result = await fetch(`https://kies.cf/api/homepage/content?lang=${lang}`);
      if(result.status === 200){
        let j = await result.json();
        if(j.status_code === 0){
          content.push(...j.data.carousel_items);
        }
      }
    }
  })


</script>

<style scoped>
.not-select {
  user-select: none;
}
.slide-enter-active {
  transition: all 1s ease-out;
}

.slide-leave-active {
  transition: all 1s ease-out;
}

.slide-enter-from{
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

</style>