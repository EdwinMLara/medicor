import {IS_CONNECTED,IS_DISCONNECTED} from './logginTypes';

interface LoginValues {
    statusLoggin : boolean
}

const initalStateLoggin : LoginValues = {
    statusLoggin : false
}

const logginReducer = (state = initalStateLoggin,action : any) =>{
    switch(action.type){
        case IS_CONNECTED:
            return{
                statusLoggin : true
            }
        case IS_DISCONNECTED:
            return{
                statusLoggin : false
            }
        default:
            return state
    }
}

export default logginReducer;