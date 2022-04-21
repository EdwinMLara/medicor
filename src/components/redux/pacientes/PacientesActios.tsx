import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE,CURRENT_PACIENT_STATUS,
    FETCH_COUNT_PACIENTS,
    PacienteFormValues} from './PacientesTypes';

export const fetchPacientsRequest = () =>{
    return {
        type: FETCH_PACIENTS_REQUETS
    }
}

export const fecthPacientsSuccess = (pacients : PacienteFormValues[]) =>{
    return {
        type: FETCH_PACIENTS_SUCCESS,
        payload: pacients
    }
}


export const fetchPacientsFailure = (error : any) =>{
    return {
        type: FETCH_PACIENTS_FAILURE,
        payload:error
    }
}

export const updateCurrentPacient = (pacient : PacienteFormValues) =>{
    return {
        type: CURRENT_PACIENT_STATUS,
        payload: pacient
    }
}

export const fetchCountPacients = (count: number) => {
    return {
        type:FETCH_COUNT_PACIENTS,
        payload:count
    }
}