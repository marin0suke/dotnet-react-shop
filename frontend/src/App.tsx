import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductsList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';
import CheckoutPage from './components/CheckoutPage';


function App() {
  return (
    <div>
      <header>
        <h1>.NET React Store</h1>
        <nav>
          <Link to='/products'>Products</Link>
          <Link to='/cart'>Cart</Link>
          <Link to='/checkout'>Checkout</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="*" element={<ProductList />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartDisplay />} />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
