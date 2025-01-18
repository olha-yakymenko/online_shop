import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Checkbox, FormControl, FormLabel, FormGroup, InputLabel, Select, MenuItem, FormControlLabel, Box } from '@mui/material';

const AddProductForm = ({ onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: '',
      type: '',
      description: '',
      sizes: [], 
      colors: [], 
      image: null, 
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nazwa produktu jest wymagana'),
      category: Yup.string().required('Kategoria jest wymagana'),
      price: Yup.number().required('Cena jest wymagana').positive('Cena musi być dodatnia'),
      type: Yup.string().required('Typ produktu jest wymagany'),
      description: Yup.string().required('Opis jest wymagany'),
      sizes: Yup.array().min(1, 'Wybierz przynajmniej jeden rozmiar').required('Rozmiar jest wymagany'),
      colors: Yup.array().min(1, 'Wybierz przynajmniej jeden kolor').required('Kolor jest wymagany'),
      image: Yup.mixed().required('Obrazek jest wymagany'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('type', values.type)
      formData.append('description', values.description);
      formData.append('sizes', values.sizes);  
      formData.append('colors', values.colors); 
      formData.append('image', values.image);

      try {
        // const response = await fetch('http://localhost:5055/add-product', {
        const response = await fetch('/api/add-product', {

        method: 'POST',
          body: formData,
        });
        console.log(formData)


        if (!response.ok) {
          throw new Error('Błąd podczas dodawania produktu');
        }

        const data = await response.json();
        console.log('Produkt dodany:', data);
        onSuccess();
      } catch (error) {
        console.error('Błąd:', error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const productTypes = [
    "Jacket", "T-shirt", "Jeans", "Blouse", "Dress", "Skirt", "Shirt"
  ];

  const handleSizeChange = (event) => {
    const { value } = event.target;
    const newSizes = formik.values.sizes.includes(value)
      ? formik.values.sizes.filter((size) => size !== value)
      : [...formik.values.sizes, value];
    formik.setFieldValue('sizes', newSizes);
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    const newColors = formik.values.colors.includes(value)
      ? formik.values.colors.filter((color) => color !== value)
      : [...formik.values.colors, value];
    formik.setFieldValue('colors', newColors);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, margin: 'auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <h2>Dodaj Produkt</h2>

      <TextField
        fullWidth
        id="name"
        name="name"
        label="Nazwa produktu"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        id="category"
        name="category"
        label="Kategoria"
        value={formik.values.category}
        onChange={formik.handleChange}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        id="price"
        name="price"
        label="Cena"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        sx={{ marginBottom: 2 }}
      />

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="type-label">Typ produktu</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
        >
          {productTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.type && formik.errors.type && (
          <div style={{ color: 'red' }}>{formik.errors.type}</div>
        )}
      </FormControl>

      <TextField
        fullWidth
        id="description"
        name="description"
        label="Opis"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        sx={{ marginBottom: 2 }}
      />

      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Rozmiary</FormLabel>
        <FormGroup row>
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <FormControlLabel
              key={size}
              control={<Checkbox value={size} onChange={handleSizeChange} checked={formik.values.sizes.includes(size)} />}
              label={size}
            />
          ))}
        </FormGroup>
        {formik.touched.sizes && formik.errors.sizes && (
          <div style={{ color: 'red' }}>{formik.errors.sizes}</div>
        )}
      </FormControl>

      <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <FormLabel component="legend">Kolory</FormLabel>
        <FormGroup row>
          {["red", "blue", "green", "yellow", "black", "white"].map((color) => (
            <FormControlLabel
              key={color}
              control={<Checkbox value={color} onChange={handleColorChange} checked={formik.values.colors.includes(color)} />}
              label={color}
            />
          ))}
        </FormGroup>
        {formik.touched.colors && formik.errors.colors && (
          <div style={{ color: 'red' }}>{formik.errors.colors}</div>
        )}
      </FormControl>

      <Box sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="image">Zdjęcie produktu</InputLabel>
        <input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'block', marginTop: '8px' }}
        />
        {formik.touched.image && formik.errors.image && (
          <div style={{ color: 'red' }}>{formik.errors.image}</div>
        )}
        {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
      </Box>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Dodaj Produkt
      </Button>
    </Box>
  );
};

export default AddProductForm;
