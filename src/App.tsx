import Drawer from './components/drawer';
import LoginM from './components/LoginM';

import {useSelector} from 'react-redux'
import {RootReducerType} from './components/redux/rootReducer';

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
