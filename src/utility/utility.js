import {reactive} from "vue";


export const user_info = reactive({
    login: false,
    account: ""
})

function get_cookie(name){
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

function parse_jwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function update_user_info(){
    let token = get_cookie("Token");
    if(token){
        let payload = parse_jwt(token)
        if(payload.exp < Math.floor(Date.now() / 1000)){
            user_info.login = false;
            user_info.account = "";
        }else{
            user_info.login = true;
            user_info.account=payload.account;
        }
    }
}