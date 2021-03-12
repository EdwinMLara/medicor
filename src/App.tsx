import React from 'react';
import Drawer from './components/drawer';
import LoginM from './components/LoginM';

const arrayAdmin : Array<string> = ['Inicio','Consultas','Pacientes','Titulares','Medicos','Usuarios'];
// const arrayMedico : Array<string> = ['Inicio','Consultas','Pacientes'];
// const arrayFarmacia : Array<string> = ['Recetas','Medicamentos','Reportes'];
export const IsLoggedContext = React.createContext<boolean>(false);

function App() {
  return (
    <div className="App">
      <IsLoggedContext.Provider value={false}>
        <Drawer menu={arrayAdmin} islogged={false}/>
        <LoginM/>
      </IsLoggedContext.Provider>
    </div>
  );
}

export default App;
