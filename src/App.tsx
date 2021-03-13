import React, { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import Drawer from './components/drawer';
import LoginM from './components/LoginM';

import { Route, Switch } from "react-router-dom";
import Consultas from './components/Consultas';

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
        <Drawer/>
        {!islogged ? <LoginM/> : null}
        <Switch>
        <Route exact from string ="/" render={props => <Consultas {...props} />} />
        <Route exact path="/contact" render={props => <Contact {...props} />} />
        <Route exact path="/about" render={props => <About {...props} />} />
      </Switch>
      </IsLoggedContext.Provider>
    </div>
  );
}

export default App;
