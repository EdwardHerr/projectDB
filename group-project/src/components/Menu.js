import React from 'react';

export default function Menu({ loggedIn }) {
  return (
    <div>
      {loggedIn ? (
        <div className='container'>
          <div class='card mb-5'>
            <div class='card-body row'>
              <div className='col'>This is some text within a card body.</div>
              <div className='col'>$11.99</div>
              <div className='col'>Add to Cart</div>
            </div>
          </div>
          <div class='card mb-5'>
            <div class='card-body row'>
              <div className='col'>This is some text within a card body.</div>
              <div className='col'>$11.99</div>
              <div className='col'>Add to Cart</div>
            </div>
          </div>
          <div class='card mb-5'>
            <div class='card-body row'>
              <div className='col'>This is some text within a card body.</div>
              <div className='col'>$11.99</div>
              <div className='col'>Add to Cart</div>
            </div>
          </div>
        </div>
        
        
      ) : (
        <p className='text-center'>You must be logged in to see the menu.</p>
      )}
    </div>
  );
}
