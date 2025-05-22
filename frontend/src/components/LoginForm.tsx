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
    Alert,
    Stack
} from '@mui/material';

interface LoginFormProps {
    redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = "/products" }) => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null);
        setIsLoading(true);

        try {
            const loggedInUser = await login(email, password);
            // After login, check if the user is admin and redirect accordingly
            if (loggedInUser.roles?.includes('Admin')) {
                navigate('/admin/dashboard');
            } else {
                navigate("/products");
            }
        } catch (err: unknown) {
            setError("Login failed - please check your credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 64px)', // Subtract header height
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'background.default'
            }}
        >
            <Container 
                maxWidth="sm" 
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 4,
                        width: '100%',
                        maxWidth: 400
                    }}
                >
                    <Typography variant="h4" gutterBottom align="center">
                        Login
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Login
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link component={RouterLink} to="/register">
                                    Don't have an account? Register here
                                </Link>
                            </Box>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginForm;

// track email password, takes form input from client to send to service layer for auth. 
// handleSubmit from form. 