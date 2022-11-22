import React from 'react';

export default function Home({ loggedIn, user }) {
  if (loggedIn) {
    return (
      <div className='px-4 py-5 my-5 text-center'>
        <img
          src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          className='col-lg-6 mb-5'
        />
        <h1 className='display-5 fw-bold'>E-Commerce Website</h1>
        <div className='col-lg-6 mx-auto'>
          <h1>Welcome back {user.firstName}!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className='px-4 py-5 my-5 text-center'>
        <img
          src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          className='col-lg-6 mb-5'
        />
        <h1 className='display-5 fw-bold'>E-Commerce Website</h1>
        <div className='col-lg-6 mx-auto'>
          <p className='lead mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae incidunt ipsum quis omnis
            impedit hic aliquid labore doloremque molestias laboriosam!
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
      </div>
    );
  }
}
