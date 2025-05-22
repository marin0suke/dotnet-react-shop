import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import LoginForm from "./LoginForm";
import { Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const CheckoutPage = () => {
    const { cart, total, clearCart } = useCart();
    const { user } = useAuth();

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const [orderSubmitted, setOrderSubmitted] = useState(false); 

    // handle changes to the shipping form inputs:
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send order details to backend.
        console.log("order submitted: ", { cart, shippingInfo, total });
        clearCart();
        setOrderSubmitted(true);
    }

    if (orderSubmitted) {
        return (
            <Container>
                <Typography variant="h4">Thank you for your order!</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cart.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                        <Typography variant="body2">Price: ${item.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Total: ${total}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmitOrder}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, mx: 'auto' }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Shipping Information
                        </Typography>
                        <TextField 
                            name="firstName"
                            label="First Name"
                            value={shippingInfo.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField 
                            name="lastName"
                            label="Last Name"
                            value={shippingInfo.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField 
                            name="address"
                            label="Address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField 
                            name="city"
                            label="City"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField 
                            name="postalCode"
                            label="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField 
                            name="country"
                            label="Country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Submit Order
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CheckoutPage;