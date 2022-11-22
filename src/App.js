import './styles/App.css';
import { React, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
// Components
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import Orders from './components/Orders';
import Preferences from './components/Preferences';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    return axios.get('session').then((res) => {
      setLoggedIn(res.data.login);
      setUser(res.data.curr_user);
    });
  };

  useEffect(() => {
    fetchData();
  }, [loggedIn]);

  return (
    <div className='App'>
      <Navbar loggedIn={loggedIn} user={user} />
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/menu' element={<Menu loggedIn={loggedIn} />} />
        <Route path='/menu/:id' element={<MenuItem />} />
        <Route path='/orders' element={<Orders loggedIn={loggedIn} />} />
        <Route path='/preferences' element={<Preferences loggedIn={loggedIn} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
