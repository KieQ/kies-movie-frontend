import {update_user_info} from "@/utility/session";
import {language} from "@/utility/language";

const api = "/api"


async function do_fetch(url, option){
    option.credentials= 'include';
    let result = await fetch(`${api}${url}?lang=${language.value}`, option)
    if(result.status !== 200){
        throw Error(result.statusText);
    }
    update_user_info();
    return await result.json();
}

export async function get_homepage_content(){
    return await do_fetch(`/homepage/content`);
}

export async function session_sign_up(user_info){
    return await do_fetch(`/session/sign_up`, {
        method: "POST",
        body: JSON.stringify(user_info)
    });
}

export async function session_log_in(account, password, remember_me){
    return await do_fetch(`/session/log_in`, {
        method: "POST",
        body: JSON.stringify({account, password, remember_me})
    });
}
