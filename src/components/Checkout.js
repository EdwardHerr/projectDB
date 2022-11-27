import React from 'react';
import { IMaskInput } from 'react-imask';

export default function Checkout({ user, creditCardRef, expirationRef, securityRef }) {
  const CreditCardMask = '0000 0000 0000 0000';
  const ExpiryMask = '00/00';
  const SecurityCodeMask = '0000';

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
              />
            </div>
            <div className='row'>
              <div className='col-md mb-3'>
                <label htmlFor='cc-number'>Credit card number</label>
                <IMaskInput
                  mask={CreditCardMask}
                  type='text'
                  className='form-control'
                  id='cc-number'
                  required
                  ref={creditCardRef}
                  onAccept={(value, mask) => {
                    creditCardRef.current.value = mask.unmaskedValue;
                  }}
                />
                <div className='invalid-feedback'>Credit card number is required</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label htmlFor='cc-expiration'>Expiration (MM/YY)</label>
                <IMaskInput
                  mask={ExpiryMask}
                  type='text'
                  pattern='[0-9]*'
                  inputMode='numeric'
                  className='form-control'
                  id='expiration'
                  required
                  ref={expirationRef}
                  onAccept={(value, mask) => {
                    expirationRef.current.value = mask.unmaskedValue;
                  }}
                />
                <div className='invalid-feedback'>Expiration date required</div>
              </div>
              <div className='col-md-6 mb-3'>
                <label htmlFor='cc-expiration'>Security Code</label>
                <IMaskInput
                  mask={SecurityCodeMask}
                  type='text'
                  className='form-control'
                  id='security'
                  required
                  ref={securityRef}
                  onAccept={(value, mask) => {
                    securityRef.current.value = mask.unmaskedValue;
                  }}
                />
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
