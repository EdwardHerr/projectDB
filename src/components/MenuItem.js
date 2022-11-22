import { React, useState } from 'react';
import axios from 'axios';

export default function MenuItem({ id }) {
  const [menuItem, setMenuItem] = useState();

  const fetchData = async () => {
    axios.get(window.location.pathname).then((res) => {
      setMenuItem(res.data);
    });
  };

  return (
    <div className='col-sm-4 mb-5'>
      <h1>hello {window.location.pathname}</h1>
    </div>
  );
}
