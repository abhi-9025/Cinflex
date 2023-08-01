import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
import { Cinflex, Login, Player, Signup } from './pages';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route exact path='/' Component={Cinflex}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact  path='/signup' Component={Signup}/>
        <Route exact path='player' Component={Player}/>
       </Routes>
       
       </BrowserRouter>
    </div>
  );
}

export default App;
