import {Formik,Form,FieldArray} from 'formik'
import { Button, Grid, TextField} from "@material-ui/core"
import React from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';
import MedicamentosC from '../Medicamentos.js/MedicamentosC';

import {useSelector} from 'react-redux'
import {RootReducerType} from '../redux/rootReducer';
import {MedicamentosValues,ConsultaValues} from '../redux/consultas/consultasTypes'

const validationSchemaConsultaMedicamentos = yup.object({
    sintomas: yup.string().required("Agregar sintomas del paciente"),
    diagnostico: yup.string().required("Agregar diagnostico"),
    receta:yup.array()
        .of(
            yup.object().shape({
                cantidad : yup.number().min(0,"cantidad invalida"),
                nombre: yup.string().required("Agregar nombre de medicamento"),
                prescripcion: yup.string().required("Agregar prescripcion")
        })
    )
});

function NewConsulta() {

    const paciente = useSelector((state : RootReducerType) => state.statePacients.currentPacient)

    const initialValuesReceta : MedicamentosValues = {
        cantidad:0,
        nombre:'',
        prescripcion:''
    }

    const initialValuesConsultaMedicamentos : ConsultaValues = {
        idPaciente: paciente._id,
        sintomas:'',
        diagnostico:'' ,
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
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={(values : any) => {
                            let elemet = document.createElement('div');
                            ReactDOM.render(<Receta {...values}/>, elemet);
                            window.open("", "Receta", "width=520,height=650")?.document.body.appendChild(elemet);
                            console.log(values);
                            sendPostRequest(values)
                         }
                        }
                    >

                    {formik =>{
                        return (
                            <Grid container>
                            <Grid item xs={12} sm={9}>
                            <Form onSubmit={formik.handleSubmit} autoComplete="off">
                                <TextField disabled fullWidth
                                    id="nombre" 
                                    label="Nombre del Paciente" 
                                    name="nombre" 
                                    value={paciente.nombre}
                                />
                                <TextField disabled fullWidth
                                    id="nombre" 
                                    label="Enfermedades Crónicas" 
                                    name="nombre" 
                                    value={paciente.enfermedadesCronicas}
                                />
                                <TextField fullWidth
                                    id="sintomas" 
                                    label="Sintomas del Paciente" 
                                    name="sintomas"
                                    value={formik.values.sintomas}
                                    onChange={formik.handleChange}
                                    error={formik.touched?.sintomas && Boolean(formik.errors?.sintomas)}
                                    helperText={formik.touched?.sintomas && formik.errors?.sintomas}/>  
                                <TextField fullWidth
                                    id="diagnostico" 
                                    label="Diagnostico" 
                                    name="diagnostico"
                                    value={formik.values.diagnostico}
                                    onChange={formik.handleChange}
                                    error={formik.touched?.diagnostico && Boolean(formik.errors?.diagnostico)}
                                    helperText={formik.touched?.diagnostico && formik.errors?.diagnostico}
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
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img style={{display:'block',marginLeft:'auto',marginRight:'auto', marginTop:'20px'}} alt="aux_image" src={paciente.imageb64}/>
                                <div>
                                    <h2>Historial</h2>
                                </div>
                            </Grid>
                            </Grid>
                        )
                    }}
                    
                </Formik>
        </React.Fragment>
    )
}

export default NewConsulta
