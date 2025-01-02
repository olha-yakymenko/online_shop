import React, { useState, useEffect } from 'react';
import all_product from '../Assets/all_product';

const loadProducts = all_product;

const saveProductsToServer = (products) => {
  fetch('http://localhost:5006/save-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  })
    .then(response => response.json())
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
    setProducts(loadProducts);
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
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.isAvailable ? 'Dostępny' : 'Niedostępny'}</td>
              <td>
                <button onClick={() => toggleAvailability(product.id)}>
                  {product.isAvailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
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
