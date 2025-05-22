// src/pages/admin/AdminDashboard.tsx
import { Box, Typography, Grid, Card, CardContent, Button, Container } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link as RouterLink } from 'react-router-dom';

const adminAccent = '#1976d2'; // Muted blue for admin
const adminBg = '#f4f6fa'; // Muted light background
const adminCardBg = '#fff';
const adminCardShadow = '0 2px 12px 0 rgba(25, 118, 210, 0.08)';

const AdminDashboard = () => {
  return (
    <Box sx={{ background: adminBg, minHeight: '100vh', py: 4, fontFamily: 'Montserrat, Roboto, sans-serif' }}>
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
              background: adminCardBg,
              borderRadius: 3,
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
              <Button component={RouterLink} to="/admin/catalogue" variant="contained" sx={{ m: 2, mt: 0, background: adminAccent, color: '#fff', borderRadius: 2, fontWeight: 600 }}>
                GO TO CATALOGUE
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: adminCardBg,
              borderRadius: 3,
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
              <Button component={RouterLink} to="/admin/orders" variant="contained" sx={{ m: 2, mt: 0, background: adminAccent, color: '#fff', borderRadius: 2, fontWeight: 600 }}>
                GO TO ORDERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: adminCardBg,
              borderRadius: 3,
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
              <Button component={RouterLink} to="/admin/users" variant="contained" sx={{ m: 2, mt: 0, background: adminAccent, color: '#fff', borderRadius: 2, fontWeight: 600 }}>
                GO TO USERS
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: adminCardBg,
              borderRadius: 3,
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
              <Button component={RouterLink} to="/admin/campaigns" variant="contained" sx={{ m: 2, mt: 0, background: adminAccent, color: '#fff', borderRadius: 2, fontWeight: 600 }}>
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