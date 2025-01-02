import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [cart, setCart] = useState([]);  

  const loginUser = (user) => {
    setUser(user); 
  };

  const logoutUser = () => {
    setUser(null); 
    setCart([]); 
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};
