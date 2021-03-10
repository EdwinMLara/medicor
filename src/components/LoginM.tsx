import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        }
    }),
);

function LoginM() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.header}
                title="Iniciar Sessión"
                //subheader="Uriangato Gto" 
                />

            <CardContent>
                <form noValidate autoComplete="off">
                    <TextField id="username" label="Nombre de usuario" fullWidth/>  
                    <TextField id="password" label="Contraseña" fullWidth/>  
                </form>
            </CardContent>
            <Button variant="contained" color="primary" fullWidth>
                Primary
            </Button>
        </Card>
    )
}

export default LoginM
