import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductosByCategoria } from '../api/api';
import ProductCard from '../components/ProductCard';

export default function ProductosPorCategoria() {
  const { id } = useParams();
  const categoriaId = parseInt(id, 10);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    if (!categoriaId) return;
    setPage(1);
  }, [categoriaId]);

  useEffect(() => {
    if (!categoriaId) return;
    getProductosByCategoria(categoriaId, page, limit).then(res => {
      if (res.success) setProductos(res.data);
      else setProductos([]);
    });
  }, [categoriaId, page]);

  return (
    <div style={{ maxWidth: 1100, margin: 'auto', padding: 20 }}>
      <h2>Productos en categoría {categoriaId}</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}>
        {productos.map(p => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ marginRight: 10 }}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={productos.length < limit} style={{ marginLeft: 10 }}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
