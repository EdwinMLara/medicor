import React, { useState } from "react"

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, InputAdornment, TablePagination, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
    containerBotton:{
        display: 'flex',
        marginBottom : "10px",
    },
    search:{
        marginRight:'10px'
    },
    grow:{
        flexGrow: 1
    }
});

interface Paciente {
    id_paciente : number,
    nombre : String,
    edad : number
}

export interface PacientesValues {
    pacientes: Paciente[]
}

const defaultPacientesTest : PacientesValues = {
    pacientes : [{id_paciente:1,nombre:'Edwin Miguel Lara Espinoza', edad : 28},
                {id_paciente:2,nombre:'Diana Melina Lara Espinoza',edad:23},
                {id_paciente:3,nombre:'Juan Enrique Lara Espinoza',edad:31},
                {id_paciente:4,nombre:'Hilda Espinoza Moreno',edad:50},
                {id_paciente:5,nombre:'Juan Enrique Lara Gutierrez',edad:54}]
}

function Pacientes() {
    const [statePacientes, setstatePacientes] = useState<PacientesValues>(defaultPacientesTest);
    const classes = useStyles();
    const [page,setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    const handleChangePage = (e : unknown , newPage:number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value,10));
        setPage(0);
    }

    return (
        <React.Fragment>
            <h1>Pacientes</h1>
            <div className={classes.containerBotton}>
                <div className={classes.grow}></div> 
                <TextField
                    className={classes.search}
                    id="search"
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
                    size="large">
                       Agregar
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell align="right">Edad</StyledTableCell>
                        <StyledTableCell align="right">Acciones</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        statePacientes.pacientes.map((paciente) =>{
                            const {id_paciente,nombre,edad} = paciente;
                            return(
                                <StyledTableRow key={id_paciente}>
                                    <StyledTableCell align="left">{nombre}</StyledTableCell>
                                    <StyledTableCell align="right">{edad}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button style={{marginRight:"5px"}} variant="contained" color="primary" size="small">
                                            Consulta
                                        </Button>
                                        <Button variant="contained" color="secondary" size="small">
                                            Historial
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={(statePacientes.pacientes.length > 10) ? [5, 10, 25] : [5]}
                component="div"
                count={statePacientes.pacientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </React.Fragment>
    )
}

export default Pacientes
