import {FETCH_CONSULTAS_REQUEST,FETCH_CONSULTAS_SUCCESS,
    FETCH_CONSULTAS_FAILURE,CURRENT_CONSULTAS_STATUS,
    FETCH_COUNT_CONSULTAS,
ConsultaValues} from './consultasTypes';

export const fetchConsultasRequest = () =>{
    return {
        type: FETCH_CONSULTAS_REQUEST
    }
}

export const fetchConsultasSuccess = (consultas : ConsultaValues[]) =>{
    return{
        type: FETCH_CONSULTAS_SUCCESS,
        payload:consultas
    }
}

export const fetchConsultasFailure = (error : any) =>{
    return{
        type: FETCH_CONSULTAS_FAILURE,
        payload:error
    }
}

export const UpdateCurrentConsulta = (consulta : ConsultaValues) =>{
    return{
        type:CURRENT_CONSULTAS_STATUS,
        payload:consulta
    }
}

export const fetchCountConsultas = (count:number) => {
    return{
        type:FETCH_COUNT_CONSULTAS,
        payload:count
    }
}