import React, { useState,useEffect } from "react"

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, InputAdornment, TablePagination, TextField } from "@material-ui/core";

import { withRouter } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';

import {useSelector,useDispatch} from 'react-redux'
import {RootReducerType} from '../redux/rootReducer';
import {fetchPacientsRequest,fecthPacientsSuccess,fetchPacientsFailure} from '../redux/pacientes/PacientesActios'

import axios from 'axios';

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
    _id: String,
    nombre : String,
    edad : number,
    date : Date
}

function Pacientes(props: any) {
    const { history } = props;

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

    const statePacientes = useSelector((state : RootReducerType) => state.pacients.pacients)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPacientsRequest());
        axios.get('http://localhost:5000/pacientes')
        .then(response =>{
            const pacients = response.data;
            console.log(pacients);
            dispatch(fecthPacientsSuccess(pacients));
        })
        .catch(error => {
            dispatch(fetchPacientsFailure(error));
        });
    },[]);

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
                    size="large"
                    onClick={() => history.push("/addPacientes")}>
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
                        statePacientes.map((paciente : any,index : number) =>{
                            const {nombre,edad} = paciente;
                            
                            return(
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left">{nombre}</StyledTableCell>
                                    <StyledTableCell align="right">{edad}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button style={{marginRight:"5px"}} 
                                            variant="contained" 
                                            color="primary" 
                                            size="small"
                                            onClick={() => history.push({
                                                pathname:'/newconsulta',
                                                paciente
                                            })}>
                                            Consulta
                                        </Button>
                                        <Button variant="contained" 
                                            color="secondary" 
                                            size="small">
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
                rowsPerPageOptions={(statePacientes.length > 5) ? [5, 10, 25] : [5]}
                component="div"
                count={statePacientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </React.Fragment>
    )
}

export default withRouter(Pacientes)
