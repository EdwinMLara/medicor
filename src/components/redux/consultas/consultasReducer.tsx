import {
    FETCH_CONSULTAS_REQUEST, FETCH_CONSULTAS_SUCCESS,
    FETCH_CONSULTAS_FAILURE, CURRENT_CONSULTAS_STATUS,
    StateValuesConsultas, ConsultaValues, FETCH_COUNT_CONSULTAS
} from './consultasTypes';

const initialStateConsultas: StateValuesConsultas = {
    count: 0,
    loading: false,
    error: '',
    consultas: [],
    currentConsulta: {} as ConsultaValues
}

const consultasReducer = (state = initialStateConsultas, action: any) => {
    switch (action.type) {
        case FETCH_CONSULTAS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CONSULTAS_SUCCESS:
            return {
                ...state,
                loading: false,
                consultas: action.payload
            }
        case FETCH_CONSULTAS_FAILURE:
            return {
                ...state,
                loading: false,
                consultas: [],
                error: action.payload
            }
        case CURRENT_CONSULTAS_STATUS:
            return {
                ...state,
                currentConsulta: action.payload
            }
        case FETCH_COUNT_CONSULTAS:
            return {
                ...state,
                count: action.payload
            }
        default:
            return state
    }
}

export default consultasReducer;