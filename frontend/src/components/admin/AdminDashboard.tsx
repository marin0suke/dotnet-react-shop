import { Typography, Box } from '@mui/material';

const AdminDashboard: React.FC = () => {
    return (
        <Box sx={{ p: 3, mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="body1">
                Welcome to the admin dashboard. This is where you can manage your store.
            </Typography>
        </Box>
    );
};

export default AdminDashboard; 