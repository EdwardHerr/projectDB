import './styles/App.css';
import { React } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// Context
import { UserContextProvider } from './context/UserContext';
// Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import Cart from './components/Cart';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';
import Preferences from './components/Preferences';

function App() {
  return (
    <div className='App'>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:id' element={<MenuItem />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/orders/:id' element={<OrderDetails />} />
          <Route path='/preferences' element={<Preferences />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
