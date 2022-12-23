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
    return ""
}
watchEffect(()=>{
    document.cookie = `language=${language.value}`
})
