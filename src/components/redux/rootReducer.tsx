import {combineReducers} from 'redux'
import pacientReducer from './pacientes/pacientesReducers'
import logginReducer from './loggin/logginReducer'

const rootReducer = combineReducers({
    loggin:logginReducer,
    pacients: pacientReducer
})

export type RootReducerType = ReturnType<typeof rootReducer> 

export default rootReducer