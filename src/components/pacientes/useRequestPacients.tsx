import {useEffect} from 'react'

import {fetchPacientsRequest,
    fecthPacientsSuccess,fetchPacientsFailure} from '../redux/pacientes/PacientesActios'
import axios from 'axios';

import {useDispatch} from 'react-redux'

function useRequestPacients(search : string,page: number) {
    const dispatch = useDispatch()
    let url = '';
    (search.localeCompare('') === 0) ? 
        url = 'http://localhost:5000/pacientes' :
         url = `http://localhost:5000/pacientes/getByName/${search}`
    
    useEffect(() => {
        dispatch(fetchPacientsRequest());
        axios.get(url)
        .then(response =>{
            const pacients = response.data;
            dispatch(fecthPacientsSuccess(pacients));
        })
        .catch(error => {
            dispatch(fetchPacientsFailure(error));
        });
    },[search]);
}

export default useRequestPacients
