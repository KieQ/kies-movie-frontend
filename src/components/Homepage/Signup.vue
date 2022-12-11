<template>
  <section class="bg-gray-50 dark:bg-gray-900 h-full">
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
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Password", "密码")}}</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{translate("Confirm Password", "确认密码")}}</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="">
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

  <Dialog
      v-if="show_same_dialog"
      :title="translate('Password Error','密码错误')"
      :content="translate('Password and confirm password are not the same, please check','密码和确认密码不一致，请检查')"
      type="error"
      color="red"
      :button="[{
        text: translate('OK', '好的'),
        color: 'red',
        grow: true,
        event: 'okEvent',
      }]"
      @ok-event="ok"/>
</template>

<script setup>
import {translate} from "@/utility/language";
import Dialog from "@/components/Dialog/Dialog.vue";
import {ref} from "vue";


const show_same_dialog = ref(false);

async function sign_up(){
  document.querySelectorAll('input').forEach(e => e.reportValidity());

  let account = document.getElementById("account").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm-password").value;

  if(confirm_password !== password){
    show_same_dialog.value = true;
    return;
  }


}

function ok(){
  document.getElementById("password").value = "";
  document.getElementById("confirm-password").value = "";
  show_same_dialog.value = false;
}

</script>

<style scoped>

</style>