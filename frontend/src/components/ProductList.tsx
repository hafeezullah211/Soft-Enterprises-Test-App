import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  pictures: string[];
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h2" variant="h6">
        Added Products
      </Typography>
      {products.map((product) => (
        <Box key={product._id} sx={{ mt: 2, border: '1px solid #ddd', p: 2, borderRadius: '8px' }}>
          <Typography>Name: {product.name}</Typography>
          <Typography>Price: {product.price}</Typography>
          <Typography>Quantity: {product.quantity}</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {product.pictures.map((picture, index) => (
              <Grid item key={index} xs={4}>
                <img src={`../../../backend/${picture}`} alt="product" style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
