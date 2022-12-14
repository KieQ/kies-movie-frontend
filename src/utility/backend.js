import {update_user_info, user_info} from "@/utility/session";
import {language} from "@/utility/language";

// const api = "/api"

//TODO Debug code, delete later
const api = "http://localhost:8080"

async function do_fetch(url, option){
    //TODO Debug code, delete later
    option = Object.assign(option||{}, {credentials:"include"})

    let result = await fetch(`${api}${url}?lang=${language.value}`, option)
    if(result.status !== 200){
        throw Error(result.statusText);
    }
    update_user_info();
    return await result.json();
}

export async function get_homepage_content(){
    return await do_fetch("/homepage/content");
}

export async function session_sign_up(user_info){
    return await do_fetch("/session/sign_up", {
        method: "POST",
        body: JSON.stringify(user_info)
    });
}

export async function session_log_in(account, password, remember_me){
    return await do_fetch("/session/log_in", {
        method: "POST",
        body: JSON.stringify({account, password, remember_me})
    });
}

export async function session_log_out(){
    if(!user_info.login) return;
    let account = user_info.account;
    return await do_fetch("/session/log_out", {
        method: "POST",
        body: JSON.stringify({account})
    });
}

export async function user_update(account, update_data){
    return await do_fetch("/user/update", {
        method: "POST",
        body: JSON.stringify({
            account,
            ...update_data
        })
    })
}

