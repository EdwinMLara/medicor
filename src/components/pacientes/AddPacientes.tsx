import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"

import {useFormik} from 'formik'
import * as yup from 'yup';

import Alert from '@material-ui/lab/Alert';
import axios from "axios";

interface PacienteFormValues{
    nombre:String,
    edad:number
}

const initialValuesPaciente : PacienteFormValues ={
    nombre: '',
    edad: 1
}

const validationSchemaPaciente = yup.object({
    nombre: yup
        .string()
        .required("El nombre del paciente es requerido")
        .min(10,"El nombre es muy corto"),
    edad: yup
        .number().positive().integer()
        .required("La edad es incorrecta")
});

type Severity = "error" | "success" | "info" | "warning" | undefined;

interface errorAlert{
    status:number,
    severity:Severity
}

function AddPacientes() : JSX.Element {
    const [addPacienteStatus,setAddPacienteStatus] = useState<errorAlert>({status:0,severity:undefined});

    const sendPostReques = async (body: PacienteFormValues) =>{
        let response = await axios.post('http://localhost:5000/pacientes/inserte',body)
                                .then(response =>{
                                    return response.data;
                                }).catch(err =>{
                                    console.log(err);
                                });
        console.log(response);   

        setAddPacienteStatus({
            status:1,
            severity: "success"
        })
    }

    const formik = useFormik({
            initialValues: initialValuesPaciente ,
            validationSchema : validationSchemaPaciente,
            onSubmit:(values) => {
                values.nombre = values.nombre.trim();
                console.log(values);
                sendPostReques(values);
            }          
        });

    return (
        <React.Fragment>
            {addPacienteStatus.status ? <Alert variant="filled" severity={addPacienteStatus.severity}>
                    {addPacienteStatus.status === 1 ? "Se ha agregado correctamente" : "Error al Agregar"}
            </Alert> : null}
            <h1>Agregar Paciente</h1>
            <form  onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField fullWidth
                        id="nombre" 
                        label="Nombre del Paciente" 
                        name="nombre" 
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />  
                    <TextField fullWidth
                        id="edad" 
                        label="Edad" 
                        name="edad" 
                        value={formik.values.edad}
                        onChange={formik.handleChange}
                        error={formik.touched.edad && Boolean(formik.errors.edad)}
                        helperText={formik.touched.edad && formik.errors.edad}
                        />
                    <Button type="submit" 
                        variant="contained" 
                        color="primary" fullWidth>
                            Agregar
                    </Button>  
                </form>
        </React.Fragment>
    )
}

export default AddPacientes
