import {reactive, ref} from "vue";


class DialogOperator{
    constructor() {
        this.dialogs = new Map();
        this.dialog_id = 0
    }


    get once_dialog_id(){
        return this.dialog_id++;
    }

    push_dialog(dialog_id, title, content, type='info', color='blue', timeout=0, button=[]){
        let dialog = {
            title,
            content,
            type,
            color,
            button,
        };
        this.dialogs.set(dialog_id, dialog);
        if(timeout > 0){
            setTimeout(()=>this.dialogs.delete(dialog_id), timeout)
        }
    }

    close_dialog(dialog_count){
        this.dialogs.delete(dialog_count);
    }

    create_button(text, color, callback=()=>{}, param=[], grow=true){
        return {text, color, callback,param, grow};
    }

}

export const dialog_operator = reactive(new DialogOperator())


class AlertOperator{
    constructor() {
        this.alerts = new Map();
        this.alert_id = 0;
    }

    push_alert(type, content, timeout=3000, with_close_btn=true){
        let alert_id = this.alert_id++;
        let alert = {
            alert_id,
            content,
            type,
        };
        if(with_close_btn){
            alert.callback = ()=>{this.alerts.delete(alert_id);}
        }
        this.alerts.set(alert_id, alert);
        if(timeout > 0){
            setTimeout(()=>this.alerts.delete(alert_id), timeout)
        }
    }
}

export const alert_operator = reactive(new AlertOperator())