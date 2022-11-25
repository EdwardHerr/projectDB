import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';

export default function Cart() {
  // const { user } = useUserContext();
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDecrement = (e) => {
    e.preventDefault();
    setCart((prev) => {
      return prev.map((item) => {
        if (item.productId === e.target.id) {
          return { ...item, quantity: item.quantity - 1 >= 0 ? item.quantity - 1 : 0 };
        }
        return item;
      });
    });
  };
  const handleIncrement = (e) => {
    e.preventDefault();
    setCart((prev) => {
      return prev.map((item) => {
        if (item.productId === e.target.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      axios
        .get('session/')
        .then((res) => {
          setCart(res.data.cart);
        })
        .catch((err) => console.log(err));
    };
    setLoading(true);
    fetchOrders();

    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchMenuItem = async (item) => {
      return axios.get('menu/' + item.productId);
    };

    const fetchAllMenuItems = async (cart) => {
      return Promise.all(
        cart.map((item) => {
          return fetchMenuItem(item);
        })
      );
    };

    fetchAllMenuItems(cart).then((res) => {
      setItems([...res.map((item) => item.data)]);
    });
  }, [cart]);

  const handleUpdate = async () => {
    axios.post('session/update', cart).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  };

  return (
    <div className='container'>
      <div className='px-4 py-5 my-5 text-center'>
        <h1 className='display-5 fw-bold'>My Cart</h1>
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
              {cart ? (
                items.map((item, key) => (
                  <tbody key={key}>
                    <tr>
                      <td>{cart[key].productId}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.listPrice}</td>
                      <td>
                        <form className='qty col input-group'>
                          <button
                            className='btn btn-outline-secondary'
                            onClick={handleDecrement}
                            id={String(cart[key].productId)}
                          >
                            -
                          </button>

                          <input
                            type='text'
                            className='form-control'
                            id='quantity'
                            value={cart[key].quantity}
                            disabled
                            readOnly
                          />
                          <button
                            className='btn btn-outline-secondary'
                            onClick={handleIncrement}
                            id={String(cart[key].productId)}
                          >
                            +
                          </button>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td className='text-center' colSpan={5}>
                      Cart is empty
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          )}
        </div>
        <div className='col-lg-12 d-grid d-md-flex mx-auto my-5 gap-3 justify-content-end'>
          <Link to='/menu'>Continue Shopping</Link>
          <button className='btn btn-outline-secondary' onClick={handleUpdate}>
            Update
          </button>
          <Link to='/checkout' className='btn btn-primary'>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
