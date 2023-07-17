import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyOrder from './screens/MyOrder';
import Protected from './screens/Admin Screen/ProtectedRouteAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<SignUp />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/admin" element={<Protected Component={Home} /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
