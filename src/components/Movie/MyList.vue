<template>
  <div class="mt-6 rounded-3xl transition duration-300 md:p-6 flex flex-col grow">
    <h2 class="px-8 text-xl font-semibold text-gray-800">{{translate("My Movie List", "我的电影列表")}}</h2>
    <ul class="grow">
      <li class="flex flex-col px-1 md:px-8 py-3 items-center mt-3 bg-purple-50 rounded-lg" v-for="item of my_list" :key="item.id">
        <div class="w-full flex flex-row items-center space-x-1">
<!--          Image-->
          <div class="h-32 w-24 shrink-0">
            <img :src="item.poster_path" class="h-full mx-auto overflow-hidden object-cover	">
          </div>
<!--          Content-->
          <div class="h-32 grow py-2 md:px-3">
            <div class="w-full h-full flex flex-col">
              <div class="flex flex-row space-x-4 items-center">
                <h2 class="font-bold">{{item.title}}</h2>
                <button @click="click_liked(item)" v-if="item.liked !== undefined">
                  <Transition name="fade" mode="out-in" appear>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart text-red-500" viewBox="0 0 16 16" v-if="!item.liked">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill text-red-500" viewBox="0 0 16 16" v-else>
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                  </Transition>
                </button>
                <button @click="click_download(item)" v-if="item.download_status===1 || item.download_status===2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" :class="{'animate-bounce':item.download_status===2}" viewBox="0 0 16 16">
                      <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                      <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                    </svg>
                </button>
                <button @click="click_download(item)" v-if="item.download_status===3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download-fill text-green-500" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
                  </svg>
                </button>
              </div>
              <div class="grow mt-1">
                <p class="text-xs md:text-sm line-clamp-3">
                  {{item.description}}
                </p>
              </div>
              <div class="flex flex-row space-x-2 items-center mt-1">
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-gray-700 text-blue-200">{{item.region.toUpperCase()}}</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-violet-200" v-if="item.is_public">PUBLIC</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-purple-100" v-if="item.video_type===0">MOVIE</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-purple-100" v-if="item.video_type===1">TV</div>
              </div>
              <div>

              </div>
            </div>
          </div>
<!--          Buttons-->
          <div class="h-32 w-16 flex flex-col justify-center items-start space-y-1 shrink-0">
            <button @click="click_edit(item)" class="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2" viewBox="0 0 16 16">
                <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
              </svg>
              <span>
              {{ translate("Edit", "编辑") }}
              </span>
            </button>
            <button @click="click_play(item)"  class="text-blue-600  hover:text-blue-800 flex items-center space-x-1" v-if="should_show_play_btn(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
              </svg>
              <span>
              {{translate("Play","播放")}}
              </span>
            </button>
            <button @click="click_delete_video(item)" class="text-fuchsia-600  hover:text-fuchsia-800 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              <span>
              {{translate("Delete", "删除")}}
              </span>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <Pagination class="self-end" :total="total" :size="10" :callback="page_changed"></Pagination>
    <PlayDialog/>
    <DownloadDialog/>
  </div>
</template>

<script setup>

import {translate} from "@/utility/language";
import {onMounted, ref} from "vue";
import {video_delete, video_like, video_list} from "@/utility/backend";
import {alert_operator, dialog_operator} from "@/utility/components_common";
import Pagination from "@/components/Common/Pagination.vue";
import PlayDialog from "@/components/Movie/Dialog/PlayDialog.vue";
import {download_id, download_show, play_files, play_show} from "@/utility/movie_dialog";
import DownloadDialog from "@/components/Movie/Dialog/DownloadDialog.vue";
import {useRouter} from "vue-router";

const page = ref(0);
const size = ref(10);
const total = ref(0);

const my_list = ref([])
const router = useRouter();

function page_changed(value){
  page.value =value;
  get_video_list(page.value, size.value);
}

onMounted(async ()=>{
  await get_video_list(page.value, size.value);
})

async function get_video_list(page, size){
  let result = await video_list(page, size);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`failed to get video list, reason: ${result.status_message}`, `获取视频列表失败，原因：${result.status_message}`))
    return;
  }
  my_list.value = result.data.items;
  total.value = result.data.total;
}


async function click_liked(item){
  let result = await video_like(item.id, !item.liked);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`failed to update like, reason: ${result.status_message}`, `更新喜爱失败，原因：${result.status_message}`))
  }else{
    alert_operator.push_alert("ok", translate(`success to update like`, `更新喜爱成功`))
    item.liked = !item.liked
  }
}

function click_edit(item){
  router.push({path:"/movie/edit", query: { id: item.id}})
}

function click_play(item){
  play_files.value = [];
  for(let file of item.can_play_files){
    if(file.can_play){
      play_files.value.push(file);
    }
  }
  play_show.value = true;
}

function should_show_play_btn(item){
  if(!item.can_play_files){
    return false
  }
  for(let i of item.can_play_files){
    if(i.can_play){
      return true;
    }
  }
  return false;
}

async function click_download(item){
  download_id.value = item.id;
  download_show.value= true;
}

async function click_delete_video(item){
  let dialog_id = dialog_operator.once_dialog_id;
  let yes_btn = dialog_operator.create_button(translate("Yes", "确定"),"red",async ()=>{
    let result = await video_delete(item.id)
    if(result.status_code !== 0){
      alert_operator.push_alert("error", translate(`failed to delete video, reason: ${result.status_message}`, `删除视频失败，原因：${result.status_message}`))
    }else{
      alert_operator.push_alert("ok", translate(`success to delete video`, `成功删除视频`))
      setTimeout(()=>{
        window.location.reload();
      }, 2000);
    }
    dialog_operator.close_dialog(dialog_id);
  });
  let no_btn = dialog_operator.create_button(translate("No", "不了"), "blue", ()=>{
    dialog_operator.close_dialog(dialog_id);
  });

  dialog_operator.push_dialog(dialog_id, translate("Confirm to Delete?", "确认删除？"),
  translate("All the information about this video will be deleted, do you confirm to continue?", "关于此资源的所有信息将被删除，确认继续进行？"),"warn", "blue",0, [yes_btn, no_btn]);
}

</script>

<style scoped>
* {
  outline: 2px solid transparent;
  outline-offset: 2px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>