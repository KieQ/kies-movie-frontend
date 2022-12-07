<template>
<!--navbar for PC-->
  <nav class="hidden md:flex flex-row justify-between items-center bg-gray-300/30 text-black absolute h-12 w-full space-x-2 px-3 not-select">
<!--logo-->
    <div class="w-10 text-center">
      <a href="/">
      <img src="../assets/img/logo.png" class="w-8 mx-auto brightness-90 hover:brightness-100" alt="logo"/>
      </a>
    </div>

    <!--main part-->
    <div class="grow flex flex-row justify-start h-full ml-20 space-x-0 pl-5 text-center">
      <a href="/movie" class="w-20">
        <div class="mx-auto px-5 h-full flex flex-row items-center justify-center hover:bg-gray-600/80 hover:text-white hover:shadow-xl">
          <span>{{english?"Movie":"电影"}}</span>
        </div>
      </a>
      <a href="/about" class="w-20">
        <div class="mx-auto px-5 h-full flex flex-row items-center justify-center hover:bg-gray-600/80 hover:text-white hover:shadow-xl">
          <span>{{english?"About":"关于"}}</span>
        </div>
      </a>
    </div>

    <!--right part-->
    <div class="flex flex-row h-full space-x-4">
        <div class="px-5 h-full flex flex-row items-center w-20">
          <div class="flex flex-row items-center form-check form-switch space-x-2">
            <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="languageSwitch" v-model="english">
            <label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">{{english?"EN":"中"}}</label>
          </div>
        </div>
        <div class="dropdown">
          <button class="h-full flex justify-center items-center dropdown-toggle min-w-max" :data-bs-toggle="user_info.login?'dropdown':''" @click="click_login" aria-expanded="false" id="profileButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle w-6" viewBox="0 0 16 16" v-if="!user_info.login">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <img class="rounded-full w-6" v-if="user_info.login" src="../assets/img/logo.png" alt="profile"/>
          </button>

          <ul class="dropdown-menu hidden flex flex-col text-center items-start justify-center p-0" v-if="user_info.login">
            <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Dashboard":"控制板"}}
              </span>
            </li>
            <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Setting":"设置"}}
              </span>
            </li>
            <li>
              <hr class="w-5/6 mx-auto"/>
            </li>
            <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Logout":"退出"}}
              </span>
            </li>
          </ul>
        </div>
    </div>
  </nav>


<!--navbar for Mobile-->
  <nav class="flex flex-row md:hidden not-select justify-between items-center bg-gray-300/50 absolute w-full py-2 px-0 space-x-2">
    <div class="w-16">
      <a href="/">
        <img src="../assets/img/logo.png" class="w-8 mx-auto brightness-90 hover:brightness-100" alt="logo"/>
      </a>
    </div>
    <div class="dropdown flex items-center">
      <button class="w-16" :data-bs-toggle="user_info.login?'dropdown':''" @click="click_login" aria-expanded="false" id="profileButtonMobile">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-expand mx-auto w-8" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
        </svg>
      </button>

      <ul class="dropdown-menu hidden flex flex-col text-center items-start justify-center p-0" v-if="user_info.login">
        <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Dashboard":"控制板"}}
              </span>
        </li>
        <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Setting":"设置"}}
              </span>
        </li>
        <li>
          <hr class="w-5/6 mx-auto"/>
        </li>
        <li class="dropdown-item bg-gray-100 hover:bg-blue-300 w-48 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
              <span>
                {{english?"Logout":"退出"}}
              </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {update_user_info, user_info} from "@/utility/utility";
  import {useRouter} from "vue-router";

  const english = ref(false);
  const router = useRouter();

  onMounted(()=>{
    update_user_info();
    user_info.login=true
  })


  function click_login(){
    if(!user_info.login){
      router.push("/login");
    }
  }


</script>

<style scoped>
.not-select {
  user-select: none;
}
</style>