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

const RegisterForm: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await register(userName, email, password);
            navigate("/products");
        } catch (err: unknown) {
            setError("Registration failed - please try again");
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
                bottom: 0
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
                        Register
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
                                label="Username"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                required
                                autoComplete="username"
                            />
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
                                autoComplete="new-password"
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                size="large"
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
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterForm;