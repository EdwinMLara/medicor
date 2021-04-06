import {IS_CONNECTED,IS_DISCONNECTED} from './logginTypes';

export const statusLogginConnected = () =>{
    return{
        type:IS_CONNECTED,
        payload: true
    }
}

export const statusLogginDesconnected = () =>{
    return{
        type:IS_DISCONNECTED,
        payload: false
    }
}