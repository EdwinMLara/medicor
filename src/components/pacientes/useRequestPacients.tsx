import {useEffect} from 'react'

import {fetchPacientsRequest,
    fecthPacientsSuccess,
    fetchPacientsFailure,
    fetchCountPacients} from '../redux/pacientes/PacientesActios'
import axios from 'axios';

import {useDispatch} from 'react-redux'

async function useRequestPacients(search : string,page: number,perPage:number) {    
    const dispatch = useDispatch()
    let url = '';

    useEffect(()=>{
         axios.get(`http://localhost:5000/pacientes/count`)
        .then(response => {
            let count = response.data;
            dispatch(fetchCountPacients(count));
        }).catch(error => {
            console.log(error);
        });
    },[]);

    (search.localeCompare('') === 0) ? 
        url = `http://localhost:5000/pacientes/${page}/pages/${perPage}`:
         url = `http://localhost:5000/pacientes/getByName/${search}`;


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
    },[search,page,perPage]);
}

export default useRequestPacients
