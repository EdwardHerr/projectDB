import React from 'react';

export default function Checkout({ user, creditCardRef }) {
  const renderCheckout = () => {
    if (user) {
      return (
        <>
          <form className='form-control text-start'>
            <div className='mb-3'>
              <div className='name-forms col row'>
                <div className='mb-3 col-md-6'>
                  <label htmlFor='firstName' className='form-label'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='firstName'
                    aria-describedby='firstNameHelp'
                    defaultValue={user.firstName}
                    readOnly
                    disabled
                    // ref={firstNameRef}
                  />
                </div>
                <div className='mb-3 col-md-6'>
                  <label htmlFor='lastName' className='form-label'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='lastName'
                    aria-describedby='lastNameHelp'
                    defaultValue={user.lastName}
                    readOnly
                    disabled
                    // ref={lastNameRef}
                  />
                </div>
              </div>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                aria-describedby='addressHelp'
                defaultValue={user.address}
                readOnly
                disabled
                // ref={emailRef}
              />
            </div>
            <div className='row'>
              <div className='col-md mb-3'>
                <label htmlFor='cc-number'>Credit card number</label>
                <input
                  type='text'
                  className='form-control'
                  id='cc-number'
                  placeholder=''
                  required
                  ref={creditCardRef}
                />
                <div className='invalid-feedback'>Credit card number is required</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='cc-expiration'>Expiration</label>
                <input
                  type='text'
                  className='form-control'
                  id='cc-expiration'
                  placeholder=''
                  required
                />
                <div className='invalid-feedback'>Expiration date required</div>
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='cc-expiration'>CVV</label>
                <input type='text' className='form-control' id='cc-cvv' placeholder='' required />
                <div className='invalid-feedback'>Security code required</div>
              </div>
            </div>
          </form>
        </>
      );
    }
  };

  return renderCheckout();
}
