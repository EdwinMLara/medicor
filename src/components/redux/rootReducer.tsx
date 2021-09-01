import {combineReducers} from 'redux'
import pacientReducer from './pacientes/pacientesReducers'
import logginReducer from './loggin/logginReducer'
import consultasReducer  from './consultas/consultasReducer'

const rootReducer = combineReducers({
    loggin:logginReducer,
    statePacients: pacientReducer,
    stateConsultas: consultasReducer
})

export type RootReducerType = ReturnType<typeof rootReducer> 

export default rootReducer