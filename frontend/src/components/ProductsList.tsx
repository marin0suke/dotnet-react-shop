import { useState, useEffect } from "react";
import api from "../api";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";


const ProductList = () => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');

    useEffect(() => {
        api.get('/products')
            .then(response => {
                setProducts(response.data); // assumes response.data is an array of products.
            })
            .catch(err => {
                console.error("Error fetching products", err);
                setError("Failed to fetch products.");
            })
            .finally(() => setLoading(false));
    }, []); // useEffect runs only once.

    if (loading) return <div>Loading Products...</div>;
    if (error) return <div>{error}</div>;


    return (
        <Container>
            <Typography variant="h4">Products</Typography>
            <Grid container spacing={2} columns={{ xs: 12, sm: 6, md: 4 }}>
                {products.map(product => (
                    <Grid 
                        key={product.id} 
                        sx={{ gridColumn: { xs: 'span 4', sm: 'span 4', md: 'span 4' } }}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;