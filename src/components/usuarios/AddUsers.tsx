import React from 'react'
import {
    Button, FormControl, Grid,
    InputLabel, MenuItem, Select,
    TextField
} from "@material-ui/core"

import { useFormik } from 'formik'
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import { UserValues } from '../redux/usuarios/UsersTypes';

const useStyles = makeStyles((theme) => ({
    marginTextGrid: {
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: "100%",
    }
}));

const initialValuesUser: UserValues = {
    username: '',
    name: '',
    password: '',
    typeCount: 'Administrador',
    cedula: 0
}

const validationSchemaUser = yup.object({
    username:
        yup.string().strip()
            .required("El nombre de usuario es requerido"),
    nombre:
        yup.string().strip()
            .required("Nombre completo es requerido"),
    password:
        yup.string().strip()
            .required("Ingrese la contraseña por favor"),
    typeCount:
        yup.string().strip()
            .required("Se necesita un tipo de cuenta"),
    cedula: yup.number().strip()
});

function AddUsers() {

    const classes = useStyles();

    const formik = useFormik({
        initialValues: initialValuesUser,
        validationSchema: validationSchemaUser,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <React.Fragment>
            <h1>Agreagar usuario</h1>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <TextField className={classes.marginTextGrid} fullWidth
                    id="username"
                    label="Nombre de Usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField className={classes.marginTextGrid} fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <Grid className={classes.marginTextGrid} container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="password"
                            label="Contraseña"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Tipo de Cuenta</InputLabel>
                            <Select
                                id="typeCount"
                                label="Tipo de Cuenta"
                                name="typeCount"
                                value={formik.values.typeCount}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={'Administrador'}>Administrador</MenuItem>
                                <MenuItem value={'Medico'}>Medico</MenuItem>
                                <MenuItem value={'Inventario'}>Inventario</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth
                            id="cedula"
                            label="Cedula"
                            name="cedula"
                            value={formik.values.cedula}
                            onChange={formik.handleChange}
                            error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                            helperText={formik.touched.cedula && formik.errors.cedula}
                        />
                    </Grid>
                </Grid>

                <Button type="submit"
                    variant="contained"
                    color="primary" fullWidth>
                    Agregar
                </Button>
            </form>
        </React.Fragment>
    )
}

export default AddUsers
