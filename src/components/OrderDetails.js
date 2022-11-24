import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';

export default function OrdersDetails() {
  const { user } = useUserContext();
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const orderId = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      axios
        .get('orders/', { params: { userId: user.id, orderId: orderId.id } })
        .then((res) => {
          setOrderItems(res.data);
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    if (user) {
      fetchOrders();
    }
    setLoading(false);
  }, [orderId.id, user]);

  return (
    <div className='container'>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-5 fw-bold'>Past Orders</h1>
        <div className='col-lg-12 mx-auto my-5'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <table className='table text-start'>
              <thead>
                <tr>
                  <th scope='col'>Item ID</th>
                  <th scope='col'>Item Name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              {orderItems.map((item, key) => (
                <tbody key={key}>
                  <tr>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.description}</td>
                    <td>{item.listPrice}</td>
                    <td>{item.quantity}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
        <Link to='/orders'>Back to orders</Link>
      </div>
    </div>
  );
}
