import React from 'react';
import Drawer from './components/drawer';
import LoginM from './components/LoginM';

const arrayAdmin : Array<string> = ['Inicio','Consultas','Pacientes','Titulares','Medicos','Usuarios'];
// const arrayMedico : Array<string> = ['Inicio','Consultas','Pacientes'];
// const arrayFarmacia : Array<string> = ['Recetas','Medicamentos','Reportes'];

function App() {
  return (
    <div className="App">
      <Drawer menu={arrayAdmin} islogged={false}/>
      <LoginM/>
    </div>
  );
}

export default App;
