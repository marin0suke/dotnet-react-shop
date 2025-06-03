// ProductsList.tsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { Box, Container, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error)   return <div>{error}</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3, // 24px
          // ensure all items align to the top of their row:
          alignItems: "flex-start",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              flex: "1 1 calc(33.333% - 16px)", // ~33% width minus (gap/2) on each side
              maxWidth: "calc(33.333% - 16px)",
              minWidth: "240px", // optional, avoid becoming too narrow
              // Force every card wrapper to be a fixed height:
              height: "450px",   
              display: "flex",
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductsList;