import { useAuth } from "../contexts/AuthContext";
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Please log in to view your profile
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate('/login')}
                    >
                        Go to Login
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Account Information
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Name:</strong> {user.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> {user.email}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage; 