// src/components/ProductCard.tsx

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
        /* ────────────────────────────────────────────────────────────── */
        /* 1) Make the card fill its wrapper box’s width + height: */
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[6],
        },
        /* ────────────────────────────────────────────────────────────── */
      }}
    >
      {/*
        2) FIXED-HEIGHT IMAGE AREA:
           • height: 180 locks this entire top area at 180px tall.
           • backgroundSize: "cover" automatically crops/zooms to fill that area.
           • backgroundPosition: "center" keeps the crop centered.
           • &:hover { transform: scale(1.05) } → gentle zoom on hover.
        ───────────────────────────────────────────────────────────────── */
      }
    <CardMedia
        component="img"
        src={product.imageUrl}
        alt={product.name}
        sx={{
            width: "100%",         // fill card’s width
            maxHeight: 300,        // never get taller than 180px
            objectFit: "contain",  // scale the image so the whole thing is visible
            mb: 2,                 // some margin‐bottom to separate from title
        }}
    />

      {/*
        3) CLAMP TITLE TO 2 LINES + MAKE MIDDLE FLEX GROW:
           • If product.name is very long, it will be truncated after 2 lines
             (via overflow: hidden + -webkit-line-clamp).  
           • flexGrow: 1 → middle content expands to push CardActions to the bottom,
             ensuring every card’s “footer” sits at the same baseline.
        ───────────────────────────────────────────────────────────────── */
      }
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
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/*
        4) BUTTON ROW:
           • justifyContent: "space-between" → “View Details” on left,
             “Add to Cart” on right, both pinned to the bottom of the card.
        ───────────────────────────────────────────────────────────────── */
      }
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