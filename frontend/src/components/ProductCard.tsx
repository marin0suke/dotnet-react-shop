// ProductCard.tsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import LinkBehaviour from "./LinkBehaviour";
import { useCart } from "../contexts/CartContext";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const theme = useTheme();

  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",         // fill the 400px wrapper
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardMedia
        sx={{
          height: 300,
          backgroundImage: `url(${product.imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />

      <CardContent sx={{ flexGrow: 1, px: 2, py: 1.5 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontSize: "1.125rem",
            fontWeight: 500,
            lineHeight: 1.3,
            mb: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,       // clamp to two lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between" }}>
        <Button
          size="small"
          component={LinkBehaviour}
          to={`/products/${product.id}`}
          sx={{ textTransform: "none" }}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => addToCart(product.id, 1)}
          sx={{ textTransform: "none" }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;