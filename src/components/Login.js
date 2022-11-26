import { React, useRef } from 'react';
import axios from 'axios';

import ToastMessage from './ToastMessage';

import { useMessageContext } from '../context/MessageContext';

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { message, setMessage, success, setSuccess, showToast, setShowToast } = useMessageContext();

  const login = async (data) => {
    axios
      .post('login', data)
      .then(function (res) {
        setMessage(res.data);
        setSuccess(true);
        setShowToast(true);

        setTimeout(() => (window.location.href = '/'), 1500);
      })
      .catch(function (err) {
        setMessage(err.response.data.error);
        setShowToast(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginInfo = {
      username: usernameRef.current.value,
      inputPassword: passwordRef.current.value,
    };
    login(loginInfo);
  };

  const renderToast = () => {
    if (message && success && showToast && setShowToast) {
      return (
        <ToastMessage
          showToast={showToast}
          setShowToast={setShowToast}
          success={success}
          message={message}
        />
      );
    }
  };

  return (
    <div className='container login'>
      <h1>Welcome back!</h1>
      <form className='g-2' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label for='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='username'
            aria-describedby='usernameHelp'
            ref={usernameRef}
          />
        </div>
        <div className='mb-3'>
          <label for='inputPassword' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='inputPassword' ref={passwordRef} />
        </div>
        <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
          <p className='text-center lead px-4 gap-3'>
            Don't have an account? Register <a href='/register'>here.</a>
          </p>
          <button type='submit' className='btn btn-primary btn-lg px-4 gap-3'>
            Login
          </button>
        </div>
      </form>
      {renderToast()}
    </div>
  );
}
