// src/pages/admin/AdminDashboard.tsx
import { Box, Grid, Paper, Typography, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box component="main">
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Catalogue Preview */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', 
                width: '100%'
              }}
            >
              <Box>
                <Typography variant="h6">Catalogue</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  View and manage product listings.
                </Typography>
                <Typography variant="body2">(3 sample products will appear here)</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/catalogue')}
                sx={{ mt: 2 }}
              >
                Go to Catalogue
              </Button>
            </Paper>
          </Grid>

          {/* Orders Preview */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Box>
                <Typography variant="h6">Orders</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Fulfil and track customer orders.
                </Typography>
                <Typography variant="body2">(Dummy orders summary here)</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/orders')}
                sx={{ mt: 2 }}
              >
                Go to Orders
              </Button>
            </Paper>
          </Grid>

          {/* Users Preview */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Box>
                <Typography variant="h6">Users</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  View retailer accounts and admin roles.
                </Typography>
                <Typography variant="body2">(Static retailer info)</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/users')}
                sx={{ mt: 2 }}
              >
                Go to Users
              </Button>
            </Paper>
          </Grid>

          {/* Campaigns Preview */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Box>
                <Typography variant="h6">Campaigns</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Launch and track promotions.
                </Typography>
                <Typography variant="body2">(Mock campaign UI)</Typography>
              </Box>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/campaigns')}
                sx={{ mt: 2 }}
              >
                Go to Campaigns
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;