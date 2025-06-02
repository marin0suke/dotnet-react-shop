// src/components/ProductsList.tsx
import React, { useEffect, useState } from "react";
import api from "../api";
import { Box, Container, Typography, useTheme } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";

const ProductsList: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error) return <div>{error}</div>;

  // We will define a “gap” between cards of 24px (you can adjust as needed).
  const GAP = 24; // px

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: `${GAP}px`,

          // Center items on larger screens if there’s leftover space.
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              // “flexBasis: 0; flexGrow: 1” allows the item to shrink/grow as needed
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,

              // On desktop (≥960px), each card wrapper is 1/3 minus half the GAP on each side:
              flexBasis: `calc((100% / 3) - (${GAP}px * 2 / 3))`,
              maxWidth: `calc((100% / 3) - (${GAP}px * 2 / 3))`,

              // On tablet (600–959), we want 2 per row:
              [theme.breakpoints.between("sm", "md")]: {
                flexBasis: `calc((100% / 2) - (${GAP}px / 2))`,
                maxWidth: `calc((100% / 2) - (${GAP}px / 2))`,
              },

              // On phone (<600), 1 per row (i.e. full-width)
              [theme.breakpoints.down("sm")]: {
                flexBasis: "100%",
                maxWidth: "100%",
              },
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