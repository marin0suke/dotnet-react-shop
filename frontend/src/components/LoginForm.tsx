import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import api from "../api";
import { 
    Container, 
    Paper, 
    Typography, 
    TextField, 
    Button, 
    Box, 
    Link,
    Alert
} from '@mui/material';

interface LoginFormProps {
    redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = "/products" }) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const { cart: guestCart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null);

        try {
            // Store guest cart items before login
            const guestCartItems = [...guestCart];
            
            // Perform login
            await login(email, password);
            
            // Transfer guest cart items to authenticated cart
            if (guestCartItems.length > 0) {
                try {
                    // Add each item to the authenticated cart
                    for (const item of guestCartItems) {
                        await api.post('/cart', {
                            productId: item.id,
                            quantity: item.quantity
                        });
                    }
                    // Clear guest cart only after successful transfer
                    clearCart();
                } catch (error) {
                    console.error("Error transferring cart items:", error);
                    // Continue with navigation even if cart transfer fails
                }
            }
            
            navigate(redirectTo);
        } catch (err: unknown) {
            setError("Login failed - please check credentials");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            margin="normal"
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            margin="normal"
                        />
                    </Box>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        Login
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link component={RouterLink} to="/register">
                            Don't have an account? Register here
                        </Link>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginForm;

// track email password, takes form input from client to send to service layer for auth. 
// handleSubmit from form. 