<template>
  <div class="grow flex flex-row justify-center items-center h-full w-full text-gray-800 bg-gradient-to-br from-purple-200 to-indigo-400">
    <div class="flex flex-col md:flex-row justify-center md:justify-around items-center flex-wrap h-full g-6">
      <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="w-full" alt="Login Page"/>
      </div>
      <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form>
          <!-- Account input -->
          <div class="mb-6">
            <input type="text" name="account" id="account" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="translate('Account','用户名')" required="">
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input type="password" name="password" id="password" class="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="translate('Password','密码')" required="">
          </div>

          <div class="flex justify-between space-x-4 items-center mb-6">
            <div>
              <input type="checkbox" class="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="rememberMeInput"/>
              <label class="inline-block text-gray-800" for="rememberMeInput">{{ translate("Remember me","记住我") }}</label>
            </div>
            <a href="/forget_password" class="text-gray-800">{{ translate("Forgot password?","忘记密码？") }}</a>
          </div>

          <div class="text-center lg:text-left">
            <button type="button" @click="login" class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              {{ translate("Login","登陆") }}
            </button>
            <p class="text-sm  mt-2 pt-1 mb-0">
              {{ translate("Don't have an account?","没有账户？") }}
              <a href="/sign_up" class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">{{translate("Sign Up", "注册")}}</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {language, translate} from "@/utility/language";
import {session_log_in} from "@/utility/backend";
import {alert_operator, dialog_operator} from "@/utility/components_common";
import {useRouter} from "vue-router";
import {user_info} from "@/utility/session";

async function login() {
  document.querySelectorAll('input').forEach(e => e.reportValidity());
  let account = document.getElementById("account").value;
  let password = document.getElementById("password").value;
  let remember_me = document.getElementById("rememberMeInput").checked;

  if(account === "" ||password=== ""){
    return;
  }

  let result = await session_log_in(account, password, remember_me);
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`Failed to log in, reason: ${result.status_message}`, `登陆失败，原因：${result.status_message}`));
  }else{
    if(result.data.default_language !== undefined ){
      language.value = result.data.default_language;
    }
    if(result.data.profile !== undefined){
      user_info.profile = result.data.profile;
    }
    let dialog_id = dialog_operator.once_dialog_id;
    let btn = dialog_operator.create_button(translate("Go","出发"), 'blue', () => success_login(dialog_id));
    dialog_operator.push_dialog(dialog_id,
        translate(`Welcome, ${result.data.nick_name}`, `欢迎，${result.data.nick_name}`),
        translate("Click button for redirecting to homepage","点击按钮进入主页"), 'ok', 'blue', 0, [btn]);
  }
}

const router = useRouter();

function success_login(dialog_id){
  dialog_operator.close_dialog(dialog_id);
  router.push("/");
}

</script>

<style scoped>

</style>