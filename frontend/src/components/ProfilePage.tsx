import { useAuth } from "../contexts/AuthContext";
import { Container, Paper, Typography, Box, Button, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

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
                        Profile
                    </Typography>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Account Information
                            </Typography>
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    <strong>Username:</strong> {user.userName}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {user.email}
                                </Typography>
                                <Box>
                                    <Typography variant="body1" component="span" sx={{ mr: 1 }}>
                                        <strong>User Type:</strong>
                                    </Typography>
                                    {user.roles?.map((role, index) => (
                                        <Chip
                                            key={index}
                                            label={role}
                                            color="primary"
                                            size="small"
                                            sx={{ mr: 1, mt: 1 }}
                                        />
                                    ))}
                                </Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProfilePage; 