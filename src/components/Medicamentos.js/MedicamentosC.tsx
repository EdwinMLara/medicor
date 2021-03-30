import { Fragment } from "react";

import  {MedicamentosValues} from '../consultas/NewConsulta'
import { Button, TextField,Grid,makeStyles } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paddingButton: {
        padding: '15px'
    }
}));

function MedicamentosC(props : any) {
    const classes = useStyles();
    const {push,remove,form} = props[0];
    const {values} = form;
    const {receta} = values;
    return (
        <Fragment>
            {
                receta.map((medicamento : MedicamentosValues,index : number)=>{
                    return (
                        <Grid container>
                            <Grid item xs={12} sm={2}>
                                <TextField  fullWidth
                                        id={`receta[${index}].nombre`} 
                                        label="Medicamento" 
                                        name={`receta[${index}].nombre`}  
                                        value={receta[index].nombre}
                                        onChange={form.handleChange}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <TextField  fullWidth
                                        id={`receta[${index}].cantidad`} 
                                        label="Cant" 
                                        name={`receta[${index}].cantidad`}  
                                        value={receta[index].cantidad}
                                        onChange={form.handleChange}
                                    />
                            </Grid>
                            <Grid item xs={8} sm={5}>
                                <TextField  fullWidth
                                    id={`receta[${index}].prescripcion`} 
                                    label="Prescipcion" 
                                    name={`receta[${index}].prescripcion`}
                                    value={receta[index].prescripcion}
                                    onChange={form.handleChange}
                                />
                            </Grid>
                            <Grid item xs={2} sm={2} className={classes.paddingButton}>
                                <Button type="button" onClick={()=>push({cantidad:0,nombre:'',prescripcion:''})} variant="contained" size="small">
                                        <AddIcon/>  
                                </Button>
                            </Grid>
                            <Grid item xs={2} sm={2} className={classes.paddingButton}>
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
