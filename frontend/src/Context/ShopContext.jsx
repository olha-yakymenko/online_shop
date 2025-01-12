import React, { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((_, index) => {
    cart[index] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId];
      if (currentQuantity > 0) {
        return { ...prev, [itemId]: currentQuantity - 1 };
      }
      return prev;
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems)
        .reduce((totalAmount, item) => {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                
                if (itemInfo && itemInfo.new_price) {
                    return totalAmount + itemInfo.new_price * cartItems[item];
                }
            }
            return totalAmount;
        }, 0);
};


  const getTotalCartItems = () => {
    return Object.keys(cartItems)
      .reduce((totalItems, item) => {
        if (cartItems[item] > 0) {
          return totalItems + cartItems[item];
        }
        return totalItems;
      }, 0);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,  
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
