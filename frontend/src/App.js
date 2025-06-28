import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import { useParams } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import SeacrhProduct from './pages/search';
import ProductosPorCategoria from './pages/productosCategoria';


export default function App() {

  function ProductDetailWrapper() {
    const { id } = useParams();
    return <ProductDetail productoId={parseInt(id, 10)} />;
  }
  return (
    <BrowserRouter>
     <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/buscar" element={<SeacrhProduct />} />
            <Route path="/categoria/:id" element={<ProductosPorCategoria />} />
            <Route path="/producto/:id" element={<ProductDetailWrapper />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}
