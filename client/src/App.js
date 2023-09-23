import './App.css';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PrivateIn from './components/PrivateIn';
import PrivateOut from './components/PrivateOut';

import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateIn />}>
          <Route path='/home' element={<Home/>} />
        </Route>
        <Route element={<PrivateOut />}>
          <Route path='/' element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
