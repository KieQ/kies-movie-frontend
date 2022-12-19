<template>
  <section class="grow bg-gray-50 dark:bg-gray-900 pt-24 bg-gradient-to-br from-purple-200 to-indigo-400">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
      <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="../../assets/img/logo.png" alt="logo">
        {{translate("Little Bear Watch Movie", "小熊看电影")}}
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {{ translate("Create an Account", "创建用户") }}
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="account" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Account", "账户")}}</label>
              <input type="text" name="account" id="account" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="bear" required="">
            </div>
            <div>
              <label for="nick_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Nickname", "昵称")}}</label>
              <input type="text" name="nick_name" id="nick_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="bear" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Password", "密码")}}</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Confirm Password", "确认密码")}}</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-start" :class="{shake:shake_running}">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="">
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">{{translate("I accept the", "我接受")}} <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/terms_and_conditions">{{translate("Terms and Conditions", "服务条款")}}</a></label>
              </div>
            </div>
            <button type="button" @click="sign_up" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{ translate("Create an account","创建账户") }}</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              {{ translate("Already have an account ?", "已有账户？") }} <a href="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">{{translate("Login Here", "点击登录")}}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {translate} from "@/utility/language";
import {ref} from "vue";
import {session_sign_up} from "@/utility/backend";
import {get_cookie} from "@/utility/session";
import {alert_operator, dialog_operator} from "@/utility/components_common";
import {useRouter} from "vue-router";


const shake_running = ref(false);
const router = useRouter();

async function sign_up(){
  document.querySelectorAll('input').forEach(e => e.reportValidity());

  let terms = document.getElementById("terms");
  if(!terms.checked){
    shake_running.value = true;
    setTimeout(()=>{shake_running.value=false}, 1000);
    return;
  }

  let account = document.getElementById("account").value;
  let password = document.getElementById("password").value;
  let nick_name = document.getElementById("nick_name").value;
  let confirm_password = document.getElementById("confirm-password").value;

  if(password==="" || confirm_password==="" || account===""){
    return;
  }

  if(confirm_password !== password){
    let dialog_id = dialog_operator.once_dialog_id;
    let btn = dialog_operator.create_button(translate("OK","好的"), 'red', () => close_dialog_and_reset_password(dialog_id));
    dialog_operator.push_dialog(dialog_id,
        translate("Passwords Not The Same", "密码不同"),
        translate("The passwords inputted twice are not the same, please check and input again.","两次输入的密码不一致，请检查后重新输入。"), 'warn', 'red', 0, [btn]);
    return;
  }
  let result = await session_sign_up({
    account,
    password,
    nick_name,
    default_language:get_cookie("lang")
  })
  if(result.status_code !== 0){
    alert_operator.push_alert("error", translate(`Failed to sign up, reason: ${result.status_message}`, `注册失败，原因：${result.status_message}`));
  }else{
    let dialog_id = dialog_operator.once_dialog_id;
    let btn = dialog_operator.create_button(translate("Go","出发"), 'blue', () => close_dialog_and_push_to_login(dialog_id));
    dialog_operator.push_dialog(dialog_id,
        translate("Success to Sign Up", "注册成功"),
        translate("Click button for redirecting to login page","点击按钮进入登陆界面"), 'ok', 'blue', 0, [btn]);
  }
}

function close_dialog_and_reset_password(dialog_id) {
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value="";
  dialog_operator.close_dialog(dialog_id);
}

function close_dialog_and_push_to_login(dialog_id) {
  dialog_operator.close_dialog(dialog_id);
  router.push("/login");
}

</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>