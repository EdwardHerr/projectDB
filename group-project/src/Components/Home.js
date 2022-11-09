import React from 'react';

export default function Home() {
  return (
    <div className='px-4 py-5 my-5 text-center'>
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
