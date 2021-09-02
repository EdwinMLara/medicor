import React, {useState} from "react"
import ReactDOM from 'react-dom';
import {StyledTableRow,StyledTableCell} from '../styles/tablesStayles'
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

import Receta from '../pdf/Receta';

function RecetaTable(props : any) {
    const {paciente,sintomas,diagnostico,receta} = props.consulta;
    
    const [collapseReceta,setCollapseReceta] = useState(false);
    
    const handlePrint = (consulta:any) =>{
      let elemet = document.createElement('div');
      ReactDOM.render(<Receta {...consulta}/>, elemet);
      window.open("", "Receta", "width=520,height=650")?.document.body.appendChild(elemet);
    }
    return (
        <React.Fragment>
            <StyledTableRow key={props.index}>
                <StyledTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setCollapseReceta(!collapseReceta)}>
                        {collapseReceta ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>                              
                <StyledTableCell align="left">{paciente[0].nombre}</StyledTableCell>
                <StyledTableCell align="left">{sintomas}</StyledTableCell>
                <StyledTableCell align="left">{diagnostico}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={collapseReceta} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Box margin={1} display="flex" flexDirection="row">
                <Box width="100%">
                  <Typography variant="h6" gutterBottom>
                    Receta
                  </Typography>
                </Box>
                <Box flexShrink={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e : any)=>{
                      handlePrint(props.consulta);    
                    }}>
                      Imprimir
                  </Button>
                </Box>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Prescripcion</TableCell>                  </TableRow>
                </TableHead>
                <TableBody>
                  {receta.map((value : any,index: number) => (
                    <TableRow key={index}>
                      <TableCell>{value.cantidad}</TableCell>
                      <TableCell>{value.nombre}</TableCell>
                      <TableCell>{value.prescripcion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
          </TableCell>
                  </StyledTableRow>
        </React.Fragment>
    )
}

export default RecetaTable
