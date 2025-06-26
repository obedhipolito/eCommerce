import { useEffect, useState } from 'react';
import { getProductosPaginados } from '../api/api';
import ProductCard from '../components/ProductCard';

export default function PaginatedProducts() {
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 30;

  useEffect(() => {
    getProductosPaginados(page, limit).then(res => setProductos(res.data));
  }, [page]);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <h2>Más productos</h2>
      <div className="row">
        <div className="row">
            {productos.map(p => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={p.id}>
                <ProductCard producto={p} />
                </div>
            ))}
</div>
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={nextPage} disabled={productos.length < limit}>Siguiente</button>
      </div>
    </div>
  );
}
