import { React, useEffect, useState } from 'react';
import axios from 'axios';

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

  const handleDetailsClick = (event) => {
    console.log('Details: ' + event.target.id);
  };
  const handleAddToCartClick = (event) => {
    console.log('Add to cart: ' + event.target.id);
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
                  <a
                    className='mx-3'
                    href={'/menu/' + item.id}
                    id={item.id}
                    onClick={handleDetailsClick}
                  >
                    Details
                  </a>
                  <a
                    className='btn btn-primary mx-3'
                    id={item.id}
                    href='#'
                    onClick={handleAddToCartClick}
                  >
                    Add to Cart
                  </a>
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
