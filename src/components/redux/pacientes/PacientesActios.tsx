import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE,CURRENT_PACIENT_STATUS} from './PacientesTypes';

export const fetchPacientsRequest = () =>{
    return {
        type: FETCH_PACIENTS_REQUETS
    }
}

export const fecthPacientsSuccess = (pacients : any) =>{
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

export const updateCurrentPacient = (pacient : any) =>{
    return {
        type: CURRENT_PACIENT_STATUS,
        payload: pacient
    }
}