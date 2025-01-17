import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Admin.css';
import { ProductContext } from '../../Context/ProductContext';
import AddProductForm from './AddProdutForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); 
  const [showAddForm, setShowAddForm] = useState(false);
  const { all_product, fetchProducts } = useContext(ProductContext);
  const [formValues, setFormValues] = useState({
    image: null,
    sizes: [],
    colors: []  
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

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5055/delete-product/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      console.log('Produkt został usunięty:', updatedProduct);
      fetchProducts()
    } catch (error) {
      console.error('Błąd podczas usunięcia produktu:', error);
    }
  };

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

  // const handleMultiSelectChange = (e) => {
  //   const { name, options } = e.target;
  //   const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: selectedOptions,
  //   }));
  // };

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
    const file = event.target.files[0]; 
    if (file) {
      setFormValues({
        ...formValues,
        image: file, 
      });
    }
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = [...prevValues[type]];
      if (checked) {
        updatedValues.push(value);
      } else {
        const index = updatedValues.indexOf(value);
        if (index > -1) {
          updatedValues.splice(index, 1); 
        }
      }
      return {
        ...prevValues,
        [type]: updatedValues,
      };
    });
  };

  const handleAddProductSuccess = () => {
    fetchProducts();
    setShowAddForm(false);
  };
  

  return (
    <div className="container mt-5">
    <button 
        className="btn btn-primary mb-4" 
        onClick={() => setShowAddForm(prevState => !prevState)} 
      >
        {showAddForm ? 'Ukryj formularz' : 'Dodaj nowy produkt'}
      </button>

      {showAddForm && <AddProductForm onSuccess={handleAddProductSuccess} />}
      <h1 className="text-center mb-4 text-primary">Panel Administratora - Zarządzanie Produktami</h1>
      <table className="table table-striped">
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
          {products.map((product) => (
            <tr key={product.id}>
              {editProduct === product.id ? (
                <>
                  <td>{product.id}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formValues.name || ''}
                      onChange={handleInputChange}
                      placeholder="Nazwa produktu"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      value={formValues.category || ''}
                      onChange={handleInputChange}
                      placeholder="Kategoria"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formValues.price || ''}
                      onChange={handleInputChange}
                      placeholder="Cena"
                    />
                  </td>
                  <td>
                    <textarea
                      name="description"
                      className="form-control"
                      value={formValues.description || ''}
                      onChange={handleInputChange}
                      placeholder="Opis produktu"
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </td>
                  <td>
                    {availableSizes.map((size) => (
                      <div key={size} className="form-check form-check-inline">
                        <input
                          type="checkbox"
                          value={size}
                          className="form-check-input"
                          checked={formValues.sizes.includes(size)}
                          onChange={(e) => handleCheckboxChange(e, 'sizes')}
                        />
                        <label className="form-check-label">{size}</label>
                      </div>
                    ))}
                  </td>
                  <td>
                    {availableColors.map((color) => (
                      <div key={color} className="form-check form-check-inline">
                        <input
                          type="checkbox"
                          value={color}
                          className="form-check-input"
                          checked={formValues.colors.includes(color)}
                          onChange={(e) => handleCheckboxChange(e, 'colors')}
                        />
                        <label className="form-check-label">{color}</label>
                      </div>
                    ))}
                  </td>
                  <td colSpan="4" className="text-center">
                    <button className="btn btn-success" onClick={saveEditsToServer}>
                      Zapisz
                    </button>
                    <button className="btn btn-danger ml-3" onClick={cancelEditing}>
                      Anuluj
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.new_price}</td>
                  <td>{product.description}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '50px', borderRadius: '5px' }}
                    />
                  </td>
                  <td>{product.isavailable ? 'Dostępny' : 'Niedostępny'}</td>
                  <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
                  <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
                  <td>
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => {
                        return toggleAvailability(product.id)
                      }}
                    >
                      {product.isavailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
                    </button>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => togglePopularity(product.id)}
                    >
                      {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
                    </button>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => toggleNew(product.id)}
                    >
                      {product.new ? 'Zmień na nie nowy' : 'Oznacz jako nowy'}
                    </button>
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => {
                        return deleteProduct(product.id)
                      }}
                    >
                      Usuń
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => startEditing(product)}
                    >
                      Edytuj
                    </button>
                    
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



// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import './Admin.css';
// import { ProductContext } from '../../Context/ProductContext';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [editProduct, setEditProduct] = useState(null); // Przechowuje produkt, który aktualnie edytujemy
//   const { all_product, fetchProducts } = useContext(ProductContext);
//   const [formValues, setFormValues] = useState({
//     image: null,
//     sizes: [],
//     colors: []  
//   });
//   const availableColors = ["red", "blue", "green", "yellow", "black", "white"];
//   const availableSizes = ["XS", "S", "M", "L", "XL"];
  
// console.log(all_product)
//   useEffect(() => {
//     setProducts(all_product);
//   }, [all_product]);

//   const saveProductToServer = async (product, key) => {
//     const updatedValue = product[key] ? true : false;
//     const wys = { id: product.id, [key]: updatedValue };
//     console.log('Wysyłam na serwer:', wys);

//     try {
//       const response = await fetch('http://localhost:5055/save-product', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(wys),
//       });

//       if (!response.ok) {
//         throw new Error(`Błąd serwera: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Produkt został zapisany na serwerze:', data);
//     } catch (error) {
//       console.error('Błąd podczas zapisywania produktu:', error);
//     }
//   };

//   const saveEditsToServer = async () => {
//     console.log(formValues)
//     try {
//       const response = await fetch('http://localhost:5055/update-product', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formValues),
//       });

//       if (!response.ok) {
//         throw new Error(`Błąd serwera: ${response.statusText}`);
//       }

//       const updatedProduct = await response.json();
//       console.log('Produkt zaktualizowany na serwerze:', updatedProduct);

//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product.id === updatedProduct.id ? updatedProduct : product
//         )
//       );

//       setEditProduct(null); 
//       fetchProducts()
//     } catch (error) {
//       console.error('Błąd podczas aktualizacji produktu:', error);
//     }
//   };

//   // const startEditing = (product) => {
//   //   setEditProduct(product.id);
//   //   setFormValues(product);
//   // };

//   const startEditing = (product) => {
//     setEditProduct(product.id);
//     setFormValues({
//       ...product,
//       sizes: product.sizes || [],
//       colors: product.colors || [],
//     });
//   };


//   const cancelEditing = () => {
//     setEditProduct(null);
//     setFormValues({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleMultiSelectChange = (e) => {
//     const { name, options } = e.target;
//     const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: selectedOptions,
//     }));
//   };

//   const toggleAvailability = useCallback((id) => {
//     setProducts((prevProducts) => {
//       const updatedProducts = prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, isavailable: !product.isavailable }
//           : product
//       );

//       const updatedProduct = updatedProducts.find((product) => product.id === id);
//       saveProductToServer(updatedProduct, 'isavailable');

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

//   const handleFileChange = (event) => {
//     const file = event.target.files[0]; 
//     if (file) {
//       setFormValues({
//         ...formValues,
//         image: file, 
//       });
//     }
//   };

//   const handleCheckboxChange = (e, type) => {
//     const { value, checked } = e.target;
//     setFormValues((prevValues) => {
//       const updatedValues = [...prevValues[type]];
//       if (checked) {
//         updatedValues.push(value);
//       } else {
//         const index = updatedValues.indexOf(value);
//         if (index > -1) {
//           updatedValues.splice(index, 1); 
//         }
//       }
//       return {
//         ...prevValues,
//         [type]: updatedValues,
//       };
//     });
//   };
  

//   return (
//     <div>
//       <h1>Panel administratora - Zarządzanie produktami</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nazwa</th>
//             <th>Kategoria</th>
//             <th>Cena</th>
//             <th>Opis</th>
//             <th>Zdjęcie</th>
//             <th>Status dostępności</th>
//             <th>Popularność</th>
//             <th>Nowość</th>
//             <th>Akcja</th>
//           </tr>
//         </thead>
//         <tbody>
//           {console.log(products)}
//           {products.map((product) => (
//             <tr key={product.id}>
//               {editProduct === product.id ? (
//                 <>
//                 <td>{product.id}</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formValues.name || ''}
//                     onChange={handleInputChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="category"
//                     value={formValues.category || ''}
//                     onChange={handleInputChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="price"
//                     value={formValues.price || ''}
//                     onChange={handleInputChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="description"
//                     value={formValues.description || ''}
//                     onChange={handleInputChange}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </td>
//                 <div>
//         {availableSizes.map((size) => (
//           <label key={size}>
//             <input
//               type="checkbox"
//               value={size}
//               checked={formValues.sizes.includes(size)} // Sprawdzamy, czy rozmiar jest zaznaczony
//               onChange={(e) => handleCheckboxChange(e, 'sizes')} // Obsługujemy zmianę
//             />
//             {size}
//           </label>
//         ))}
//       </div>
//       <div>
//         {availableColors.map((color) => (
//           <label key={color}>
//             <input
//               type="checkbox"
//               value={color}
//               checked={formValues.colors.includes(color)} // Sprawdzamy, czy rozmiar jest zaznaczony
//               onChange={(e) => handleCheckboxChange(e, 'colors')} // Obsługujemy zmianę
//             />
//             {color}
//           </label>
//         ))}
//       </div>
//                 <td colSpan="4">
//                   <button onClick={saveEditsToServer}>Zapisz</button>
//                   <button onClick={cancelEditing}>Anuluj</button>
//                 </td>
//               </>
//               ) : (
//                 <>
//                   <td>{product.id}</td>
//                   <td>{product.name}</td>
//                   <td>{product.category}</td>
//                   <td>{product.new_price}</td>
//                   <td>{product.description}</td>
//                   <td>
//                     <img src={product.image} alt={product.name} style={{ width: '50px' }} />
//                   </td>
//                   <td>{product.isavailable ? 'Dostępny' : 'Niedostępny'}</td>
//                   <td>{product.popular ? 'Popularny' : 'Niepopularny'}</td>
//                   <td>{product.new ? 'Nowy' : 'Nie nowy'}</td>
//                   <td>
//                     <button onClick={() => toggleAvailability(product.id)}>
//                       {product.isavailable ? 'Zmień na niedostępny' : 'Zmień na dostępny'}
//                     </button>
//                     <button onClick={() => togglePopularity(product.id)}>
//                       {product.popular ? 'Usuń popularność' : 'Ustaw jako popularny'}
//                     </button>
//                     <button onClick={() => toggleNew(product.id)}>
//                       {product.new ? 'Zmień na nie nowy' : 'Oznacz jako nowy'}
//                     </button>
//                     <button onClick={() => startEditing(product)}>Edytuj</button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;