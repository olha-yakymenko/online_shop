import React, { useState, useEffect, useCallback, useMemo } from 'react';
import all_product from '../Assets/all_product';
import product_availability from '../Assets/availibility';
import './Admin.css';

const saveProductsToServer = async (products) => {
  try {
    const response = await fetch('http://localhost:5055/save-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Produkty zostały zapisane na serwerze:', data);
  } catch (error) {
    console.error('Błąd podczas zapisywania produktów:', error);
  }
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const mergedProducts = useMemo(() => {
    return all_product.map(product => {
      const availability = product_availability.find(avail => avail.id === product.id);
      return {
        ...product,
        isAvailable: availability ? availability.isAvailable : false, 
        popular: availability ? availability.popular : false, 
        new: availability ? availability.new : false
      };
    });
  }, []);

  useEffect(() => {
    setProducts(mergedProducts);
  }, [mergedProducts]);

  const toggleAvailability = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(product =>
        product.id === id
          ? { ...product, isAvailable: !product.isAvailable }
          : product
      );
      saveProductsToServer(updatedProducts);
      return updatedProducts;
    });
  }, []);

  const togglePopularity = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(product =>
        product.id === id
          ? { ...product, popular: !product.popular }
          : product
      );
      saveProductsToServer(updatedProducts);
      return updatedProducts;
    });
  }, []);

  const toggleNew = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map(product =>
        product.id === id
          ? { ...product, new: !product.new }
          : product
      );
      saveProductsToServer(updatedProducts);
      return updatedProducts;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(product => product.id !== id);
      saveProductsToServer(updatedProducts);
      return updatedProducts;
    });
  }, []);

  return (
    <div>
      <h1>Panel administratora - Zarządzanie produktami</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Status dostępności</th>
            <th>Popularność</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.isAvailable ? 'Dostępny' : 'Niedostępny'}</td>
              <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
              <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
              <td>
                <button onClick={() => toggleAvailability(product.id)} >
                  {product.isAvailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
                </button>
                <button onClick={() => togglePopularity(product.id)} style={{ color: 'white' }}>
                  {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
                </button>
                <button onClick={() => toggleNew(product.id)} style={{ color: 'white' }}>
                  {product.new ? 'Zmien (nie nowy)' : 'Oznacz jako nowy'}
                </button>
                <button onClick={() => deleteProduct(product.id)} style={{ color: 'white' }}>
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;


