import { React, useState } from 'react';
import axios from 'axios';

export default function MenuItem({ id }) {
  const [menuItem, setMenuItem] = useState();

  const fetchData = async () => {
    axios.get('products/' + id).then((res) => {
      setMenuItem(res.data);
    });
  };

  return (
    <div className='col-sm-4 mb-5'>
      <h1>hello</h1>
    </div>
  );
}
