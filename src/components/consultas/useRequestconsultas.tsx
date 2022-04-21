import { useEffect } from "react";

import {
    fetchConsultasRequest,
    fetchConsultasSuccess,
    fetchConsultasFailure,
    fetchCountConsultas
} from "../redux/consultas/consultasActions";

import axios from "axios";

import { useDispatch } from "react-redux";

async function useRequestConsultas(search: string, page: number, perPage: number) {
    const dispatch = useDispatch();

    let url = '';

    useEffect(() => {
        axios.get(`http://localhost:5000/consultas/count`)
            .then(response => {
                const count = response.data;
                dispatch(fetchCountConsultas(count));
            })
            .catch(error => {
                console.log(error);
            })
    }, []);
    
    (search.localeCompare('') === 0)
        ? url = `http://localhost:5000/consultas/${page}/pages/${perPage}`
        : url = `http://localhost:5000/consultas/getByName/${search}`;
    
    useEffect(()=>{
        dispatch(fetchConsultasRequest());
        axios.get(url)
        .then(response => {
            const consultas = response.data;
            console.log(consultas);
            dispatch(fetchConsultasSuccess(consultas));
        })
        .catch(error => {
            dispatch(fetchConsultasFailure(error));
        });
    },[search,page,perPage]);
}

export default useRequestConsultas;