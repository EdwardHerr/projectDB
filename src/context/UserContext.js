import { React, useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, cart }}>{children}</UserContext.Provider>;
}
