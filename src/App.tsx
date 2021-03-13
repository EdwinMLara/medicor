import React, { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import Drawer from './components/drawer';
import LoginM from './components/LoginM';

const arrayAdmin : Array<string> = ['Inicio','Consultas','Pacientes','Titulares','Medicos','Usuarios'];
// const arrayMedico : Array<string> = ['Inicio','Consultas','Pacientes'];
// const arrayFarmacia : Array<string> = ['Recetas','Medicamentos','Reportes'];

export interface LoggedContex  {
  islogged : boolean,
  setislogged : ((prevState: any) => any)
}

export const loggedDefaultContext: LoggedContex = {
  islogged : false,
  setislogged : ((prevState: boolean) => boolean)
}
export const IsLoggedContext = React.createContext<LoggedContex>(loggedDefaultContext);

function App() {
  const [islogged , setislogged] = useState(false);

  return (
    <div className="App">
      <IsLoggedContext.Provider value={{islogged,setislogged}}>
        <Drawer menu={arrayAdmin}/>
        {!islogged ? <LoginM/> : null}
      </IsLoggedContext.Provider>
    </div>
  );
}

export default App;
