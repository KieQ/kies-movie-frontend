import {ref, watch, watchEffect} from "vue";
import {get_cookie} from "@/utility/session";

export const language = ref(get_cookie("language")??'en');

export function translate(en, zh){
    switch (language.value){
        case "en":
            return en;
        case "zh":
            return zh;
    }
    return en
}
watchEffect(()=>{
    document.title = translate("Little Bear Watches Movie", "小熊看电影")
    document.cookie = `language=${language.value}`
})
