import { React } from 'react';
import axios from 'axios';

import { useUserContext } from '../context/UserContext';

export default function Navbar() {
  const { user } = useUserContext();

  const logout = async () => {
    axios.get('logout').then((window.location.href = '/'));
  };

  const handleClick = () => {
    logout();
  };

  const isLoggedIn = (user) => {
    if (!user) {
      return (
        <li className='nav-item'>
          <a className='nav-link' aria-current='page' href='/login'>
            Login
          </a>
        </li>
      );
    } else {
      return (
        <>
          <li className='nav-item'>
            <a className='nav-link' href='/cart'>
              My Cart
            </a>
          </li>
          <li className='nav-item dropdown'>
            <a
              className='nav-link dropdown-toggle'
              href='#'
              role='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              My Account
            </a>
            <ul className='dropdown-menu'>
              <li>
                <a className='dropdown-item' href='/orders'>
                  Past Orders
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/preferences'>
                  Preferences
                </a>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <button className='dropdown-item' onClick={handleClick}>
                  Log Out
                </button>
              </li>
            </ul>
          </li>
        </>
      );
    }
  };

  return (
    <div className='mb-5'>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            <img
               src='https://cdn-icons-png.flaticon.com/512/590/590897.png'
               width = "40"
               height = "40"
            />
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/'>
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='/menu'>
                  Menu
                </a>
              </li>
              {isLoggedIn(user)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
