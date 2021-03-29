import {Formik,Form,Field, FieldArray} from 'formik'
import { Button, TextField,Grid, makeStyles } from "@material-ui/core"
import React from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
    paddingButton: {
        padding: '15px'
    }
}));

interface MedicamentosValues{
    cantidad : number,
    nombre: string,
    prescripcion: string
}

interface ConsultaValues{
    [idPaciente :string] : string,
    sintomas: string,
    diagnostico: string
}

interface ConsultaMedicamentos{
    paciente: ConsultaValues,
    receta:MedicamentosValues[]
}

const validationSchemaConsultaMedicamentos = yup.object({
    paciente: yup.object({
        sintomas: yup.string().required("Agregar sintomas del paciente"),
        diagnostico: yup.string().required("Agregar diagnostico")
    })
});

function NewConsulta(props : any) {
    const {paciente} = props.location;

    const initialValuesReceta : MedicamentosValues = {
        cantidad:0,
        nombre:'',
        prescripcion:''
    }

    const initialValuesConsulta : ConsultaValues = {   
        idPaciente:paciente._id,
        sintomas:'',
        diagnostico:''
    }

    const initialValuesConsultaMedicamentos : ConsultaMedicamentos = {
        paciente : initialValuesConsulta ,
        receta:[initialValuesReceta]
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

    return (
        <React.Fragment>
            <h1>Nueva Consulta</h1>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
                    <Formik
                        initialValues={initialValuesConsultaMedicamentos}
                        validationSchema={validationSchemaConsultaMedicamentos}
                        onSubmit={(values : any) => {
                            console.log('Form data', values)
                         }
                        }
                    >

                    {formik =>{
                        console.log(formik);
                        return (
                            <Form onSubmit={formik.handleSubmit}>
                                <TextField disabled fullWidth
                                    id="nombre" 
                                    label="Nombre del Paciente" 
                                    name="nombre" 
                                    value={paciente.nombre}
                                />
                                <TextField fullWidth
                                    id="sintomas" 
                                    label="Sintomas del Paciente" 
                                    name="paciente.sintomas"
                                    value={formik.values.paciente.sintomas}
                                    onChange={formik.handleChange}
                                    error={formik.touched.paciente?.sintomas && Boolean(formik.errors.paciente?.sintomas)}
                                    helperText={formik.touched.paciente?.sintomas && formik.errors.paciente?.sintomas}/>  
                                <TextField fullWidth
                                    id="diagnostico" 
                                    label="Diagnostico" 
                                    name="paciente.diagnostico"
                                    value={formik.values.paciente.diagnostico}
                                    onChange={formik.handleChange}
                                    error={formik.touched.paciente?.diagnostico && Boolean(formik.errors.paciente?.diagnostico)}
                                    helperText={formik.touched.paciente?.diagnostico && formik.errors.paciente?.diagnostico}
                                />

                                <FieldArray
                                    name="receta"
                                    render={
                                        (arrayHelpers:any) =>{
                                            const {push,remove,form} = arrayHelpers;
                                            const {values} = form;
                                            const {receta} = values;
                                            console.log(arrayHelpers);
                                            return ({
                                                receta.map((medicamento : MedicamentosValues,index : number) =>{
                                                    return(<div key={index}>{medicamento.nombre}</div>)
                                                })
                                            })
                                        }}
                                />

                                <Button type="submit" 
                                    variant="contained" 
                                    color="primary" fullWidth>
                                        imprimir
                                </Button>  
                            </Form>
                        )
                    }}
                    
                </Formik>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h2>Receta</h2>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default NewConsulta
