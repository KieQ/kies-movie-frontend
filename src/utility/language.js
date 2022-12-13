import {ref, watch} from "vue";
import {get_cookie} from "@/utility/session";

export const language = ref(get_cookie("lang")??'en');

export function translate(en, zh){
    switch (language.value){
        case "en":
            return en;
        case "zh":
        case "zh-cn":
            return zh;
    }
    return ""
}
watch(language, ()=>{
    document.cookie = `lang=${language.value}`
})
