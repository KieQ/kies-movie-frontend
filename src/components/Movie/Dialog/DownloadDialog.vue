<template>
  <div class="top-0 left-0 fixed w-full h-screen flex flex-row justify-center items-center bg-gray-700/30 z-50 select-none" v-if="download_show">
  </div>
  <TransitionGroup name="bounce">
    <div class="fixed top-0 left-0 w-full h-screen flex flex-row justify-center items-center z-50 select-none" v-if="download_show">
      <div class=" p-5 border-none w-11/12 md:w-96 shadow-lg rounded-md bg-gradient-to-br from-purple-200 to-indigo-400">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">{{translate("Select the files you would like to download", "选择你想下载的文件")}}</h3>
          <div class="mt-6 w-5/6 mx-auto" v-if="state==='progress'">
            <div class="rounded-lg flex flex-row items-center space-x-4 justify-center px-4 py-2 bg-amber-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-gear-wide-connected text-white animate-spin w-6 h-6" viewBox="0 0 16 16">
                <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
              </svg>
              <p class="text-white">
                {{translate("Fetching...","获取中...")}}
              </p>
            </div>
          </div>
          <div class="mt-6 bg-yellow-100/40 rounded-lg text-sm" v-else-if="state==='timeout'">
            <p class="">
              {{translate("Fetch downloadable files timeout, the service is trying so hard to grab the available resource, please wait for a while. You can close the dialog, and it won't stop the grabbing.",
                          "获取可下载文件超时，系统正在用尽全力获取资源，请等待一会儿。你可以关闭对话窗口，资源获取会在后台继续进行。")}}
            </p>
          </div>
          <div class="mt-2" v-else-if="state==='can_download' && download_files&&download_files.length > 0">
            <ul class="bg-yellow-100/40 max-h-36 overflow-y-auto rounded-lg">
              <li class="m-1" v-for="(item, idx) of download_files" :key="idx">
                <input type="checkbox" @change="list_change" :id="`id_${item.display_path}`" :value="item.path" class="hidden peer download_file" required="">
                <label :for="`id_${item.display_path}`" class="inline-flex justify-between items-center px-5 py-1 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 peer-checked:border-purple-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50">
                  <div class="block overflow-auto no-scrollbar">
                    {{item.display_path}}
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <div class="mt-6" v-else>
            <p class="bg-yellow-100/40 rounded-lg text-center">
              {{translate("No resource found, please check the validation of the resource link.", "没有资源可以下载，请查看资源链接是否有效。")}}
            </p>
          </div>
          <div class="flex flex-row justify-center items-center px-4 py-3 space-x-4">
            <button class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 grow bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200 disabled:shadow-none"
                    :disabled="state!=='can_download' || !has_selected"
                    @click="click_download">
              {{translate("Download", "下载")}}
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
import {download_id, download_show} from "@/utility/movie_dialog";
import {computed, ref, watch} from "vue";
import {video_available_files, video_download} from "@/utility/backend";
import {alert_operator} from "@/utility/components_common";


const download_state = ref({})


watch(download_show, async (new_value, old_value)=>{
  if(new_value){
    reset_download_state();
    await fetch_available_files();
  }
})


function reset_download_state(){
  download_state.value[download_id.value] = {};
  download_state.value[download_id.value].download_files = [];
  download_state.value[download_id.value].info_hash=null;
  download_state.value[download_id.value].state = "progress";
  has_selected.value = false;
}


const has_selected = ref(false);
function list_change(){
  let elements = document.getElementsByClassName("download_file");
  for(let e of elements){
    if(e.checked){
      has_selected.value=true;
      return;
    }
  }
  has_selected.value= false;
}



let download_files = computed(()=>{
  if(!download_state.value[download_id.value]){
    reset_download_state();
  }
  return download_state.value[download_id.value].download_files;
});

let info_hash = computed(()=>{
  if(!download_state.value[download_id.value]){
    reset_download_state();
  }
  return download_state.value[download_id.value].info_hash;
});

let state = computed(()=>{
  if(!download_state.value[download_id.value]){
    reset_download_state();
  }
  return download_state.value[download_id.value].state;
});

function set_download_state(name, value){
  if(!download_state.value[download_id.value]){
    reset_download_state();
  }
  download_state.value[download_id.value][name] = value;
}

async function fetch_available_files(){
  if(download_id.value === null){
    return;
  }
  let result = await video_available_files(download_id.value)
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`Failed to get available files, reason: ${result.status_message}`, `获取可下载文件失败，原因：${result.status_message}`));
    download_show.value = false;
  }else{
    if(result.data.timeout){
      set_download_state('state', 'timeout');
    }else{
      set_download_state('state', 'can_download');
      set_download_state('info_hash', result.data.info_hash);
      set_download_state('download_files', result.data.files);
    }
  }
}

function click_close(){
  download_show.value=false;
}

async function click_download(){
  let elements = document.getElementsByClassName("download_file");
  let path = [];
  for(let e of elements){
    if(e.checked){
      path.push(e.value);
    }
  }
  if(path.length === 0){
    return;
  }

  let result = await video_download(download_id.value, info_hash.value, path);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`failed to start download, reason: ${result.status_message}`, `无法开始失败，原因：${result.status_message}`));
  }else{
    alert_operator.push_alert("ok", translate("success to start downloading", "成功开始下载"));
    setTimeout(()=>{
      window.location.reload();
    }, 2000);
  }
  click_close();
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

.animate-spin {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>