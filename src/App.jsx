import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SmoothScroll from './utils/SmoothScroll';
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage/ProductViewPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        {/* Redireciona /produtos (citado em parte do README base) para /products */}
        <Route path="/produtos" element={<Navigate to="/products" replace />} />
        <Route path="/product/:id" element={<ProductViewPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<ProductListingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
