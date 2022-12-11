function any_contain(ids, target){
    for(let id of ids){
        const ref = document.getElementById(id);
        if(ref&& ref.contains(target)){
            return true
        }
    }
    return false;
}

export function listen_click(ids, click_in, click_out){
    window.addEventListener('click', function(e){
        if (any_contain(ids, e.target)){
            if(click_in){
                click_in();
            }
        } else{
            if(click_out){
                click_out();
            }
        }
    });
}


export function wrap_if_too_long(content, length){
    if(content.length > length){
        return content.substring(0, length) + "...";
    }
    return content;
}