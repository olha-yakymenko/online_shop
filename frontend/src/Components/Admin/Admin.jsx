// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import './Admin.css';
// import { ProductContext } from '../../Context/ProductContext';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const { all_product, fetchProducts } = useContext(ProductContext);

//   useEffect(() => {
//     setProducts(all_product);
//   }, [all_product]);

//   const saveProductToServer = async (product, key) => {
//   const updatedValue = product[key] ? true : false;  
//   const wys = { id: product.id, [key]: updatedValue };  
//   console.log('Wysyłam na serwer:', wys);

//   try {
//     const response = await fetch('http://localhost:5055/save-product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(wys),
//     });

//     if (!response.ok) {
//       throw new Error(`Błąd serwera: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log('Produkt został zapisany na serwerze:', data);
//   } catch (error) {
//     console.error('Błąd podczas zapisywania produktu:', error);
//   }
// };


//   const toggleAvailability = useCallback((id) => {
//     setProducts((prevProducts) => {
//       const updatedProducts = prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, isavailable: !product.isavailable }  // Zmieniamy stan dostępności (poprawna nazwa: 'isavailable')
//           : product
//       );

//       const updatedProduct = updatedProducts.find((product) => product.id === id);
//       saveProductToServer(updatedProduct, 'isavailable');  // Wysyłamy zaktualizowaną wartość

//       return updatedProducts;
//     });
//   }, [fetchProducts]);

//   const togglePopularity = useCallback((id) => {
//     setProducts((prevProducts) => {
//       const updatedProducts = prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, popular: !product.popular }  
//           : product
//       );

//       const updatedProduct = updatedProducts.find((product) => product.id === id);
//       saveProductToServer(updatedProduct, 'popular');  

//       return updatedProducts;
//     });
//   }, [fetchProducts]);

//   const toggleNew = useCallback((id) => {
//     setProducts((prevProducts) => {
//       const updatedProducts = prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, new: !product.new }  
//           : product
//       );

//       const updatedProduct = updatedProducts.find((product) => product.id === id);
//       saveProductToServer(updatedProduct, 'new');  

//       return updatedProducts;
//     });
//   }, [fetchProducts]);

//   return (
//     <div>
//       <h1>Panel administratora - Zarządzanie produktami</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nazwa</th>
//             <th>Status dostępności</th>
//             <th>Rozmiary</th>
//             <th>Popularność</th>
//             <th>Nowość</th>
//             <th>Akcja</th>
//           </tr>
//         </thead>
//         <tbody>
//           {console.log(products)}
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.isavailable ? 'Dostępny' : 'Niedostępny'}</td>
//               <td>{product.filters?.sizes?.map((item) => item)}</td>
//               <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
//               <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
//               <td>
//                 <button onClick={() => toggleAvailability(product.id)}>
//                   {product.isavailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
//                 </button>
//                 <button onClick={() => togglePopularity(product.id)} style={{ color: 'white' }}>
//                   {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
//                 </button>
//                 <button onClick={() => toggleNew(product.id)} style={{ color: 'white' }}>
//                   {product.new ? 'Zmień na nie nowy' : 'Oznacz jako nowy'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;




import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Admin.css';
import { ProductContext } from '../../Context/ProductContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // Przechowuje produkt, który aktualnie edytujemy
  const { all_product, fetchProducts } = useContext(ProductContext);
  const [formValues, setFormValues] = useState({
    image: null,
    sizes: [],
    colors: []  // Przechowuj plik jako obiekt
  });
  const availableColors = ["red", "blue", "green", "yellow", "black", "white"];
  const availableSizes = ["XS", "S", "M", "L", "XL"];
  
console.log(all_product)
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

  const saveEditsToServer = async () => {
    console.log(formValues)
    try {
      const response = await fetch('http://localhost:5055/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      console.log('Produkt zaktualizowany na serwerze:', updatedProduct);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      setEditProduct(null); 
      fetchProducts()
    } catch (error) {
      console.error('Błąd podczas aktualizacji produktu:', error);
    }
  };

  // const startEditing = (product) => {
  //   setEditProduct(product.id);
  //   setFormValues(product);
  // };

  const startEditing = (product) => {
    setEditProduct(product.id);
    setFormValues({
      ...product,
      sizes: product.sizes || [],
      colors: product.colors || [],
    });
  };


  const cancelEditing = () => {
    setEditProduct(null);
    setFormValues({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOptions,
    }));
  };

  const toggleAvailability = useCallback((id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isavailable: !product.isavailable }
          : product
      );

      const updatedProduct = updatedProducts.find((product) => product.id === id);
      saveProductToServer(updatedProduct, 'isavailable');

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

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Pobieramy pierwszy wybrany plik
    if (file) {
      setFormValues({
        ...formValues,
        image: file,  // Zapisujemy plik do stanu
      });
    }
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues[type]];
      if (checked) {
        updatedValues.push(value);  // Dodajemy do tablicy, jeśli zaznaczone
      } else {
        const index = updatedValues.indexOf(value);
        if (index > -1) {
          updatedValues.splice(index, 1);  // Usuwamy z tablicy, jeśli odznaczone
        }
      }
      return {
        ...prevValues,
        [type]: updatedValues,
      };
    });
  };
  

  return (
    <div>
      <h1>Panel administratora - Zarządzanie produktami</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Cena</th>
            <th>Opis</th>
            <th>Zdjęcie</th>
            <th>Status dostępności</th>
            <th>Popularność</th>
            <th>Nowość</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {console.log(products)}
          {products.map((product) => (
            <tr key={product.id}>
              {editProduct === product.id ? (
                <>
                <td>{product.id}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formValues.name || ''}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={formValues.category || ''}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={formValues.price || ''}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={formValues.description || ''}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </td>
                {/* <td>
                  <select
                    name="sizes"
                    multiple
                    value={formValues.sizes}
                    onChange={handleMultiSelectChange}
                  >
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </td> */}
                <div>
        {availableSizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              value={size}
              checked={formValues.sizes.includes(size)} // Sprawdzamy, czy rozmiar jest zaznaczony
              onChange={(e) => handleCheckboxChange(e, 'sizes')} // Obsługujemy zmianę
            />
            {size}
          </label>
        ))}
      </div>
      <div>
        {availableColors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              value={color}
              checked={formValues.colors.includes(color)} // Sprawdzamy, czy rozmiar jest zaznaczony
              onChange={(e) => handleCheckboxChange(e, 'colors')} // Obsługujemy zmianę
            />
            {color}
          </label>
        ))}
      </div>
                <td colSpan="4">
                  <button onClick={saveEditsToServer}>Zapisz</button>
                  <button onClick={cancelEditing}>Anuluj</button>
                </td>
              </>
                // <>
                //   <td>{product.id}</td>
                //   <td>
                //     <input
                //       type="text"
                //       name="name"
                //       value={formValues.name || ''}
                //       onChange={handleInputChange}
                //     />
                //   </td>
                //   <td>
                //     <input
                //       type="text"
                //       name="category"
                //       value={formValues.category || ''}
                //       onChange={handleInputChange}
                //     />
                //   </td>
                //   <td>
                //     <input
                //       type="number"
                //       name="price"
                //       value={formValues.price || ''}
                //       onChange={handleInputChange}
                //     />
                //   </td>
                //   <td>
                //     <input
                //       type="text"
                //       name="description"
                //       value={formValues.description || ''}
                //       onChange={handleInputChange}
                //     />
                //   </td>
                //   <td>
                //   <input
                //     type="file"
                //     name="image"
                //     accept="image/*"  // Opcjonalnie, możesz dodać, aby ograniczyć wybór plików do obrazów
                //     onChange={handleFileChange}
                //   />
                // </td>
                //   <td colSpan="4">
                //     <button onClick={saveEditsToServer}>Zapisz</button>
                //     <button onClick={cancelEditing}>Anuluj</button>
                //   </td>
                // </>
              ) : (
                <>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.new_price}</td>
                  <td>{product.description}</td>
                  <td>
                    <img src={product.image} alt={product.name} style={{ width: '50px' }} />
                  </td>
                  <td>{product.isavailable ? 'Dostępny' : 'Niedostępny'}</td>
                  <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
                  <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
                  <td>
                    <button onClick={() => toggleAvailability(product.id)}>
                      {product.isavailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
                    </button>
                    <button onClick={() => togglePopularity(product.id)}>
                      {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
                    </button>
                    <button onClick={() => toggleNew(product.id)}>
                      {product.new ? 'Zmień na nie nowy' : 'Oznacz jako nowy'}
                    </button>
                    <button onClick={() => startEditing(product)}>Edytuj</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
