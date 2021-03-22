import { Button, TextField } from "@material-ui/core"
import React, { useState } from "react"

function AddPacientes() {
    const [addPaciente,setAddPaciente] = useState<boolean>(false);

    return (
        <React.Fragment>
            <h1>Agregar Paciente</h1>
            <form  autoComplete="off">
                    <TextField fullWidth
                        id="nombre" 
                        label="Nombre del Paciente" 
                        name="nombre" 
                    />  
                    <TextField fullWidth
                        id="edad" 
                        label="Edad" 
                        name="edad" 
                        />
                    <Button type="submit" 
                        variant="contained" 
                        color="primary" fullWidth>
                            Agregar
                    </Button>  
                </form>
        </React.Fragment>
    )
}

export default AddPacientes
