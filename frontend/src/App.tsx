import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductsList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';
import CheckoutPage from './components/CheckoutPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import { ThemeProvider, CssBaseline, createTheme, Toolbar } from '@mui/material';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import CataloguePage from './components/admin/CataloguePage';
import OrdersPage from './components/admin/OrdersPage';
import BusinessInsightsPage from './components/admin/BusinessInsightsPage';
import CampaignsPage from './components/admin/CampaignsPage';
import RetailerListPage from './components/admin/RetailerListPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {

  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <div>
            <Header />
            <main>
              <Toolbar />
              <Routes>
                <Route path="*" element={<ProductList />} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/products/:id' element={<ProductPage />} />
                <Route path='/cart' element={<CartDisplay />} />
                <Route path='/checkout' element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/register' element={<RegisterForm />}/>
                <Route path='/profile' element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }/>
                {/* Admin Routes */}
                <Route path='/admin/dashboard' element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }/>
                <Route path='/admin/catalogue' element={
                  <ProtectedRoute requireAdmin>
                    <CataloguePage />
                  </ProtectedRoute>
                }/>
                <Route path='/admin/orders' element={
                  <ProtectedRoute requireAdmin>
                    <OrdersPage />
                  </ProtectedRoute>
                }/>
                <Route path='/admin/insights' element={
                  <ProtectedRoute requireAdmin>
                    <BusinessInsightsPage />
                  </ProtectedRoute>
                }/>
                <Route path='/admin/campaigns' element={
                  <ProtectedRoute requireAdmin>
                    <CampaignsPage />
                  </ProtectedRoute>
                }/>
                <Route path='/admin/users' element={
                  <ProtectedRoute requireAdmin>
                    <RetailerListPage />
                  </ProtectedRoute>
                }/>
              
              </Routes>
            </main>
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
