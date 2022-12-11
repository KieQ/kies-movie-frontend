<template>
<!--navbar for PC-->
  <nav class="hidden md:flex flex-row justify-between items-center bg-gray-300/30 text-black absolute h-12 w-full space-x-2 px-3 not-select z-10">
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
        <div class="" id="profileButton">
          <button class="h-full flex justify-center items-center min-w-max" v-if="!user_info.login">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle w-6" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </button>
          <button class="h-full flex justify-center items-center min-w-max" v-if="user_info.login">
            <img class="rounded-full w-6" src="../assets/img/logo.png" alt="profile"/>
          </button>

          <Transition name="profile-fade">
            <ul class="flex flex-col text-center items-start justify-center p-0 -ml-32 absolute" v-if="show_profile_menu">
              <li class="bg-gray-100 hover:bg-blue-300 w-40 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
                <a class="w-full text-start" href="/dashboard">
                  {{english?"Dashboard":"控制板"}}
                </a>
              </li>
              <li class="bg-gray-100 hover:bg-blue-300 w-40 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
                <a class="w-full text-start" href="/setting">
                  {{english?"Setting":"设置"}}
                </a>
              </li>
              <li>
                <hr class="w-5/6 mx-auto"/>
              </li>
              <li class="bg-gray-100 hover:bg-blue-300 w-40 h-10 flex flex-col justify-center items-start px-3 cursor-pointer">
                <a class="w-full text-start" href="/logout">
                  {{english?"Logout":"退出"}}
                </a>
              </li>
            </ul>
          </Transition>
        </div>

    </div>
  </nav>


<!--navbar for Mobile-->
  <nav class="flex flex-col md:hidden not-select justify-between items-center bg-gray-300/50 w-full py-2 px-0 space-x-2 z-10 not-select" :class="{absolute:!show_mobile_menu}">
    <div class="flex flex-row justify-between items-center w-full">
      <div class="w-16 ml-2 origin-left	duration-300 ease-in-out transition grow" :class="{move_to_center:show_mobile_menu}">
        <a href="/">
          <img src="../assets/img/logo.png" class="w-8 ml-2 brightness-90 hover:brightness-100" alt="logo"/>
        </a>
      </div>

      <div class="w-16 cursor-pointer z-20 outline-none" @click="trigger_mobile_menu">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
               class="w-6 duration-300 ease-in-out transition" :class="{rotate :show_mobile_menu}" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
            </path>
          </svg>
      </div>
    </div>

    <Transition name="menu-fade">
      <div class="flex flex-col" v-if="show_mobile_menu" id="mobileMenu">
        <ul class="flex flex-col pl-0 list-style-none mr-auto">
          <li class="p-2 w-60 text-center">
            <div class="h-full flex flex-row items-center justify-center w-full">
              <div class="flex flex-row items-center form-check form-switch space-x-2">
                <input class="form-check-input appearance-none w-16 -ml-10 rounded-full float-left h-8 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="languageSwitch" v-model="english">
                <label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">{{english?"EN":"中"}}</label>
              </div>
            </div>
          </li>
          <li class="p-2 w-60 text-center">
            <a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="/movie">
              {{english?"Movie":"电影"}}
            </a>
          </li>
          <li class="p-2 w-60 text-center">
            <a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="/about">
              {{english?"About":"关于"}}
            </a>
          </li>
          <li class="p-2 w-60 flex flex-row justify-center" v-if="!user_info.login">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="unLogin_profile_click">
              {{ english?"LOG IN":"登陆" }}
            </button>
          </li>
          <li class="p-2 w-60 text-center" v-if="user_info.login">
            <a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="/dashboard">
              {{english?"Dashboard":"控制板"}}
            </a>
          </li>
          <li class="p-2 w-60 text-center" v-if="user_info.login">
            <a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="/setting">
              {{english?"Setting":"设置"}}
            </a>
          </li>
          <li class="p-2 w-60 text-center" v-if="user_info.login">
            <a class="text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="/logout">
              {{english?"Logout":"退出"}}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";
  import {update_user_info, user_info, listen_click} from "@/utility/utility";
  import {english} from "@/utility/language";
  import {useRouter} from "vue-router";

  //Global Variable
  const router = useRouter();
  const show_profile_menu = ref(false);

  //Mount
  onMounted(()=>{
    update_user_info();
    user_info.login=true;

    listen_click(["profileButton"], function (){
      if(user_info.login){
        show_profile_menu.value = !show_profile_menu.value;
      }else{
        router.push("/login");
      }
    }, function (){
      show_profile_menu.value = false;
    });
  })

  //Click Not Login Profile Mobile
  function unLogin_profile_click(){
    router.push("/login");
  }

  //Show Mobile Menu
  const show_mobile_menu = ref(false);
  function trigger_mobile_menu(){
    show_mobile_menu.value = !show_mobile_menu.value;
  }


  watchEffect( ()=>{
    if(english.value){
      document.title = "Little Bear Watches Movie";
    }else{
      document.title = "小熊看电影"
    }
  })

</script>

<style scoped>
.not-select {
  user-select: none;
}

.profile-fade-enter-active {
  transition: all 0.3s ease-out;
}

.profile-fade-leave-active {
  transition: all 0.3s ease-out;
}

.profile-fade-enter-from,
.profile-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.menu-fade-enter-active {
  transition: all 0.3s ease-out;
}

.menu-fade-leave-active {
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.rotate {
  transform: rotate(-90deg);
}

.move_to_center{
  transform: translateX(50%);
}
</style>