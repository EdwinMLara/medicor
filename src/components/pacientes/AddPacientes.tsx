import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import React, { useState } from "react"

import {useFormik} from 'formik'
import * as yup from 'yup';

import Alert from '@material-ui/lab/Alert';
import axios from "axios";

import {makeStyles} from '@material-ui/core/styles';

type Talla = 'ch' | 'md' | 'gr';

interface PacienteFormValues{
    nombre: String,
    edad: number,
    talla: Talla,
    peso: number,
    alergias: String
}

const initialValuesPaciente : PacienteFormValues ={
    nombre: '',
    edad: 1,
    talla: 'ch',
    peso: 0,
    alergias: 'Ninguna'
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

const useStyles = makeStyles((theme) => ({
    marginTextGrid: {
      marginBottom: theme.spacing(1),
    },
}));

function AddPacientes() : JSX.Element {
    const classes = useStyles();

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
                //sendPostReques(values);
            }          
        });

    return (
        <React.Fragment>
            {addPacienteStatus.status ? <Alert variant="filled" severity={addPacienteStatus.severity}>
                    {addPacienteStatus.status === 1 ? "Se ha agregado correctamente" : "Error al Agregar"}
            </Alert> : null}
            <h1>Agregar Paciente</h1>
            <form  onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField className={classes.marginTextGrid} fullWidth
                        id="nombre" 
                        label="Nombre del Paciente" 
                        name="nombre" 
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                    />
                    <Grid className={classes.marginTextGrid} container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth
                                id="edad" 
                                label="Edad" 
                                name="edad" 
                                value={formik.values.edad}
                                onChange={formik.handleChange}
                                error={formik.touched.edad && Boolean(formik.errors.edad)}
                                helperText={formik.touched.edad && formik.errors.edad}
                                />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth
                                id="peso" 
                                label="Peso" 
                                name="peso" 
                                value={formik.values.peso}
                                onChange={formik.handleChange}
                                error={formik.touched.peso && Boolean(formik.errors.peso)}
                                helperText={formik.touched.peso && formik.errors.peso}
                                />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <FormControl>
                                <InputLabel id="talla-label">Talla</InputLabel>
                                <Select
                                id="talla"
                                label="Talla2"
                                name="talla"
                                value={formik.values.talla}
                                onChange={formik.handleChange}
                                >
                                <MenuItem value={'ch'}>ch</MenuItem>
                                <MenuItem value={'md'}>md</MenuItem>
                                <MenuItem value={'gr'}>gr</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>  
                    
                    <TextField className={classes.marginTextGrid} fullWidth
                            id="alergias" 
                            label="Alergias" 
                            name="alergias" 
                            value={formik.values.alergias}
                            onChange={formik.handleChange}
                            error={formik.touched.alergias && Boolean(formik.errors.alergias)}
                            helperText={formik.touched.alergias && formik.errors.alergias}
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
