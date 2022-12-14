import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';
import { useMessageContext } from '../context/MessageContext';

import ToastMessage from './ToastMessage';

export default function Menu() {
  const { user, addToCart, loading, setLoading } = useUserContext();
  const { message, success, showToast, setShowToast } = useMessageContext();
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    axios.get('/menu').then((res) => {
      setItems([...res.data]);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const handleAddToCartClick = async (event) => {
    const item = {
      productId: event.target.id,
      quantity: 1,
    };

    addToCart(item);
  };

  const isLoggedIn = (user) => {
    if (user) {
      return (
        <div className='row'>
          {items.map((item, key) => (
            <div className='col-sm-4 mb-5' key={key}>
              <div className='card h-100 text-center'>
                <div className='card-header '>
                  <h3 className='card-title'>{item.name}</h3>
                </div>
                <div className='card-body'>
                  <p className='card-text description p-2'>{item.description}</p>
                  <p className='card-text text-end me-5'>{item.listPrice}</p>
                </div>
                <div className='card-footer bg-transparent'>
                  <div className='row'></div>
                  <Link
                    className='mx-3'
                    to={'/menu/' + item.id}
                    id={item.id}
                    params={{ id: item.id }}
                  >
                    Details
                  </Link>
                  <button
                    className='btn btn-primary mx-3'
                    id={item.id}
                    onClick={handleAddToCartClick}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <p className='text-center'>You must be logged in to see the menu.</p>;
    }
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
    <div className='container'>
      {loading ? <h1 className='text-center'>Loading...</h1> : isLoggedIn(user)}
      {renderToast()}
    </div>
  );
}
