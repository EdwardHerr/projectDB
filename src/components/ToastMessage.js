import React from 'react';

import { Toast, Button } from 'react-bootstrap';

export default function ToastMessage({ showToast, setShowToast, success, message }) {
  if (success) {
    return (
      <div className=''>
        <Toast
          className='position-fixed bottom-0 end-0 p-3 align-items-center text-bg-primary border-0'
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <div className='d-flex'>
            <Toast.Body>{message}</Toast.Body>
            <Button
              className='btn-close btn-close-white me-2 m-auto'
              onClick={() => setShowToast(false)}
            />
          </div>
        </Toast>
      </div>
    );
  } else {
    return (
      <div className=''>
        <Toast
          className='position-fixed bottom-0 end-0 p-3 align-items-center text-bg-danger border-0'
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <div className='d-flex'>
            <Toast.Body>{message}</Toast.Body>
            <Button
              className='btn-close btn-close-white me-2 m-auto'
              onClick={() => setShowToast(false)}
            />
          </div>
        </Toast>
      </div>
    );
  }
}
