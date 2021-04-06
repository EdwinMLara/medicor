import { FETCH_PACIENTS_REQUETS,
    FETCH_PACIENTS_SUCCESS,
    FETCH_PACIENTS_FAILURE} from './PacientesTypes';

import axios from 'axios';

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
        type:FETCH_PACIENTS_FAILURE,
        payload:error
    }
}

export const fetchPacients = () =>{
    return (dispatch : any) =>{
        dispatch(fetchPacientsRequest());
        axios.get('http://localhost:5000/pacientes')
        .then(response =>{
            const pacients = response.data;
            dispatch(fecthPacientsSuccess(pacients));
        })
        .catch(error => {
            dispatch(fetchPacientsFailure(error));
        });
    }
}