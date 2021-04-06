import Drawer from './components/drawer';
import LoginM from './components/LoginM';

import {useSelector} from 'react-redux'
import {RootReducerType} from './components/redux/rootReducer';


/*export interface LoggedContex  {
  islogged : boolean,
  setislogged : ((prevState: any) => any)
}

export const loggedDefaultContext: LoggedContex = {
  islogged : false,
  setislogged : ((prevState: boolean) => boolean)
}
export const IsLoggedContext = React.createContext<LoggedContex>(loggedDefaultContext);*/

function App() {
  const islogged = useSelector((state : RootReducerType) => state.loggin.statusLoggin);

  return (
    
      <div className="App">
          <Drawer/>
          {!islogged ? <LoginM/> : null}
      </div>
    
  );
}

export default App;
