import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyOrder from './screens/MyOrder';
import Admin from './screens/Admin';

function App() {
  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/createuser' element={<SignUp/>} />
        <Route exact path='/myorder' element={<MyOrder/>} />
        <Route exact path='/admin' element={<Admin/>} />
      </Routes>
    </>
    </BrowserRouter>
  );
}

export default App;

// Cart is not created in this because its displayed on the home screen its not screen