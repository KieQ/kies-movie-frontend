<template>
  <div class="grow flex flex-col items-start pt-12 bg-gradient-to-br from-purple-200 to-indigo-400">
    <div class="mx-auto w-full grow flex flex-col md:px-8">
      <div class="w-full grow mx-auto flex flex-col">
        <div class="relative w-max mx-auto h-12 grid items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition" :class="{'grid-cols-3':user_info.login}">
          <div id="indicator" class="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"></div>
          <button class="tab relative block h-10 px-6 md:px-16 rounded-full" :class="{'hover:bg-purple-500/30':active_btn_id!==0}" @click="tab_clicked(0)" v-show="user_info.login">
            <span class="text-gray-800">{{translate("Mine", "我的")}}</span>
          </button>
          <button class="tab relative block h-10 px-6 md:px-16 rounded-full" :class="{'hover:bg-purple-500/30':active_btn_id!==1}" @click="tab_clicked(1)" v-show="user_info.login">
            <span class="text-gray-800">{{translate("Add", "添加")}}</span>
          </button>
          <button class="tab relative block h-10 px-6 md:px-16 rounded-full" :class="{'hover:bg-purple-500/30':active_btn_id!==2}" @click="tab_clicked(2)">
            <span class="text-gray-800">{{translate("Public", "共享")}}</span>
          </button>
        </div>

        <div class="w-full grow flex flex-col relative">
          <Transition name="slide-up" mode="out-in">
            <MyList v-if="active_btn_id===0 && user_info.login"></MyList>
            <AddMovie v-else-if="active_btn_id===1 && user_info.login"></AddMovie>
            <PublicList v-else-if="active_btn_id===2"></PublicList>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {language, translate} from "@/utility/language";
import {nextTick, onMounted, ref, watch} from "vue";
import MyList from "@/components/Movie/MyList.vue";
import PublicList from "@/components/Movie/PublicList.vue";
import AddMovie from "@/components/Movie/AddMovie.vue";
import {user_info} from "@/utility/session";

const active_btn_id = ref(0);

onMounted(()=>{
  if(user_info.login){
    tab_clicked(0);
  }else{
    tab_clicked(2);
  }
})

function tab_clicked(index){
  //update active_btn_id
  active_btn_id.value = index;

  //update the indicator
  let indicator = document.getElementById("indicator");
  let tab = document.getElementsByClassName("tab")[index];
  indicator.style.width = tab.getBoundingClientRect().width + 'px'
  indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'
}

watch(language, (new_value, old_value)=>{
  nextTick(()=>{
    let indicator = document.getElementById("indicator");
    let tab = indicator.style.width = document.getElementsByClassName("tab")[active_btn_id.value];
    indicator.style.width = tab.getBoundingClientRect().width + 'px'
    indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'
  });
})

</script>

<style scoped>
.indicator{
  transition: left 0.4s ease;
}

* {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>