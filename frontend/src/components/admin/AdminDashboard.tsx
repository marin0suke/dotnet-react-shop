// src/pages/admin/AdminDashboard.tsx
import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const AdminDashboard = () => {
  const theme = useTheme();
  const adminAccent = theme.palette.primary.main;
  const adminCardBg = '#fff';
  const adminCardShadow = '0 2px 12px 0 rgba(42, 62, 89, 0.08)'; // navy shadow

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: adminAccent, letterSpacing: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary" mb={4} sx={{ fontWeight: 400, fontSize: 18 }}>
          Manage your store, orders, users, and campaigns from one place.
        </Typography>
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: adminCardShadow,
              border: `1.5px solid ${adminAccent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              '&:hover': { boxShadow: 8, border: `1.5px solid ${adminAccent}` }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Inventory2Icon sx={{ color: adminAccent, fontSize: 40, mb: 1 }} />
                <Typography variant="h6" mt={1} sx={{ fontWeight: 600 }}>Catalogue</Typography>
                <Typography color="text.secondary" gutterBottom>
                  View and manage product listings.
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/catalogue" variant="contained" sx={{ m: 2, mt: 0, color: '#fff', fontWeight: 600, background: adminAccent, '&:hover': { background: adminAccent } }}>
                GO TO CATALOGUE
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: adminCardShadow,
              border: `1.5px solid ${adminAccent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              '&:hover': { boxShadow: 8, border: `1.5px solid ${adminAccent}` }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <ShoppingCartIcon sx={{ color: adminAccent, fontSize: 40, mb: 1 }} />
                <Typography variant="h6" mt={1} sx={{ fontWeight: 600 }}>Orders</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Fulfil and track customer orders.
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/orders" variant="contained" sx={{ m: 2, mt: 0, color: '#fff', fontWeight: 600, background: adminAccent, '&:hover': { background: adminAccent } }}>
                GO TO ORDERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: adminCardShadow,
              border: `1.5px solid ${adminAccent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              '&:hover': { boxShadow: 8, border: `1.5px solid ${adminAccent}` }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <GroupIcon sx={{ color: adminAccent, fontSize: 40, mb: 1 }} />
                <Typography variant="h6" mt={1} sx={{ fontWeight: 600 }}>Users</Typography>
                <Typography color="text.secondary" gutterBottom>
                  View retailer accounts and admin roles.
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/users" variant="contained" sx={{ m: 2, mt: 0, color: '#fff', fontWeight: 600, background: adminAccent, '&:hover': { background: adminAccent } }}>
                GO TO USERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: adminCardShadow,
              border: `1.5px solid ${adminAccent}22`,
              transition: 'box-shadow 0.2s, border 0.2s',
              '&:hover': { boxShadow: 8, border: `1.5px solid ${adminAccent}` }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <CampaignIcon sx={{ color: adminAccent, fontSize: 40, mb: 1 }} />
                <Typography variant="h6" mt={1} sx={{ fontWeight: 600 }}>Campaigns</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Launch and track promotions.
                </Typography>
              </CardContent>
              <Button component={RouterLink} to="/admin/campaigns" variant="contained" sx={{ m: 2, mt: 0, color: '#fff', fontWeight: 600, background: adminAccent, '&:hover': { background: adminAccent } }}>
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