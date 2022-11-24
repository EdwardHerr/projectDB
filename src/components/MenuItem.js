import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

export default function MenuItem() {
  const [menuItem, setMenuItem] = useState({});
  const [qty, setQty] = useState(1);
  const itemId = useParams();

  const fetchData = async () => {
    axios
      .get('/menu/' + itemId.id)
      .then((res) => {
        setMenuItem(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container col-sm-4 mb-5'>
      <h1>{menuItem.name}</h1>
      <p>{menuItem.description}</p>
      <p>{menuItem.listPrice}</p>
      <div className='row'>
        <div className='qty col input-group'>
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
          <input type='text' className='form-control' value={qty} disabled readOnly />
          <button className='btn btn-outline-secondary' onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>
        <a href='#' className='col-9 btn btn-primary'>
          Add to Cart
        </a>
      </div>
    </div>
  );
}
