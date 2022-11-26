import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useUserContext } from '../context/UserContext';

export default function Orders() {
  const { user } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      axios
        .get('orders/', { params: { userId: user.id } })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    if (user) {
      fetchOrders();
    }
    setLoading(false);
  }, [user]);

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
                  <th scope='col'>Order #</th>
                  <th scope='col'>Order Date</th>
                  <th scope='col'>Address</th>
                  <th scope='col'>Total</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              {orders.map((item, key) => (
                <tbody key={key}>
                  <tr>
                    <td>{item.orderId}</td>
                    <td>{new Date(item.orderDate).toDateString()}</td>
                    <td>{item.address}</td>
                    <td>${item.total}</td>
                    <td>
                      <Link
                        to={'/orders/' + item.orderId}
                        className='btn btn-primary'
                        params={{ orderId: item.orderId }}
                      >
                        See order
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
