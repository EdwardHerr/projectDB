import { React, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import './styles/App.css';
import Orders from './components/Orders';
import Preferences from './components/Preferences';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  
  useEffect(() => {
    axios.get('session').then(res => setLoggedIn(res.data.login))
  }, [loggedIn])
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home loggedIn={loggedIn}/>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/menu',
      element: <Menu loggedIn={loggedIn} />,
    },
    {
      path: '/orders',
      element: <Orders />,
    },
    {
      path: '/preferences',
      element: <Preferences />,
    },
  ]);

  return (
    <div className='App'>
      <Navbar loggedIn={loggedIn} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
