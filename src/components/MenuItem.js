import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import { useMessageContext } from '../context/MessageContext';

import ToastMessage from './ToastMessage';

export default function MenuItem() {
  const { addToCart } = useUserContext();
  const { message, setMessage, success, setSuccess, showToast, setShowToast } = useMessageContext();
  const [menuItem, setMenuItem] = useState({});
  const [qty, setQty] = useState(1);
  const itemId = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get('/menu/' + itemId.id)
      .then((res) => {
        setMenuItem(res.data);
      })
      .catch((err) => {
        setMessage(err.response.data.error);
        setSuccess(false);
        setShowToast(true);
      });
  };

  const handleAddToCartClick = async () => {
    const item = {
      productId: itemId.id,
      quantity: qty,
    };

    addToCart(item);
  };

  const renderToast = () => {
    if (message && success && showToast && setShowToast) {
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
    <div className='container col-sm-4 mb-5'>
      <img className='img-fluid rounded mx-auto d-block' src={menuItem.image} alt={menuItem.name} />
      <h1>{menuItem.name}</h1>
      <p>{menuItem.description}</p>
      <p>{menuItem.listPrice}</p>
      <div className='d-flex justify-content-evenly'>
        <div className=''>
          <div className='input-group' style={{ maxWidth: '150px' }}>
            <button
              className='btn btn-outline-secondary'
              onClick={() =>
                setQty((curr) => {
                  if (curr > 1) {
                    return curr - 1;
                  }
                  return curr;
                })
              }
            >
              -
            </button>
            <input type='text' className='form-control text-center' value={qty} disabled readOnly />
            <button
              className='btn btn-outline-secondary'
              onClick={() => setQty((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className=''>
          <button className='col btn btn-primary' onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
      {renderToast()}
    </div>
  );
}
