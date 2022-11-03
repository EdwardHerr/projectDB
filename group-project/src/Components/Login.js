import React from 'react';

export default function Login() {
  return (
    <div className='container login'>
      <h1>Welcome back!</h1>
      <form>
        <div className='mb-3'>
          <label for='username' className='form-label'>
            Username
          </label>
          <input type='text' className='form-control' id='username' aria-describedby='emailHelp' />
        </div>
        <div className='mb-3'>
          <label for='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='exampleInputPassword1' />
        </div>
        <div className='d-sm-flex justify-content-sm-center align-items-center'>
          <p className='text-center lead px-4 gap-3'>
            Don't have an account? Register <a href='#'>here</a>
          </p>
          <button type='submit' className='btn btn-primary btn-lg px-4 gap-3'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
