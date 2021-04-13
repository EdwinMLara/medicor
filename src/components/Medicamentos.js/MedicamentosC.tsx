import { Fragment } from "react";

import  {MedicamentosValues} from '../consultas/NewConsulta'
import { Button, TextField,Grid,makeStyles } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paddingButtongrid: {
        padding: '15px',
        display:'flex'
    },
    marginbutton:{
        marginRight: theme.spacing(2)
    }
}));

function MedicamentosC(props : any) {
    const classes = useStyles();
    console.log(props[0])
    const {push,remove,form} = props[0];
    const {values,errors,touched} = form;
    const {receta} = values;
    return (
        <Fragment>
            {
                receta.map((medicamento : MedicamentosValues,index : number)=>{
                
                    return (
                        <Grid key={index} container>
                            <Grid item xs={12} sm={2}>
                                <TextField  fullWidth
                                        id={`receta[${index}].nombre`} 
                                        label="Medicamento" 
                                        name={`receta[${index}].nombre`}  
                                        value={receta[index].nombre}
                                        onChange={form.handleChange}
                                        error={(errors?.receta && touched?.receta) ? (errors.receta[index] !== undefined ) ? true : false : false}
                                        helperText={(errors?.receta && touched?.receta) ? (errors.receta[index] !== undefined ) ? errors.receta[index].nombre : null : null}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <TextField  fullWidth
                                        id={`receta[${index}].cantidad`} 
                                        label="Cant" 
                                        name={`receta[${index}].cantidad`}  
                                        value={receta[index].cantidad}
                                        onChange={form.handleChange}
                                        error={(errors?.receta && touched?.receta) ? (errors.receta[index] !== undefined ) ? true : false : false}
                                    />
                            </Grid>
                            <Grid item xs={8} sm={5}>
                                <TextField  fullWidth
                                    id={`receta[${index}].prescripcion`} 
                                    label="Prescipcion" 
                                    name={`receta[${index}].prescripcion`}
                                    value={receta[index].prescripcion}
                                    onChange={form.handleChange}
                                    error={(errors?.receta && touched?.receta) ? (errors.receta[index] !== undefined ) ? true : false : false}
                                    helperText={(errors?.receta && touched?.receta) ? (errors.receta[index] !== undefined ) ? errors.receta[index].prescripcion : null : null}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} className={classes.paddingButtongrid}>
                                {index === (receta.length - 1) ? 
                                <Button className={classes.marginbutton} type="button" onClick={()=>push({cantidad:0,nombre:'',prescripcion:''})} variant="contained" size="small">
                                        <AddIcon/>  
                                </Button>
                               : null}
                                <Button type="button" onClick={() =>remove(index)} variant="contained" size="small">
                                        <DeleteIcon/>  
                                </Button>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Fragment>
    )
}

export default MedicamentosC
