<template>
  <div class="top-0 left-0 fixed w-full h-screen flex flex-row justify-center items-center bg-gray-700/30 z-50 select-none" v-if="play_show">
  </div>
  <TransitionGroup name="bounce">
      <div class="fixed top-0 left-0 w-full h-screen flex flex-row justify-center items-center z-50 select-none" v-if="play_show">
        <div class=" p-5 border-none w-11/12 md:w-96 shadow-lg rounded-md bg-gradient-to-br from-purple-200 to-indigo-400">
          <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{translate("Select the files you would like to play", "选择你想播放的文件")}}</h3>
            <div class="mt-2" v-if="play_files.length > 0">
                <ul class="bg-yellow-100/40 max-h-36 overflow-y-auto rounded-lg">
                  <li class="m-1" v-for="(item, idx) of play_files" :key="idx">
                    <input type="radio" @change="list_change" name="play_file" :id="`id_${item.display_path}`" :value="item.path" class="hidden peer play_file" required="">
                    <label :for="`id_${item.display_path}`" class="inline-flex justify-between items-center px-5 py-1 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 peer-checked:border-purple-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                      <div class="block overflow-auto no-scrollbar">
                        {{item.display_path}}
                      </div>
                    </label>
                  </li>
                </ul>
            </div>
            <div class="mt-6" v-else>
              <p class="bg-yellow-100/40 rounded-lg">
                {{translate("No video to play now, please download first.", "没有视频可以播放，请先下载。")}}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center px-4 py-3 space-x-4">
              <button class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 grow bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200 disabled:shadow-none"
                      :disabled="!has_selected"
                      @click="click_play">
                {{translate("Play", "播放")}}
              </button>
              <button class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 grow bg-red-500 hover:bg-red-600 focus:ring-red-300"
                      @click="click_close">
                {{translate("Close", "关闭")}}
              </button>
            </div>
          </div>
        </div>
      </div>
  </TransitionGroup>
</template>

<script setup>
import {translate} from "@/utility/language";
import {download_show, play_files, play_show} from "@/utility/movie_dialog";
import {ref, watch} from "vue";

function click_close(){
  play_show.value=false;
}

function click_play(){
  let elements = document.getElementsByClassName("play_file");
  let path;
  for(let e of elements){
    if(e.checked){
      path = e.value;
      break;
    }
  }
  if(!path){
    return
  }

  let video_on_other_site = false;
  for(let item of play_files.value){
    if(item.path === path){
      video_on_other_site = item.video_on_other_site;
      break;
    }
  }
  if(video_on_other_site){
    window.open(path, "_blank");
  }else{
    window.open(`/media/${path}`, "_blank");
  }

}

watch(play_show, async (new_value, old_value)=>{
  if(new_value){
    has_selected.value=false;
  }
})

const has_selected = ref(false);
function list_change(){
  let elements = document.getElementsByClassName("play_file");
  for(let e of elements){
    if(e.checked){
      has_selected.value=true;
      return;
    }
  }
  has_selected.value= false;
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

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>