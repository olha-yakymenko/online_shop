import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Admin.css';
import { ProductContext } from '../../Context/ProductContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { all_product, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    setProducts(all_product);
  }, [all_product]);

  const saveProductToServer = async (product, key) => {
  const updatedValue = product[key] ? true : false;  
  const wys = { id: product.id, [key]: updatedValue };  
  console.log('Wysyłam na serwer:', wys);

  try {
    const response = await fetch('http://localhost:5055/save-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wys),
    });

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Produkt został zapisany na serwerze:', data);
  } catch (error) {
    console.error('Błąd podczas zapisywania produktu:', error);
  }
};


  const toggleAvailability = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isavailable: !product.isavailable }  // Zmieniamy stan dostępności (poprawna nazwa: 'isavailable')
          : product
      );

      const updatedProduct = updatedProducts.find((product) => product.id === id);
      saveProductToServer(updatedProduct, 'isavailable');  // Wysyłamy zaktualizowaną wartość

      return updatedProducts;
    });
  }, [fetchProducts]);

  const togglePopularity = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, popular: !product.popular }  
          : product
      );

      const updatedProduct = updatedProducts.find((product) => product.id === id);
      saveProductToServer(updatedProduct, 'popular');  

      return updatedProducts;
    });
  }, [fetchProducts]);

  const toggleNew = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, new: !product.new }  
          : product
      );

      const updatedProduct = updatedProducts.find((product) => product.id === id);
      saveProductToServer(updatedProduct, 'new');  

      return updatedProducts;
    });
  }, [fetchProducts]);

  return (
    <div>
      <h1>Panel administratora - Zarządzanie produktami</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Status dostępności</th>
            <th>Rozmiary</th>
            <th>Popularność</th>
            <th>Nowość</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {console.log(products)}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.isavailable ? 'Dostępny' : 'Niedostępny'}</td>
              <td>{product.filters?.sizes?.map((item) => item)}</td>
              <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
              <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
              <td>
                <button onClick={() => toggleAvailability(product.id)}>
                  {product.isavailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
                </button>
                <button onClick={() => togglePopularity(product.id)} style={{ color: 'white' }}>
                  {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
                </button>
                <button onClick={() => toggleNew(product.id)} style={{ color: 'white' }}>
                  {product.new ? 'Zmień na nie nowy' : 'Oznacz jako nowy'}
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
