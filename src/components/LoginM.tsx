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
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        }
    }),
);

function LoginM() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Iniciar Sessión"
                subheader="Uriangato Gto" />

            <CardContent>
                <form className={classes.root} noValidate autoComplete="off">
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
