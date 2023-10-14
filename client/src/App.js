import './App.css';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PrivateIn from './components/PrivateIn';
import PrivateOut from './components/PrivateOut';
import UpdateProfile from './components/UpdateProfile';
import Landing from './components/Landing';
import ChangePassword from './components/ChangePassword';
import Admin from './components/Admin';
import PrivateAdminIn from './components/PrivateAdminIn';
import PrivateAdminOut from './components/PrivateAdminOut';
import AdminHome from './components/AdminHome';

import { BrowserRouter , Routes , Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} /> 
        <Route element={<PrivateIn />}>
          <Route path='/home' element={<Home/>} />
          <Route path='/updateprofile' element={<UpdateProfile/>} />
          <Route path='/changepassword' element={<ChangePassword/>} />
        </Route>
        <Route element={<PrivateOut />}>
          <Route path='/login' element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Route>    
        <Route element={<PrivateAdminIn />}>
          <Route path='/adminhome' element={<AdminHome/>} />
        </Route> 
        <Route element={<PrivateAdminOut />}>
          <Route path='/admin' element={<Admin/>} />
        </Route>     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
