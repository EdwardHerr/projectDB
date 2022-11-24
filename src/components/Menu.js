import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';

export default function Menu() {
  const { user } = useUserContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    axios.get('menu').then((res) => {
      setItems([...res.data]);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const addToCart = (data) => {
    axios.post('session', data).then((res) => {
      console.log(res);
    });
  };

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

  return (
    <div>
      <div className='container'>
        {loading ? <h1 className='text-center'>Loading...</h1> : isLoggedIn(user)}
      </div>
    </div>
  );
}
