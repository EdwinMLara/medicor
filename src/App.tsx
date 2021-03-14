import React, { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import Drawer from './components/drawer';
import LoginM from './components/LoginM';

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
      </IsLoggedContext.Provider>
    </div>
  );
}

export default App;
