import React from 'react';

export default function Preferences() {
  return (
    <div className='px-4 py-5 my-5 text-center'>
      <h1 className='display-5 fw-bold'>Preferences</h1>
      <div className='container text-center'>
        <div className='row'>
          <div className='col'>Name</div>
          <div className='col'>John Doe</div>
        </div>
        <div className='row'>
          <div className='col'>Userame</div>
          <div className='col'>john.doe</div>
        </div>
        <div className='row'>
          <div className='col'>E-Mail</div>
          <div className='col'>john.doe@email.com</div>
        </div>
        <div className='row'>
          <div className='col'>Change Password</div>
          <div className='col'>John Doe</div>
        </div>
        <div className='row'>
          <div className='col'>Address</div>
          <div className='col'>123 Main St, Surrey, BC</div>
        </div>
        <div className='row'>
          <div className='col'>Payment Information</div>
          <div className='col'>Visa</div>
        </div>
      </div>
    </div>
  );
}
