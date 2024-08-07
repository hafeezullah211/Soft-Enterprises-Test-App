import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import FormField from '../components/FormField';
import ProductList from '../components/ProductList';
import UserMenu from '../components/UserMenu';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  pictures: string[];
}

const ProductPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [pictures, setPictures] = useState<File[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/products/user-products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPictures(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pictures.length < 1 || pictures.length > 6) {
      setError('Please upload between 1 and 6 pictures.');
      return;
    }
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price.toString());
      formData.append('quantity', quantity.toString());
      pictures.forEach((picture) => formData.append('pictures', picture));

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product added successfully!');
      setName('');
      setPrice('');
      setQuantity('');
      setPictures([]);
      setProducts([...products, response.data]);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  return (
    <Container component="main">
      <UserMenu />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Add Products</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormField label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FormField label="Product Price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          <FormField label="Product Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Pictures
            <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
          </Button>
          {pictures.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {pictures.map((picture, index) => (
                <Grid item key={index} xs={4}>
                  <img src={URL.createObjectURL(picture)} alt="preview" style={{ width: '100%' }} />
                </Grid>
              ))}
            </Grid>
          )}
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Product</Button>
        </Box>
        <ProductList products={products} />
      </Box>
    </Container>
  );
};

export default ProductPage;
