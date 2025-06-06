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
    console.log('Save product:', { id, ...formData });
    // TODO: Connect this to your backend to update the product
    setEditProductId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
        Admin Catalogue
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : products.length ? (
        <Grid container direction="column" spacing={2}>
          {products.map(product => (
            <Grid item key={product.id}>
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: `1px solid ${theme.palette.primary.main}22`,
                  borderRadius: 2,
                  p: 3,
                  mb: 2,
                }}
              >
                {editProductId === product.id ? (
                  // Edit mode
                  <Box sx={{ width: '100%' }}>
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
                  // View mode
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    {/* Left side: Text content */}
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {product.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Price: ${product.price}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Button variant="outlined" size="small" onClick={() => handleEdit(product)}>
                          Edit
                        </Button>
                      </Box>
                    </Box>

                    {/* Right side: Image */}
                    <Box
                      component="img"
                      src={product.imageUrl}
                      alt={product.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No products found.</Typography>
      )}
    </Container>
  );
};

export default AdminCatalogue;