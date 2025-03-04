import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductsList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';


function App() {
  return (
    <div>
      <header>
        <h1>.NET React Store</h1>
        <nav>
          <Link to='/products'>Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <Routes>
        <Route path="*" element={<ProductList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/cart' element={<CartDisplay />} />
      </Routes>
    </div>
    
  )
}

export default App;
