import { React, useRef } from 'react';
import axios from 'axios';

import ToastMessage from './ToastMessage';

import { useMessageContext } from '../context/MessageContext';

export default function Register() {
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { message, setMessage, success, setSuccess, showToast, setShowToast } = useMessageContext();

  const register = async (data) => {
    axios
      .post('register', data)
      .then(function (res) {
        setMessage(res.data);
        setSuccess(true);
        setShowToast(true);

        setTimeout(() => (window.location.href = '/login'), 1500);
      })
      .catch(function (err) {
        if (err.response) {
          setMessage(err.response.data.error);
          setSuccess(false);
          setShowToast(true);
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      inputEmail: emailRef.current.value,
      inputPassword: passwordRef.current.value,
      confirmPassword: passwordRef.current.value,
    };
    register(userData);
  };

  const renderToast = () => {
    if (message && typeof success !== 'undefined' && showToast && setShowToast) {
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
    <div className='container register'>
      <h1>Register</h1>
      <h1>{message}</h1>
      <form className='g-2' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
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
          <div className='name-forms col row'>
            <div className='mb-3 col-md'>
              <label htmlFor='firstName' className='form-label'>
                First Name
              </label>
              <input
                type='text'
                className='form-control'
                id='firstName'
                aria-describedby='firstNameHelp'
                ref={firstNameRef}
              />
            </div>
            <div className='mb-3 col-md'>
              <label htmlFor='lastName' className='form-label'>
                Last Name
              </label>
              <input
                type='text'
                className='form-control'
                id='lastName'
                aria-describedby='lastNameHelp'
                ref={lastNameRef}
              />
            </div>
          </div>
          <label htmlFor='inputEmail' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='inputEmail'
            aria-describedby='emailHelp'
            ref={emailRef}
          />
          <div id='emailHelp' className='form-text col-md'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='password-forms row'>
          <div className='mb-3 col-md'>
            <label htmlFor='inputPassword' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='inputPassword' ref={passwordRef} />
          </div>
          <div className='mb-3 col-md'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              ref={confirmPasswordRef}
            />
          </div>
        </div>
        <div className='d-grid gap-2 d-sm-flex justify-content-sm-center'>
          <button type='submit' className='btn btn-primary btn-lg px-4'>
            Submit
          </button>
          <a href='/' className='btn btn-outline-secondary btn-lg px-4'>
            Back
          </a>
        </div>
      </form>
      {renderToast()}
    </div>
  );
}
