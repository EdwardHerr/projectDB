import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import { useMessageContext } from '../context/MessageContext';

import Checkout from './Checkout';
import ToastMessage from './ToastMessage';

export default function Cart() {
  const { user, cart, setCart, loading } = useUserContext();
  const { message, setMessage, success, setSuccess, showToast, setShowToast } = useMessageContext();
  const [menuItems, setMenuItems] = useState([]);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const creditCardRef = useRef(null);
  const expirationRef = useRef(null);
  const securityRef = useRef(null);

  useEffect(() => {
    const fetchMenuItem = async (item) => {
      return axios.get('/menu/' + item.productId);
    };

    const fetchAllMenuItems = async (cart) => {
      return Promise.all(
        cart.map((item) => {
          return fetchMenuItem(item);
        })
      );
    };
    if (cart) {
      fetchAllMenuItems(cart)
        .then((res) => {
          setMenuItems([...res.map((item) => item.data)]);
        })
        .catch((err) => {
          setMessage('An error occurred');
          setSuccess(false);
          setShowToast(true);
        });
    }
  }, [cart]);

  const handleDecrement = (e) => {
    e.preventDefault();
    console.log(cart[e.target.id]);
    setCart((prev) => {
      const newCart = [...prev];
      if (newCart[e.target.id].quantity > 0) {
        newCart[e.target.id].quantity -= 1;
      }
      return newCart;
    });
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    setCart((prev) => {
      const newCart = [...prev];
      newCart[e.target.id].quantity += 1;
      return newCart;
    });
  };

  const handleUpdate = async (e) => {
    if (cart && cart.length > 0) {
      axios
        .post('/session/update', cart)
        .then((res) => {
          console.log(res.data);
          setCart(() => res.data);
          setMessage('Cart Updated!');
          setSuccess(true);
          setShowToast(true);
        })
        .catch((err) => {
          setMessage(err.response.data.error);
          setSuccess(false);
          setShowToast(true);
        });
      console.log(cart);
    }
  };

  const validateCreditCard = () => {
    var regEx = [
      /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
      /^3[47][0-9]{13}$/,
      /^4[0-9]{12}(?:[0-9]{3})?$/,
      /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
      /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/,
      /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
      /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      /[0-9]{12}/, //just 12 numbers
    ];
    const creditCard =
      creditCardRef.current.value && regEx.some((regex) => regex.test(creditCardRef.current.value));
    const expiration = expirationRef.current.value && expirationRef.current.value.length === 4;
    const security =
      securityRef.current.value &&
      (securityRef.current.value.length === 3 || securityRef.current.value.length === 4);
    const firstName = firstNameRef.current.value >= 1
    const lastName = lastNameRef.current.value >= 1
    const address = addressRef.current.value.length >= 1
    

    return creditCard && expiration && security && firstName && lastName && address;
  };

  const emptyCart = async (e) => {
    const data = [];
    axios.post('/session/update', data).then((res) => {
      console.log(res.data);
      setCart(() => res.data);
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (validateCreditCard()) {
      const data = {
        userId: user.id,
        orderDate: new Date().toISOString().split('T')[0],
        products: cart,
      };
      axios
        .post('orders/', data)
        .then((res) => {
          emptyCart();
          setMessage('Order Placed!');
          setSuccess(true);
          setShowToast(true);
        })
        .catch((err) => {
          setMessage(err.error.data);
          setSuccess(false);
          setShowToast(true);
        });
    } else {
      setMessage('Invalid Credit Card');
      setSuccess(false);
      setShowToast(true);
    }
  };

  const renderToast = () => {
    if (message && typeof success !== 'undefined' && showToast && setShowToast) {
      return (
        <ToastMessage
          showToast={showToast}
          setShowToast={setShowToast}
          success={success}
          message={message}
        />
      );
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='px-4 py-5 my-5 '>
          <h1 className='display-5 fw-bold text-center'>Shopping Cart</h1>
          <div className='mx-auto my-5 row d-flex justify-content-center align-items-start'>
            <div className='col-lg-6'>
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
                {cart && cart.length > 0 ? (
                  menuItems.map((item, key) => {
                    return (
                      <tbody key={key}>
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.listPrice}</td>
                          <td>
                            <form className='qty col input-group'>
                              <button
                                className='btn btn-outline-secondary'
                                onClick={handleDecrement}
                                id={key}
                              >
                                -
                              </button>
                              <input
                                type='text'
                                className='form-control'
                                id={key}
                                value={(cart && cart[key] && cart[key].quantity) || 0}
                                disabled
                                readOnly
                              />
                              <button
                                className='btn btn-outline-secondary'
                                onClick={handleIncrement}
                                id={key}
                              >
                                +
                              </button>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
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
            </div>
            {cart && cart.length > 0 && (
              <div className='col-lg-6'>
                <Checkout
                  user={user}
                  firstNameRef={firstNameRef}
                  lastNameRef={lastNameRef}
                  addressRef={addressRef}
                  creditCardRef={creditCardRef}
                  expirationRef={expirationRef}
                  securityRef={securityRef}
                />
              </div>
            )}
            <div className='d-grid d-md-flex mx-auto my-5 gap-3 justify-content-end'>
              <Link to='/menu'>Continue Shopping</Link>
              {cart && cart.length > 0 && (
                <>
                  <button className='btn btn-outline-secondary' onClick={handleUpdate}>
                    Update Cart
                  </button>
                  <button className='btn btn-primary' type='submit' onClick={placeOrder}>
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {renderToast()}
    </div>
  );
}
