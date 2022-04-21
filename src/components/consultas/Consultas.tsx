import React, {useState} from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';


import {InputAdornment, TextField,TablePagination } from "@material-ui/core";

import {useStyles,StyledTableCell} from '../styles/tablesStayles'
import SearchIcon from '@material-ui/icons/Search';

import {RootReducerType} from '../redux/rootReducer';

import {useSelector} from 'react-redux';
import RecetaTable from './RecetaTable'

import {ConsultaValues} from '../redux/consultas/consultasTypes'
import useRequestConsultas from "./useRequestconsultas";

function Consultas(props: any){
    //const {history} = props
    const classes = useStyles();

    const [searchName, setSearchName] = useState('');
    const [page,setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);


    const handleSearchOnChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) : void =>{
        setSearchName(event.target.value);
    }

    const handleChangePage = (e : unknown , newPage:number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value,10));
        setPage(0);
    }

    const {count,consultas} = useSelector((state : RootReducerType)  => state.stateConsultas);

    useRequestConsultas(searchName,page,rowsPerPage);
    return (
        <React.Fragment>
            <h1>Consultas</h1>
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
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell/>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>Sintomas</StyledTableCell>
                        <StyledTableCell>Diagnosticos</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        consultas.map((consulta : ConsultaValues,index : number) =>{
                            return(
                                <RecetaTable key={index} consulta={consulta} index={index}/>
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

export default Consultas
