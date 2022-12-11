<template>
  <div class="h-full relative flex flex-col">
    <div class="h-full flex flex-row justify-center grow space-x-0 relative touch-pan-y">
      <TransitionGroup :name="move_left?'slide_left':'slide_right'">
        <template v-for="(item, idx) of content" :key="idx">
          <div class="absolute top-0 h-1/2 md:h-full overflow-hidden flex flex-col justify-end not-select" v-show="idx===active_idx">
            <img class="object-cover -z-10 absolute w-full h-full" :src="item.background_image" alt="">
            <div class="flex flex-col px-10 md:px-32 py-12 md:py-24">
              <h1 class="text-white text-lg md:text-2xl bg-gray-700/70">{{item.title}}</h1>
              <p class="text-white text-sm md:text-lg bg-gray-700/70">{{content_text(item.content)}}</p>
            </div>
          </div>
        </template>
      </TransitionGroup>
    </div>
    <!-- Button-->
    <div class="absolute h-1/2 md:h-full w-12 left-8 flex flex-col justify-center z-0 touch-pan-y">
      <button class="text-white/50 hover:text-white/70" @click="click_left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left-circle w-full" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      </button>
    </div>
    <div class="absolute h-1/2 md:h-full w-12 right-8 flex flex-col justify-center">
      <button class="text-white/50 hover:text-white/70" @click="click_right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle w-full" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
      </button>
    </div>

    <!--Bottom Button-->
    <div class="absolute w-full bottom-1/2 md:bottom-16 bg-white/0 flex flex-row justify-center items-center space-x-1 touch-pan-y">
      <template v-for="idx in content.length">
        <button class="w-10 h-10 cursor-pointer" @click="change_active_index(idx)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record text-white" viewBox="0 0 16 16" v-if="active_idx!==idx-1">
            <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill text-white" viewBox="0 0 16 16" v-if="active_idx===idx-1">
            <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
          </svg>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {english} from "@/utility/language";
import {wrap_if_too_long} from "@/utility/utility";

  const content = reactive([{"poster_image":"https://image.tmdb.org/t/p/original/AwgY4BXFaQTn5w88PqdSOJ0wAzi.jpg","background_image":"https://image.tmdb.org/t/p/original/pdSMyrjzzWtjo4sS8fxNyD7qqCq.jpg","title":"智取威虎山","content":"　　1947年冬，东北民主联军203小分队在首长少剑波（林更新 饰）的带领下，奉上级命令进入匪患猖獗的林海雪原保护百姓安全，侦查员杨子荣（张涵予 饰）与卫生员白茹（佟丽娅 饰）火线驰援。为彻底瓦解土匪势力，杨子荣执意请求乔装潜入匪窝“威虎山”。历经了重重考验的杨子荣因献宝有功，被匪首座山雕封为“威虎山老九”。杨子荣一面与八大金刚周旋，一面涉险为山下战友传出情报，而山寨中的一名神秘女子却屡屡将他陷于生死绝境。被203小分队生擒的土匪联络副官栾平趁乱逃脱，竟出现在威虎寨中与杨子荣当面对质……座山雕（梁家辉 饰 ）寿辰“百鸡宴”上，杨子荣与203小分队的战友们迎来了剿匪收网的最佳时机，一场鏖战在所难免……","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/aBYjxUSctgr05HIWqZu2Z7oq7an.jpg","background_image":"https://image.tmdb.org/t/p/original/8z9vDt4UhRhGAceYA0l2zN0ncyr.jpg","title":"精武门","content":"　　一代武术宗师、精武门创始人霍元甲突然逝世，霍师傅生前最喜爱的五徒弟陈真（李小龙 饰）匆匆赶回奔丧，在师傅的棺椁前，陈真悲痛欲绝，暂时终止了和小师妹（苗可秀 饰）完婚的计划，并且不相信师傅死于胃病和感冒的结论。日本虹口道场馆主铃木宽在霍师傅头七之日，派人送上写有“东亚病夫”的牌匾，并且出言大肆侮辱精武门，被激怒的陈真随后赶到虹口道场，大败众日本武人，并踢碎了租界公园门口“华人与狗不得入内”的招牌。虹口道场马上派人至精武馆报复，陈真为避免连累师门只得暂离精武门。机缘巧合，陈真发现了日本人害死师傅的证据，他怒不可遏，连弊数名凶手，成为日本人的眼中钉，为了保全精武门，陈真选择独立承担，他在租界外国势力的枪口前纵身跃起……","value":""},{"poster_image":"https://image.tmdb.org/t/p/original/pS0XgMIcdQvlS732bdRscmQQ7YK.jpg","background_image":"https://image.tmdb.org/t/p/original/mGDEKYzKQ4XBju9VcwxODcjYpeQ.jpg","title":"凹凸世界","content":"　　凹凸世界的创世神是一位很肆意随性的神明。他创造的世界生而不平等，只有参加凹凸大赛才有机会改变命运。参赛者将得到系统赐予的“特殊能力”，并锻炼运用各自的能力不断闯关战斗。只要能在凹凸大赛中获得最终的胜利，那么就能得到一切，并赐予你与“七神使”一样代神统治世界的权力。然而，这些都只是虚伪的表象……","value":""}])

  const active_idx = ref(0)
  const move_left = ref(true);

  function content_text(content){
    let length = window.innerWidth < 768?150:400;
    return wrap_if_too_long(content,length);
  }

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

  onUnmounted(()=>{
    clearTimeout(timeout);
  })

  watch(english, async (new_value, old_value)=>{
    let lang = new_value ? "en" : "zh-cn"
    let result = await fetch(`https://kies.cf/api/homepage/content?lang=${lang}`);
    if (result.status === 200) {
      let j = await result.json();
      if (j.status_code === 0) {
        content.length = 0;
        content.push(...j.data.carousel_items);
      }
    }
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