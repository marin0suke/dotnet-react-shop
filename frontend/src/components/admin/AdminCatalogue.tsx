import { Typography, Box, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useState, useEffect } from 'react';
import { Product } from '../../types/product';

const AdminCatalogue: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // TODO: Fetch products from API
        // This will be implemented when we add the backend endpoints
    }, []);

    return (
        <Box sx={{ p: 3, mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Product Catalogue
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminCatalogue; 