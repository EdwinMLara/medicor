import {useFormik} from 'formik'
import { Button, TextField } from "@material-ui/core"
import React from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';

interface ConsultaValues{
    [idPaciente:string] :String,
    sintomas:String,
    diagnostico:String
}

const validationSchemaConsulta = yup.object({
    sintomas: yup.string().required("Agregar sintomas del paciente"),
    diagnostico: yup.string().required("Agregar diagnostico")
});

function NewConsulta(props : any) {
    const {paciente} = props.location;
    console.log(paciente);

    const initialValuesConsulta : ConsultaValues = {
        idPaciente:paciente._id,
        sintomas:'',
        diagnostico:''
    }

    const sendPostRequest = async (body : ConsultaValues) =>{
       let response = await axios.post('http://localhost:5000/consultas/insert',body)
            .then(response =>{
                return response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        console.log(response);
    }

    const formik = useFormik({
        initialValues: initialValuesConsulta,
        validationSchema:validationSchemaConsulta,
        onSubmit:(values) =>{
            for(let key in values){
                values[key] = values[key].trim();
            }
            console.log(values);
            let elemet = document.createElement('div');
            ReactDOM.render(<Receta {...values}/>, elemet);
            window.open("", "Receta", "width=520,height=650")?.document.body.appendChild(elemet);
            //sendPostRequest(values);
        }
    });

    return (
        <React.Fragment>
            <h1>Nueva Consulta</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField disabled fullWidth
                        id="nombre" 
                        label="Nombre del Paciente" 
                        name="nombre" 
                        value={paciente.nombre}
                    />
                    <TextField fullWidth
                        id="sintomas" 
                        label="Sintomas del Paciente" 
                        name="sintomas" 
                        value={formik.values.sintomas}
                        onChange={formik.handleChange}
                        error={formik.touched.sintomas && Boolean(formik.errors.sintomas)}
                        helperText={formik.touched.sintomas && formik.errors.sintomas}
                    />  
                    <TextField fullWidth
                        id="diagnostico" 
                        label="Diagnostico" 
                        name="diagnostico" 
                        value={formik.values.diagnostico}
                        onChange={formik.handleChange}
                        error={formik.touched.diagnostico && Boolean(formik.errors.diagnostico)}
                        helperText={formik.touched.diagnostico && formik.errors.diagnostico}
                        />
                    <Button type="submit" 
                        variant="contained" 
                        color="primary" fullWidth>
                            imprimir
                    </Button>  
            </form>
        </React.Fragment>
    )
}

export default NewConsulta
