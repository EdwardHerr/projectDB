import React from 'react';

import { useUserContext } from '../context/UserContext';

export default function Home() {
  const { user } = useUserContext();

  const isLoggedIn = (user) => {
    if (user) {
      return (
        <div className='col-lg-6 mx-auto'>
          <h1>Welcome back {user.firstName}!</h1>
        </div>
      );
    } else {
      return (
        <div className='col-lg-6 mx-auto'>
          <p className='lead mb-4'>
            ITALIAN GENEROSITY IS ALWAYS ON THE TABLE. At House of Pasta, 
            we know that life is better together and everyone is happiest when they’re
            with family. From our freshly delivered pasta cravings, there’s something for everyone to enjoy.
          </p>
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
            <a href='/login' className='btn btn-primary btn-lg px-4 gap-3'>
              Login
            </a>
            <a href='/register' className='btn btn-outline-secondary btn-lg px-4'>
              Register
            </a>
          </div>
        </div>
      );
    }
  };

  return (
    <div className='px-4 py-5 my-5 text-center'>
      <img
        src='https://info.ehl.edu/hubfs/Blog-EHL-Insights/Blog-Header-EHL-Insights/pasta.jpeg'
        className='col-lg-6 mb-5'
      />
      <h1 className='display-5 fw-bold'>House of Pasta</h1>
      {isLoggedIn(user)}
    </div>
  );
}
