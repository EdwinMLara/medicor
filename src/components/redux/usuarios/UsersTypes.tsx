export const FETCH_USERS_REQUETS = 'FETCH_USERS_REQUETS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CURRENT_USERS_STATUS = 'CURRENT_USERS_STATUS';

export type Actions =  'FETCH_USERS_REQUETS' | 'FETCH_USERS_SUCCESS'
 | 'FETCH_USERS_FAILURE' | 'CURRENT_USERS_STATUS';

export type TypeCount = 'Administrador' | 'Medico' | 'Inventario';

export interface UserValues{
    username:string,
    name:string,
    password:string,
    typeCount:TypeCount,
    cedula:number
}

export interface stateUserValues {
    loading:boolean,
    error:any,
    usuarios: Array<UserValues>,
    currentUser:UserValues
}

export interface ActionUser {
    type:Actions,
    payload:any
}