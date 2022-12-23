<template>
  <div class="mt-6 rounded-3xl transition duration-300 md:p-6 flex flex-col grow">
    <h2 class="px-8 text-xl font-semibold text-gray-800">{{translate("Shared Movie List", "共享电影列表")}}</h2>
    <ul class="grow">
      <li class="flex flex-col px-1 md:px-8 py-3 items-center mt-3 bg-purple-50 rounded-lg" v-for="item of public_list" :key="item.id">
        <div class="w-full flex flex-row items-center ">
          <!--          Image-->
          <div class="h-32 w-24 shrink-0">
            <img :src="item.poster_path" class="h-full mx-auto overflow-hidden object-cover	">
          </div>
          <!--          Content-->
          <div class="h-32 grow py-2 md:px-3">
            <div class="w-full h-full flex flex-col">
              <div class="flex flex-row space-x-4 items-center">
                <h2 class="font-bold">{{item.title}}</h2>
                <button @click="click_add_to_my_list(item)">
                  <Transition name="fade" mode="out-in" appear>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </Transition>
                </button>
              </div>
              <div class="grow mt-1">
                <p class="text-xs md:text-sm line-clamp-3">
                  {{item.description}}
                </p>
              </div>
              <div class="flex flex-row space-x-2 items-center mt-1">
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-gray-700 text-blue-200">{{item.region.toUpperCase()}}</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-purple-100" v-if="item.video_type===0">MOVIE</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-purple-100" v-if="item.video_type===1">TV</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-teal-100" v-if="item.download_status===0">{{translate("No Resource", "无资源")}}</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-red-100" v-else-if="item.download_status===1">{{translate("Can Download", "可下载")}}</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-yellow-100" v-else-if="item.download_status===2">{{translate("Downloading", "下载中")}}</div>
                <div class="rounded-lg p-[2px] text-xs border-[1px] border-black bg-green-100" v-else-if="item.download_status===3">{{translate("Can Play", "可播放")}}</div>
              </div>
              <div>

              </div>
            </div>
          </div>
          <!--          User-->
          <div class="h-32 w-16 flex flex-col justify-center items-center space-y-1 shrink-0">
            <img :src="item.user_profile" class="rounded-full w-16 h-16 overflow-hidden object-cover" alt="User Profile"/>
            <div>
              {{item.user_name}}
            </div>
          </div>
        </div>
      </li>
    </ul>

    <Pagination :total="total" :size="10" :callback="page_changed"></Pagination>

  </div>
</template>

<script setup>

import {translate} from "@/utility/language";
import {onMounted, ref} from "vue";
import {not_login_video_list, video_add, video_clone} from "@/utility/backend";
import {alert_operator} from "@/utility/components_common";
import {user_info} from "@/utility/session";
import Pagination from "@/components/Common/Pagination.vue";

const public_list = ref([])
const page = ref(0);
const size = ref(10);
const total = ref(0);

onMounted(async ()=>{
  await get_video_list(page.value, size.value);
})

function page_changed(value){
  page.value =value;
  get_video_list(page.value, size.value);
}

async function get_video_list(page, size){
  let result = await not_login_video_list(page, size);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`failed to get video list, reason: ${result.status_message}`, `获取视频列表失败，原因：${result.status_message}`))
    return;
  }
  public_list.value = result.data.items;
  total.value = result.data.total;
}

async function click_add_to_my_list(item){
  if(!user_info.login){
    alert_operator.push_alert("warn", translate("You are not logged in, please login first", "你未登陆，请登录后操作"))
    return;
  }
  let result = await video_clone(item.id);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`Failed to add video, reason:${result.status_message}`, `添加视频失败，理由:${result.status_message}`));
  }else{
    alert_operator.push_alert("ok", translate(`Success to add video`, `添加视频成功`));
  }
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