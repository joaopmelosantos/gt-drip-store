import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SmoothScroll from './utils/SmoothScroll';
import HomePage from './pages/HomePage/HomePage';
import ProductListingPage from './pages/ProductListingPage/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage/ProductViewPage';

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
        {/* Rotas secundárias apontando para páginas de estudo enquanto não forem criadas */}
        <Route path="/categories" element={<ProductListingPage />} />
        <Route path="/orders" element={<ProductListingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
