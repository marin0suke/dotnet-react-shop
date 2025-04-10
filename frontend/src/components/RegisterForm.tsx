import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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

const RegisterForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await register(name, email, password);
            navigate("/products");
        } catch (err: unknown) {
            setError("Registration failed - please try again");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
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
                            label="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            margin="normal"
                        />
                    </Box>
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
                        Register
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login">
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;