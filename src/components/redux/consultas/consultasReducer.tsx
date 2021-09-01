import {FETCH_CONSULTAS_REQUEST,FETCH_CONSULTAS_SUCCESS,
    FETCH_CONSULTAS_FAILURE,CURRENT_CONSULTAS_STATUS,
    ActionType, StateValuesConsultas,ConsultaValues} from './consultasTypes';

const initialStateConsultas : StateValuesConsultas = {
    loading:false,
    error:'',
    consultas: [],
    currentConsulta:{} as ConsultaValues
}

const consultasReducer = (state = initialStateConsultas, action: ActionType) =>{
    switch(action.type){
        case FETCH_CONSULTAS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_CONSULTAS_SUCCESS:
            return{
                ...state,
                loading:false,
                consultas:action.payload
            }
        case FETCH_CONSULTAS_FAILURE:
            return{
                ...state,
                loading:false,
                consultas:[],
                error:action.payload
            }
        case CURRENT_CONSULTAS_STATUS:
            return{
                ...state,
                currentConsulta:action.payload
            }
        default:
            return state 
    }
}

export default consultasReducer;