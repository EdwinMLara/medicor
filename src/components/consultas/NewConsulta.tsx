import {Formik,Form,FieldArray} from 'formik'
import { Button, TextField} from "@material-ui/core"
import React from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';
import MedicamentosC from '../Medicamentos.js/MedicamentosC';

import {useSelector} from 'react-redux'
import {RootReducerType} from '../redux/rootReducer';

export interface MedicamentosValues{
    cantidad : number,
    nombre: string,
    prescripcion: string
}
interface Consulta{
    idPaciente:String,
    sintomas:String,
    diagnostico:String,    
    receta:MedicamentosValues[]
}

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

    const paciente = useSelector((state : RootReducerType) => state.pacients.currentPacient)

    const initialValuesReceta : MedicamentosValues = {
        cantidad:0,
        nombre:'',
        prescripcion:''
    }

    const initialValuesConsultaMedicamentos : Consulta = {
        idPaciente: paciente._id,
        sintomas:'',
        diagnostico:'' ,
        receta:[initialValuesReceta]
    }   


    const sendPostRequest = async (body : Consulta) =>{
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
                            console.log(values);
                            //sendPostRequest(values)
                         }
                        }
                    >

                    {formik =>{
                        return (
                            <Form onSubmit={formik.handleSubmit} autoComplete="off">
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
                        )
                    }}
                    
                </Formik>
        </React.Fragment>
    )
}

export default NewConsulta
