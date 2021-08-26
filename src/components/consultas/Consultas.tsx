import React, {useState,useEffect} from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';


import {InputAdornment, TablePagination, TextField } from "@material-ui/core";

import {useStyles,StyledTableCell} from '../styles/tablesStayles'
import SearchIcon from '@material-ui/icons/Search';


import {fetchConsultasRequest,fetchConsultasSuccess,fetchConsultasFailure} from '../redux/consultas/consultasActions';
import {RootReducerType} from '../redux/rootReducer';
import axios from 'axios';

import {useSelector,useDispatch} from 'react-redux';
import RecetaTable from './RecetaTable'

function Consultas(props: any){
    const {history} = props
    const classes = useStyles();

    const [searchName, setSearchName] = useState('');
    const handleSearchOnChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) : void =>{
        setSearchName(event.target.value);
    }


    const stateConsultas = useSelector((state : RootReducerType) => state.consultas.consultas);
    const dispatch = useDispatch()
    let url = 'http://localhost:5000/consultas';
    useEffect(()=>{
        dispatch(fetchConsultasRequest());
        axios.get(url)
        .then(response =>{
            const consultas = response.data;
            dispatch(fetchConsultasSuccess(consultas));
        })
        .catch(error => {
            dispatch(fetchConsultasFailure(error));
        });
    },[]);

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
                        stateConsultas.map((consulta : any,index : number) =>{
                            
                            
                            return(
                                <RecetaTable consulta={consulta} index={index}/>
                            )
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Consultas
