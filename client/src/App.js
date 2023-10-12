import './App.css';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PrivateIn from './components/PrivateIn';
import PrivateOut from './components/PrivateOut';
import UpdateProfile from './components/UpdateProfile';
import Landing from './components/Landing';

import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} /> 
        <Route element={<PrivateIn />}>
          <Route path='/home' element={<Home/>} />
          <Route path='/updateprofile' element={<UpdateProfile/>} />
        </Route>
        <Route element={<PrivateOut />}>
          <Route path='/login' element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
