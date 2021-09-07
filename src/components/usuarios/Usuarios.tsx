import { Paper, TableContainer,Table, 
    TableHead, TableRow, Button, 
    InputAdornment, TextField } from '@material-ui/core'
import React from 'react'
import { StyledTableCell, useStyles } from '../styles/tablesStayles'
import SearchIcon from '@material-ui/icons/Search';

function Usuarios(props : any) {
    const { history } = props;

    const classes = useStyles();
    return (
        <React.Fragment>
            <h1>Usuarios</h1>
            <div className={classes.containerBotton}>
                <div className={classes.grow}></div> 
                <TextField
                    className={classes.search}
                    id="search"
                    name="search"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                />           
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    onClick={() => history.push("/addUsuario")}>
                       Agregar
                </Button>
            </div>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell/>
                            <StyledTableCell>Nombre de Usuario</StyledTableCell>
                            <StyledTableCell>Contraseña</StyledTableCell>
                            <StyledTableCell>Nombre</StyledTableCell>
                            <StyledTableCell>Tipo de Cuenta</StyledTableCell>
                            <StyledTableCell>Cedula</StyledTableCell>
                        </TableRow>
                    </TableHead>

                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Usuarios
