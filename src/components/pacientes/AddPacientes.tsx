import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import React, { useState } from "react"

import {useFormik} from 'formik'
import * as yup from 'yup';

import Alert from '@material-ui/lab/Alert';
import axios from "axios";

import {makeStyles} from '@material-ui/core/styles';

import {defaultImage128} from '../images/defaulImage';

import {PacienteFormValues} from '../redux/pacientes/PacientesTypes'

const initialValuesPaciente : PacienteFormValues = {
    nombre: '',
    edad: 1,
    talla: 'ch',
    peso: 0,
    enfermedadesCronicas:'Ninguna',
    alergias: 'Ninguna',
    imageb64: defaultImage128
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
        let response = await axios.post('http://localhost:5000/pacientes/insert',body)
                                .then(response =>{
                                    return {res : response.data};
                                }).catch(err =>{
                                    return {err : err}
                                });
        console.log(response);   

        let statusRequest : errorAlert = {
            status : 1,
            severity: "success"
        };

        if('err' in response){
            statusRequest.status = 2;
            statusRequest.severity = "error";
        }

        setAddPacienteStatus(statusRequest);

        formik.values = initialValuesPaciente;
    }

    const formik = useFormik({
            initialValues: initialValuesPaciente ,
            validationSchema : validationSchemaPaciente,
            onSubmit:(values,ownprops) => {
                values.nombre = values.nombre.trim();
                console.log(values);
                sendPostReques(values);
                ownprops.resetForm();
            }          
        });

    return (
        <React.Fragment>
            {addPacienteStatus.status ? <Alert variant="filled" severity={addPacienteStatus.severity}>
                    {addPacienteStatus.status === 1 ? "Se ha agregado correctamente" : "Error al Agregar"}
            </Alert> : null}
            <h1>Agregar Paciente</h1>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
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
                            id="enfermedadesCronicas" 
                            label="EnfermedadesCronicas" 
                            name="enfermedadesCronicas" 
                            value={formik.values.enfermedadesCronicas}
                            onChange={formik.handleChange}
                            error={formik.touched.enfermedadesCronicas && Boolean(formik.errors.enfermedadesCronicas)}
                            helperText={formik.touched.enfermedadesCronicas && formik.errors.enfermedadesCronicas}
                            />  
                    
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
                </Grid>
                <Grid item xs={12} sm={4}>
                    <img style={{display:'block',marginLeft:'auto',marginRight:'auto', marginTop:'20px'}} alt="aux_image" src={defaultImage128}/>
                </Grid>

            </Grid>
            
        </React.Fragment>
    )
}

export default AddPacientes
