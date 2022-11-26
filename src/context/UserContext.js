import { React, useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    return axios({
      method: 'get',
      url: '/session',
      baseURL: '/',
    })
      .then((res) => {
        setUser(res.data.curr_user);
      })
      .catch((err) => console.log(err));
  };

  const fetchCart = async () => {
    axios({
      method: 'get',
      url: '/session',
      baseURL: '/',
    })
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (data) => {
    axios.post('/session', data).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchCart();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, cart, setCart, loading, setLoading, addToCart }}>
      {children}
    </UserContext.Provider>
  );
}
