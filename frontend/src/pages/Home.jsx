import { useEffect, useState } from 'react';
import { getDestacados, getMasVendidos } from '../api/api';
import ProductCarousel from '../components/carusel';
import PaginatedProducts from '../components/ProductosPaginados';

export default function Home() {
  const [destacados, setDestacados] = useState([]);
  const [vendidos, setVendidos] = useState([]);

  useEffect(() => {
    getDestacados().then(res => setDestacados(res.data));
    getMasVendidos().then(res => setVendidos(res.data));
  }, []);

  const handleClick = (id) => {
    console.log("Producto clickeado ID:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Destacados</h2>
      <ProductCarousel productos={destacados} onClick={handleClick} />

      <h2 className="text-2xl my-6">Más Vendidos</h2>
      <ProductCarousel productos={vendidos} onClick={handleClick} />
      <PaginatedProducts />
    </div>
  );
}
