import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState([]);
const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5055/products');
        const data = await response.json();
        console.log(data)
        setAllProduct(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  useEffect(() => {

    fetchProducts();
  }, []); 

  return (
    <ProductContext.Provider value={{ all_product, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
