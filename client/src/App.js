import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
import { Cinflex, Login, Signup } from './pages';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route exact path='/' Component={Cinflex}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact  path='/signup' Component={Signup}/>
       </Routes>
       
       </BrowserRouter>
    </div>
  );
}

export default App;
