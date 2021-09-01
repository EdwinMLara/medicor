import {IS_CONNECTED,IS_DISCONNECTED
    ,ActionTypeLoggin} from './logginTypes';

const initalStateLoggin : Boolean  = false;

const logginReducer = (state = initalStateLoggin,action : ActionTypeLoggin) =>{
    switch(action.type){
        case IS_CONNECTED:
            return true;
        case IS_DISCONNECTED:
            return false;
        default:
            return state;
    }
}

export default logginReducer;