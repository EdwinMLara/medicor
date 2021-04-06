import { useContext } from 'react'
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
        }
    }),
);

interface LoginValues {
    username : string,
    password : string
}

const initialValues : LoginValues = {
    username : '',
    password : ''
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
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
            onSubmit: (values) => {
                console.log(values);
                dispatch(statusLogginConnected());
            }
    });

    return (
        <Card className={classes.root}>
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
