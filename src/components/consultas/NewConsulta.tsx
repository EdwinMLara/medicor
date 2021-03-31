import {Formik,Form,FieldArray} from 'formik'
import { Button, TextField} from "@material-ui/core"
import React from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';
import MedicamentosC from '../Medicamentos.js/MedicamentosC';

export interface MedicamentosValues{
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
                    <Formik
                        initialValues={initialValuesConsultaMedicamentos}
                        validationSchema={validationSchemaConsultaMedicamentos}
                        onSubmit={(values : any) => {
                            let elemet = document.createElement('div');
                            ReactDOM.render(<Receta {...values}/>, elemet);
                            window.open("", "Receta", "width=520,height=650")?.document.body.appendChild(elemet);
                         }
                        }
                    >

                    {formik =>{
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
                                    render={(...arrayHelpers: any) => <MedicamentosC {...arrayHelpers}/>}/>
                                <Button type="submit" 
                                    variant="contained" 
                                    color="primary" fullWidth>
                                        imprimir
                                </Button>  
                            </Form>
                        )
                    }}
                    
                </Formik>
        </React.Fragment>
    )
}

export default NewConsulta
