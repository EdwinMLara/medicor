import React, { useState} from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { Button, InputAdornment, 
    TablePagination, TextField } from "@material-ui/core";

import { withRouter } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';

import {updateCurrentPacient} from '../redux/pacientes/PacientesActios'

import {useSelector,useDispatch} from 'react-redux'
import {RootReducerType} from '../redux/rootReducer';

import useRequestPacients from './useRequestPacients'

import {useStyles,StyledTableRow,StyledTableCell} from '../styles/tablesStayles'


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

    const {count,pacients} = useSelector((state : RootReducerType) => state.statePacients)
    const dispatch = useDispatch()

    const [searchName, setSearchName] = useState('');
    
    useRequestPacients(searchName,page,rowsPerPage);

    const handleSearchOnChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) : void =>{
        setSearchName(event.target.value);
    }
    return (
        <React.Fragment>
            <h1>Pacientes</h1>
            <div className={classes.containerBotton}>
                <div className={classes.grow}></div> 
                <TextField
                    className={classes.search}
                    id="search"
                    name="search"
                    value={searchName}
                    onChange={handleSearchOnChange}
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
                        pacients.map((paciente : any,index : number) =>{
                            const {nombre,edad} = paciente;
                            
                            return(
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left">{nombre}</StyledTableCell>
                                    <StyledTableCell align="right">{edad}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button style={{marginRight:"5px"}} 
                                            variant="contained" 
                                            color="secondary" 
                                            size="small"
                                            onClick={() => {
                                                dispatch(updateCurrentPacient(paciente))
                                                history.push({
                                                pathname:'/newconsulta',
                                                paciente});
                                            }}>
                                            Consulta
                                        </Button>
                                        {/*<Button variant="contained" 
                                            color="secondary" 
                                            size="small">
                                            Historial
                                        </Button>*/}
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={(count > 5) ? [5, 10, 25] : [5]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
        </React.Fragment>
    )
}

export default withRouter(Pacientes)
