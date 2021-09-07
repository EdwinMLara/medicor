import {UserValues,
stateUserValues,ActionUser,
     FETCH_USERS_REQUETS, FETCH_USERS_SUCCESS, 
     FETCH_USERS_FAILURE, CURRENT_USERS_STATUS} from "./UsersTypes";

const initialStateUsers : stateUserValues = {
    loading : false,
    error:'',
    usuarios:[],
    currentUser:{} as UserValues
}

const userReducer = (state : stateUserValues = initialStateUsers, action : ActionUser) : stateUserValues => {
     switch(action.type){
         case FETCH_USERS_REQUETS:
             return {
                 ...state,
                 loading:true
             }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                usuarios: action.payload
            }
        case FETCH_USERS_FAILURE:
            return{
              ...state,
              loading:false,
              usuarios:[],
              error: action.payload   
            }
        case CURRENT_USERS_STATUS:
            return {
                ...state,
                currentUser:action.payload
            }
        default:
            return state;
     }
}

export default userReducer;