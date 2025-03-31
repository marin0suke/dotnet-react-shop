import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import LinkBehaviour from "./LinkBehaviour";
import { useCart } from "../contexts/CartContext";

interface Product {
    id: number;
    name: string;
    price: number; // not decimal? 
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart(); 

    return (
        <Card>
            <CardMedia 
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" component={LinkBehaviour} to={`/products/${product.id}`}>
                    View Details
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCart(product)}
                >
                    Add To Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;