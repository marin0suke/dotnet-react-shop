import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, Button, TextField, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Product } from '../../types/Product'; 
import api from '../../api';


const AdminCatalogue: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

  }, []);

  const handleEdit = (product: Product) => {
    setEditProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl
    });
  };

  const handleCancel = () => {
    setEditProductId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: ''
    });
  };

  const handleSave = (id: number) => {
    // For POC, log the updated product
    console.log('Save product:', { id, ...formData });
    // TODO: Connect this to your backend to update the product
    setEditProductId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
        Admin Catalogue
      </Typography>
      <Grid container direction="column" spacing={2}>
        {products?.length ? (
          products.map(product => (
            <Grid item key={product.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: `1px solid ${theme.palette.primary.main}22`,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                {editProductId === product.id ? (
                  <Box>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Name"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          label="Image URL"
                          value={formData.imageUrl}
                          onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <TextField
                          fullWidth
                          label="Price"
                          value={formData.price}
                          onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Description"
                          multiline
                          rows={2}
                          value={formData.description}
                          onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button variant="contained" color="primary" onClick={() => handleSave(product.id)}>
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6" fontWeight={600}>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width="100"
                        style={{ borderRadius: 4 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Typography color="text.secondary">Price: ${product.price}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Typography color="text.secondary">{product.description}</Typography>
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Button variant="outlined" size="small" onClick={() => handleEdit(product)}>
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AdminCatalogue;