import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid2, Typography } from "@mui/material";
import { CartItem, useCart } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom";


const CartDisplay = () => {
    const { cart, removeFromCart, updateCartItem, clearCart, total } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (item: CartItem, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(item.id);
        } else {
            updateCartItem(item.id, newQuantity);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid2 container spacing={2}>
                        {cart.map((item) => (
                            <Grid2 item xs={12} key={item.id}> 
                            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                <CardMedia 
                                    component="img"
                                    sx={{ width: 100, height: 100, mr: 2 }}
                                    image={item.imageUrl}
                                    alt={item.name}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${item.price} x {item.quantity}
                                    </Typography>
                                </CardContent>
                                <Button color="secondary" onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </Button>
                            </Card>
                            </Grid2>
                        ))}
                    </Grid2>

                    <Divider sx={{ my: 3 }}/>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    )
}

export default CartDisplay;