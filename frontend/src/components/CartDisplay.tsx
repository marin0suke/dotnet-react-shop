import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Divider, Typography } from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import QuantityInput from "./QuantityInput";
import ClearCartConfirmation from "./ClearCartConfirmation";
import { useState } from "react";

const CartDisplay = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleOpenConfirm = () => setConfirmOpen(true);
    const handleCloseConfirm = () => setConfirmOpen(false);

    const handleClearCart = () => {
        clearCart();
        setConfirmOpen(false);
    }

    const total = cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cart.map((item) => (
                            <Grid key={item.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}> 
                            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                                <CardMedia 
                                    component="img"
                                    sx={{ width: 100, height: 100, mr: 2 }}
                                    image={item.imageUrl}
                                    alt={item.productName}
                                />
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{item.productName}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${item.productPrice} x {item.quantity}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <QuantityInput 
                                        productId={item.productId}
                                        quantity={item.quantity}
                                        onUpdate={updateQuantity} 
                                    />
                                </Box>
                                <Button color="secondary" onClick={() => removeFromCart(item.productId)}>
                                    Remove
                                </Button>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 3 }}/>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Button onClick={handleOpenConfirm}>Clear Cart</Button>
                        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </Box>

                    <ClearCartConfirmation 
                        open={confirmOpen}
                        onConfirm={handleClearCart}
                        onCancel={handleCloseConfirm}
                    />
                </>
            )}
        </Container>
    )
}

export default CartDisplay;