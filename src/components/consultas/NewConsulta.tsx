import {useFormik} from 'formik'
import { Button, TextField,Grid, MenuItem, makeStyles } from "@material-ui/core"
import React, { useState } from 'react';
import * as yup from 'yup';

import axios from "axios";
import Receta from '../pdf/Receta';
import ReactDOM from 'react-dom';

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    paddingButton: {
        padding: '15px'
    }
}));

interface MedicamentosValues{
    cantidad : number,
    nombre: string,
    prescirpcion: string
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

const validationSchemaConsulta = yup.object({
    paciente: yup.object({
        sintomas: yup.string().required("Agregar sintomas del paciente"),
        diagnostico: yup.string().required("Agregar diagnostico")
    })
});

function NewConsulta(props : any) {
    const {paciente} = props.location;
    console.log(paciente);

    const classes = useStyles();

    const initialValuesConsulta : ConsultaMedicamentos = {
        paciente :  {
            idPaciente:paciente._id,
            sintomas:'',
            diagnostico:''
        },
        receta:[]
    }   

    console.log(initialValuesConsulta);

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
            console.log(values);
            /*let stringValues = values.paciente;
            for(let key in stringValues){
                stringValues[key] = stringValues[key].trim();
            }
            values.paciente = stringValues;
            console.log(values);
            let elemet = document.createElement('div');
            ReactDOM.render(<Receta {...values}/>, elemet);
            window.open("", "Receta", "width=520,height=650")?.document.body.appendChild(elemet);
            sendPostRequest(values);*/
        }
    });

    const [cantidadM,SetCantidadM] = useState(1);

    const handleChangeCantidadM = (e :  React.ChangeEvent<HTMLInputElement>) =>{
        SetCantidadM(parseInt(e.target.value));
    }
    return (
        <React.Fragment>
            <h1>Nueva Consulta</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
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
                                value={formik.values.paciente?.sintomas}
                                onChange={formik.handleChange}
                                error={formik.touched.paciente?.sintomas && Boolean(formik.errors.paciente?.sintomas)}
                                helperText={formik.touched.paciente?.sintomas && formik.errors.paciente?.sintomas}
                            />  
                            <TextField fullWidth
                                id="diagnostico" 
                                label="Diagnostico" 
                                name="diagnostico" 
                                value={formik.values.paciente?.diagnostico}
                                onChange={formik.handleChange}
                                error={formik.touched.paciente?.diagnostico && Boolean(formik.errors.paciente?.diagnostico)}
                                helperText={formik.touched.paciente?.diagnostico && formik.errors.paciente?.diagnostico}
                                />

                            <Grid container>
                                <Grid item xs={12} sm={7}>
                                    <TextField fullWidth
                                        id="medicamento" 
                                        label="medicamento" 
                                        name="medicamento" 
                                    />
                                </Grid>
                                <Grid item xs={8} sm={3}>
                                    <TextField
                                        id="cantidad"
                                        select
                                        label="Cantidad"
                                        name="cantidad"
                                        value={cantidadM}
                                        onChange={handleChangeCantidadM}
                                        helperText="Selecciona la cantidad de medicamentos"
                                        >
                                        {[1,2,3,4,5].map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4} sm={2} className={classes.paddingButton}>
                                    <Button type="button" variant="contained" size="small">
                                            <AddIcon/>  
                                    </Button>
                                </Grid>
                            </Grid>
                            <Button type="submit" 
                                variant="contained" 
                                color="primary" fullWidth>
                                    imprimir
                            </Button>  
                    </form>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <h2>Receta</h2>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default NewConsulta
