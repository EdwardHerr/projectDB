import React from 'react';

export default function Orders() {
  return (
    <div className='px-4 py-5 my-5 text-center'>
      <h1 className='display-5 fw-bold'>Past Orders</h1>
      <div className='col-lg-6 mx-auto my-5'>
        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>Order #</th>
              <th scope='col'>Address</th>
              <th scope='col'>Date</th>
              <th scope='col'>Total</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>1</th>
              <td>123 Road, Surrey, BC</td>
              <td>Oct 31, 2022</td>
              <td>$11.99</td>
              <td>
                <a href='#' className=''>
                  See order
                </a>
              </td>
            </tr>
            <tr>
              <th scope='row'>2</th>
              <td>123 Road, Surrey, BC</td>
              <td>Oct 31, 2022</td>
              <td>$11.99</td>
              <td>
                <a href='#' className=''>
                  See order
                </a>
              </td>
            </tr>
            <tr>
              <th scope='row'>3</th>
              <td>123 Road, Surrey, BC</td>
              <td>Oct 31, 2022</td>
              <td>$11.99</td>
              <td>
                <a href='#' className=''>
                  See order
                </a>
              </td>
            </tr>
            <tr>
              <th scope='row'>4</th>
              <td>123 Road, Surrey, BC</td>
              <td>Oct 31, 2022</td>
              <td>$11.99</td>
              <td>
                <a href='#' className=''>
                  See order
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
