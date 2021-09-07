import {FETCH_USERS_REQUETS,FETCH_USERS_FAILURE,FETCH_USERS_SUCCESS,
    CURRENT_USERS_STATUS,UserValues,Actions} from './UsersTypes'

export const fetchUsersRequest = () : {type:Actions} => {
    return {
        type:FETCH_USERS_REQUETS
    }
}

export const fetchUsersSuccess = (users : UserValues[]) : {type:Actions,payload:UserValues[]} => {
    return{
        type:FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = (error : any) : {type:Actions, payload : any} =>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

export const updateCurrentUsers = (user : UserValues) : {type:Actions,payload:UserValues} =>{
   return{
       type:CURRENT_USERS_STATUS,
       payload:user
   } 
}