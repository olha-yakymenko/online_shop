import React, { useState, useEffect } from 'react';
import all_product from '../Assets/all_product';
import product_availability from '../Assets/availibility';
import './Admin.css';

const saveProductsToServer = (products) => {
  fetch('http://localhost:5055/save-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Produkty zostały zapisane na serwerze:', data);
    })
    .catch((error) => {
      console.error('Błąd podczas zapisywania produktów:', error);
    });
};

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mergedProducts = all_product.map(product => {
      const availability = product_availability.find(avail => avail.id === product.id);
      return {
        ...product,
        isAvailable: availability ? availability.isAvailable : false, 
        popular: product.popular || false, 
      };
    });

    setProducts(mergedProducts);
  }, []);

  const toggleAvailability = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, isAvailable: !product.isAvailable }
        : product
    );
    setProducts(updatedProducts);
    saveProductsToServer(updatedProducts);
  };

  const togglePopularity = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, popular: !product.popular }
        : product
    );
    setProducts(updatedProducts);
    saveProductsToServer(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    saveProductsToServer(updatedProducts);
  };

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
              <td>
                <button onClick={() => toggleAvailability(product.id)}>
                  {product.isAvailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
                </button>
                <button onClick={() => togglePopularity(product.id)} style={{ marginLeft: '10px' }}>
                  {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
                </button>
                <button onClick={() => deleteProduct(product.id)} style={{ marginLeft: '10px' }}>
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
