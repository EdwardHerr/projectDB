import { React, useState } from 'react';
import axios from 'axios'

export default function Register() {
  
  const [userData, setUserData] = useState([])
  
  const handleChange = (event) => {
    const name = event.target.id 
    const value = event.target.value
    setUserData(values => ({
      ...values, [name]: value
    }))
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(userData)
    axios.post('register', userData).then(function(res) {
      console.log(res.data)
    })
  }
  
  return (
    <div className='container register'>
      <h1>Register</h1>
      <form className='g-2' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input type='text' className='form-control' id='username' aria-describedby='usernameHelp' onChange={handleChange}/>
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
          </div>
          <label htmlFor='inputEmail' className='form-label'>
            Email address
          </label>
          <input type='email' className='form-control' id='inputEmail' aria-describedby='emailHelp' onChange={handleChange}/>
          <div id='emailHelp' className='form-text col-md'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='password-forms row'>
          <div className='mb-3 col-md'>
            <label htmlFor='inputPassword' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='inputPassword' onChange={handleChange}/>
          </div>
          <div className='mb-3 col-md'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirm Password
            </label>
            <input type='password' className='form-control' id='confirmPassword' onChange={handleChange}/>
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
    </div>
  );
}
