import {computed, ref, watch, watchEffect} from "vue";


export const language = ref('en');

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
