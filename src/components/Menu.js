import { React, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

export default function Menu({ loggedIn }) {
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

  return (
    <div>
      {loggedIn ? (
        <div className='container'>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
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
          )}
        </div>
      ) : (
        <p className='text-center'>You must be logged in to see the menu.</p>
      )}
    </div>
  );
}
