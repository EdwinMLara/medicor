import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {useDispatch} from 'react-redux'
import {statusLogginConnected} from './redux/loggin/logginActios';

import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            marginTop : 100,
            padding: 10,
            margin: 'auto',
        },
        header:{
            alignContent: 'center',
            backgroundColor : theme.palette.primary.main,
            color: '#FFFFFF',
            textAlign: 'center'
        },
        buttonMargin:{
            marginTop:'10px'
        },
        alert:{
            marginBottom: theme.spacing(2)
        }
    }),
);

interface LoginValues {
    username : string,
    password : string
}

interface errorLogin{
    error:boolean,
    message:string
}

const initialValues : LoginValues = {
    username : '',
    password : ''
}

const usuario : LoginValues = {
    username:'Elena',
    password: 'admin2022'
}

const validationSchema = yup.object({
    username: yup
        .string()
        .required("El usuario es requerido"),
    password: yup
        .string()
        .min(8, 'La contraseña necesita al menos 8 caracteres')
        .required("La constraseña es requerida")
  });


function LoginM() : JSX.Element {  

    const dispatch = useDispatch()
    const classes = useStyles();

    const [error,setError] = useState<errorLogin>({error:false,message:''});

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
            onSubmit: (values,ownprops) => {
                if(values.username.localeCompare(usuario.username) !== 0){
                    setError({error:true,message:'El Usuario es Incorrecto'});
                    ownprops.resetForm();
                    return
                }else if(values.password.localeCompare(usuario.password) !== 0){
                    setError({error:true,message:'El Contraseña es Incorrecta'});
                    ownprops.resetForm();
                    return
                }else{
                    dispatch(statusLogginConnected())
                }
            }
    });

    return (
        <Card className={classes.root}>
            {error.error ? 
            <Alert className={classes.alert} variant="filled" severity="error">
                {error!.message} 
            </Alert> : null}
            <CardHeader className={classes.header}
                title="Iniciar Sessión"
            />

            <CardContent>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField fullWidth
                        id="username" 
                        label="Nombre de usuario" 
                        name="username" 
                        value = {formik.values.username}
                        onChange = {formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        />  
                    <TextField fullWidth
                        id="password" 
                        label="Contraseña" 
                        name="password" 
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        />
                    <Button className={classes.buttonMargin}
                        type="submit" 
                        variant="contained" 
                        color="primary" fullWidth>
                            Iniciar Sessión
                    </Button>  
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginM
