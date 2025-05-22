// src/pages/admin/AdminDashboard.tsx
import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link as RouterLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Box sx={{ background: '#f7f8fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Typography color="text.secondary" mb={4}>
          Manage your store, orders, users, and campaigns from one place.
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 6 }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Inventory2Icon color="primary" fontSize="large" />
                <Typography variant="h6" mt={1}>Catalogue</Typography>
                <Typography color="text.secondary" gutterBottom>
                  View and manage product listings.
                </Typography>
                <Typography variant="body2" fontWeight={500} mb={2}>
                  (3 sample products will appear here)
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/catalogue" variant="outlined" sx={{ m: 2, mt: 0 }}>
                GO TO CATALOGUE
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 6 }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <ShoppingCartIcon color="primary" fontSize="large" />
                <Typography variant="h6" mt={1}>Orders</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Fulfil and track customer orders.
                </Typography>
                <Typography variant="body2" fontWeight={500} mb={2}>
                  (Dummy orders summary here)
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/orders" variant="outlined" sx={{ m: 2, mt: 0 }}>
                GO TO ORDERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 6 }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <GroupIcon color="primary" fontSize="large" />
                <Typography variant="h6" mt={1}>Users</Typography>
                <Typography color="text.secondary" gutterBottom>
                  View retailer accounts and admin roles.
                </Typography>
                <Typography variant="body2" fontWeight={500} mb={2}>
                  (Static retailer info)
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/users" variant="outlined" sx={{ m: 2, mt: 0 }}>
                GO TO USERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 6 }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <CampaignIcon color="primary" fontSize="large" />
                <Typography variant="h6" mt={1}>Campaigns</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Launch and track promotions.
                </Typography>
                <Typography variant="body2" fontWeight={500} mb={2}>
                  (Mock campaign UI)
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/campaigns" variant="outlined" sx={{ m: 2, mt: 0 }}>
                GO TO CAMPAIGNS
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;