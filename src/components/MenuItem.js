import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuItem() {
  const [menuItem, setMenuItem] = useState();

  const fetchData = async () => {
    axios.get(window.location.pathname).then((res) => {
      console.log(res.data);
      setMenuItem(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [menuItem]);

  return (
    <div className='col-sm-4 mb-5'>
      <h1>hello {window.location.pathname}</h1>
    </div>
  );
}
