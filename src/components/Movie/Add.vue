<template>
  <div class="mt-6 rounded-3xl transition duration-300 md:p-6 h-full">
    <h2 class="px-8 text-xl font-semibold text-gray-800">{{ translate("Add Movie","添加电影") }}</h2>
    <div class="flex flex-col px-1 md:px-8 py-3 h-full min-w-fit items-center mt-3 bg-purple-50 rounded-lg space-y-1 md:space-y-4">
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="name" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Name", "名字")}}<span class="text-red-600">*</span></label>
        <input id="name" type="text" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.name" required=""/>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="description" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Description", "描述")}}</label>
        <textarea id="description" rows="4" type="text" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.description"/>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="poster_path" class="w-16 md:w-24 min-w-fit text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Poster", "海报")}}<span class="text-red-600">*</span></label>
        <div class="grow flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
          <input id="poster_path" type="text" class="px-2 w-full border-[1px] border-black rounded-lg" v-model="video.poster_path" required=""/>
          <div class="flex justify-center items-center bg-gray-300 rounded dark:bg-gray-700" v-if="video.poster_path===''">
            <svg class="h-32 w-24 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
          </div>
          <img :src="video.poster_path" class="object-cover overflow-hidden h-32 w-24" v-if="video.poster_path!==''" alt=""/>
        </div>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="video_type" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Video Type", "视频类型")}}<span class="text-red-600">*</span></label>
        <select id="video_type" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.video_type" required="">
          <option value="" selected>{{translate("Unselected","未选择")}}</option>
          <option value="0">{{translate("Movie","电影")}}</option>
          <option value="1">{{translate("TV","电视剧")}}</option>
          <option value="2">{{translate("Movie (private)","电影（私有）")}}</option>
          <option value="3">{{translate("TV (private)","电视剧（私有）")}}</option>
        </select>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="region" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Language", "语言")}}<span class="text-red-600">*</span></label>
        <select id="region" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.region" required="">
          <option value="" selected>{{translate("Unselected","未选择")}}</option>
          <option value="en">{{translate("English","英语")}}</option>
          <option value="zh">{{translate("Chinese","中文")}}</option>
          <option value="jp">{{translate("Japanese","日语")}}</option>
        </select>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="link_type" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Link Type", "链接类型")}}</label>
        <select id="link_type" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.link_type">
          <option value="0" selected>{{translate("No Link","无链接")}}</option>
          <option value="1">{{translate("Video Address","视频地址")}}</option>
          <option value="2">{{translate("Magnet Link","磁力链接")}}</option>
          <option value="3">{{translate("Torrent","种子")}}</option>
        </select>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4" v-if="video.link_type==='1' || video.link_type==='2'">
        <label for="link" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Link", "链接")}}<span class="text-red-600">*</span></label>
        <input id="link" type="text" class="px-2 grow border-[1px] border-black rounded-lg" v-model="video.link" required/>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4" v-else-if="video.link_type==='3'">
        <label for="link_file" class="w-16 md:w-24 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("File", "种子文件")}}<span class="text-red-600">*</span></label>
        <input id="link_file" type="file" class="grow" required/>
      </div>
      <div class="flex flex-row items-center justify-start w-full space-x-4">
        <label for="backdrop_path" class="w-16 md:w-24 min-w-fit text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">{{translate("Backdrop", "背景")}}<span class="text-red-600">*</span></label>
        <div class="grow flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
          <input id="backdrop_path" type="text" class="px-2 w-full border-[1px] border-black rounded-lg" v-model="video.backdrop_path" required=""/>
          <div class="flex justify-center items-center bg-gray-300 rounded dark:bg-gray-700" v-if="video.backdrop_path===''">
            <svg class="w-32 h-32 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
          </div>
          <img :src="video.backdrop_path" class="object-cover overflow-hidden w-32 h-32" v-if="video.backdrop_path!==''"/>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-row justify-center pt-8">
      <button class="w-32 h-10 rounded-lg border-[1px] border-black hover:bg-violet-600" @click="submit">
        {{translate("Submit", "提交")}}
      </button>
    </div>
  </div>
</template>

<script setup>

import {translate} from "@/utility/language";
import {reactive} from "vue";
import {video_add} from "@/utility/backend";
import {alert_operator} from "@/utility/components_common";
import {useRouter} from "vue-router";

const router = useRouter();


const video = reactive({
  name:"",
  description:"",
  poster_path:"",
  video_type:"",
  region:"",
  link:"",
  link_type:"0",
  backdrop_path: "",
})

async function submit(){
  let all_input = document.querySelectorAll('input');
  for(let e of all_input){
    if(!e.reportValidity()){
      return;
    }
  }

  let data = new FormData();
  data.set("name", video.name);
  data.set("description", video.description);
  data.set("poster_path", video.poster_path);
  data.set("region", video.region);
  data.set("video_type", video.video_type);
  data.set("link", video.link);
  data.set("link_type", video.link_type);
  data.set("backdrop_path", video.backdrop_path);

  let fileInput = document.getElementById("link_file");
  if(fileInput && fileInput.files &&fileInput.files.length > 0){
    data.set("link_file",fileInput.files[0]);
  }

  let result = await video_add(data);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`Failed to add video, reason:${result.status_message}`, `添加视频失败，理由:${result.status_message}`));
  }else{
    alert_operator.push_alert("ok", translate(`Success to add video`, `添加视频成功`));
    setTimeout(()=>{
      window.location.reload();
    },2000);
  }
}

</script>

<style scoped>
* {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>