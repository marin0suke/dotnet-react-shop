import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';
import CheckoutPage from './components/CheckoutPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import { ThemeProvider, CssBaseline, Toolbar, Box } from '@mui/material';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import CataloguePage from './components/admin/AdminCatalogue';
import OrdersPage from './components/admin/AdminOrders';
import BusinessInsightsPage from './components/admin/BusinessInsightsPage';
import CampaignsPage from './components/admin/CampaignsPage';
import RetailerListPage from './components/admin/RetailerListPage';
import HomePage from './components/HomePage';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <div>
            <Header />
            
            <main>
              
              
              <Box sx={{ background: 'background.default', minHeight: '100vh', pt: { xs: 2, sm: 4, md: 6 }}}>
              <Toolbar sx={{ minHeight: 120 }} />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartDisplay />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={<LoginForm />}/>
                  <Route path="/register" element={<RegisterForm />}/>
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }/>
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin/catalogue" element={
                    <ProtectedRoute requireAdmin>
                      <CataloguePage />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin/orders" element={
                    <ProtectedRoute requireAdmin>
                      <OrdersPage />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin/insights" element={
                    <ProtectedRoute requireAdmin>
                      <BusinessInsightsPage />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin/campaigns" element={
                    <ProtectedRoute requireAdmin>
                      <CampaignsPage />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin/users" element={
                    <ProtectedRoute requireAdmin>
                      <RetailerListPage />
                    </ProtectedRoute>
                  }/>
                  {/* Fallback: guests see HomePage, logged-in users see ProductList */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Box>
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
