import React, { useRef, useState } from 'react';
import axios from 'axios';

import { useUserContext } from '../context/UserContext';

export default function Preferences() {
  const { user } = useUserContext();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  const [message, setMessage] = useState('');

  const updateUser = async (userData) => {
    return axios
      .post('/user/' + user.id, userData)
      .then((res) => {
        setMessage(res.data)
      })
      .catch((err) => {
        console.log(err)
        setMessage(err.response.data.error)
        
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      inputPassword: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      inputEmail: emailRef.current.value,
      address: addressRef.current.value,
    };
    console.log(userData)
    updateUser(userData);
  };

  return (
    <div className='px-4 py-5 my-5 text-center'>
      <h1 className='display-5 fw-bold'>Preferences</h1>
      <h1>{message}</h1>
      <div className='container text-start'>
        <form action='' className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-12'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input
              ref={usernameRef}
              type='text'
              className='form-control'
              id='username'
              defaultValue={user?.username}
              readOnly
              disabled
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='firstName' className='form-label'>
              First Name
            </label>
            <input
              ref={firstNameRef}
              type='text'
              name='firstName'
              id='firstName'
              className='form-control'
              defaultValue={user?.firstName}
            />
            <div className='valid-feedback'>Looks good!</div>
          </div>
          <div className='col-md-6'>
            <label htmlFor='lastName' className='form-label'>
              Last Name
            </label>
            <input
              ref={lastNameRef}
              type='text'
              name='lastName'
              id='lastName'
              className='form-control'
              defaultValue={user?.lastName}
            />
            <div className='valid-feedback'>Looks good!</div>
          </div>
          <div className='col-md-12'>
            <label htmlFor='inputEmail' className='form-label'>
              Email
            </label>
            <input
              ref={emailRef}
              type='email'
              className='form-control'
              id='inputEmail'
              defaultValue={user?.email}
            />
            <div className='invalid-feedback'>Enter a valid e-mail</div>
          </div>
          <div className='col-md-12'>
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <input
              ref={addressRef}
              type='text'
              className='form-control'
              id='address'
              defaultValue={user?.address}
            />
          </div>
          <div className='col-md-12'>
            <label htmlFor='inputPassword' className='form-label'>
              Password
            </label>
            <input ref={passwordRef} type='password' className='form-control' id='inputPassword' />
          </div>
          <div className='col-md-12'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input
              ref={confirmPasswordRef}
              type='password'
              className='form-control'
              id='confirmPassword'
            />
          </div>
          <div className='col-12'>
            <a href='#' className='mx-3'>
              Cancel
            </a>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
