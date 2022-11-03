import React from 'react';

export default function Register() {
  return (
    <div className='container register'>
      <h1>Register</h1>
      <form className='g-2'>
        <div class='mb-3'>
          <div class='mb-3'>
            <label for='username' class='form-label'>
              Username
            </label>
            <input type='text' class='form-control' id='username' aria-describedby='usernameHelp' />
          </div>
          <div className='name-forms col row'>
            <div class='mb-3 col-md'>
              <label for='firstName' class='form-label'>
                First Name
              </label>
              <input
                type='text'
                class='form-control'
                id='firstName'
                aria-describedby='firstNameHelp'
              />
            </div>
            <div class='mb-3 col-md'>
              <label for='lastName' class='form-label'>
                Last Name
              </label>
              <input
                type='text'
                class='form-control'
                id='lastName'
                aria-describedby='lastNameHelp'
              />
            </div>
          </div>
          <label for='inputEmail' class='form-label'>
            Email address
          </label>
          <input type='email' class='form-control' id='inputEmail' aria-describedby='emailHelp' />
          <div id='emailHelp' class='form-text col-md'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='password-forms row'>
          <div class='mb-3 col-md'>
            <label for='inputPassword' class='form-label'>
              Password
            </label>
            <input type='password' class='form-control' id='inputPassword' />
          </div>
          <div class='mb-3 col-md'>
            <label for='confirmPassword' class='form-label'>
              Confirm Password
            </label>
            <input type='password' class='form-control' id='confirmPassword' />
          </div>
        </div>
        <button type='submit' class='btn btn-primary btn-lg px-4'>
          Submit
        </button>
      </form>
    </div>
  );
}
