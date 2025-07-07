import { useEffect, useState } from "react";
import {
 getProductosByCategoria,
 getCategoriaPorId,
 getProductosDestacadosPorCategoria,
 getProductosMasVendidosPorCategoria,
} from "../api/api";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/carusel";
import { useParams } from "react-router-dom";

export default function ProductosPorCategoria() {
 const { id } = useParams();
 const categoriaId = parseInt(id, 10);
 const [productos, setProductos] = useState([]);
 const [categoriaNombre, setCategoriaNombre] = useState("");
 const [page, setPage] = useState(1);
 const limit = 20;

 const [productosDestacados, setProductosDestacados] = useState([]);
 const [productosMasVendidos, setProductosMasVendidos] = useState([]);

 useEffect(() => {
  if (!categoriaId) return;
  getCategoriaPorId(categoriaId).then((res) => {
   if (res.success) setCategoriaNombre(res.data.nombre);
   else setCategoriaNombre("");
  });
  setPage(1);

  getProductosDestacadosPorCategoria(categoriaId).then((res) => {
   if (res.success) setProductosDestacados(res.data);
   else setProductosDestacados([]);
  });

  getProductosMasVendidosPorCategoria(categoriaId).then((res) => {
   if (res.success) setProductosMasVendidos(res.data);
   else setProductosMasVendidos([]);
  });
 }, [categoriaId]);

 useEffect(() => {
  if (!categoriaId) return;
  getProductosByCategoria(categoriaId, page, limit).then((res) => {
   if (res.success) setProductos(res.data);
   else setProductos([]);
  });
 }, [categoriaId, page]);

 return (
  <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
   <h2>Productos en categoría: {categoriaNombre || "..."}</h2>

   {productosDestacados.length > 0 && (
    <>
     <h3>Productos Destacados</h3>
     <ProductCarousel productos={productosDestacados} />
    </>
   )}

   {productosMasVendidos.length > 0 && (
    <>
     <h3>Productos Más Vendidos</h3>
     <ProductCarousel productos={productosMasVendidos} />
    </>
   )}

   {productos.length > 0 ? (
    <div className="productos-grid">
     {productos.map((p) => (
      <ProductCard key={p.id} producto={p} />
     ))}
    </div>
   ) : null}

   {productosDestacados.length === 0 &&
    productosMasVendidos.length === 0 &&
    productos.length === 0 && <p>No hay productos para mostrar.</p>}

   {productos.length > 0 && (
    <div style={{ marginTop: 20, textAlign: "center" }}>
     <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      style={{ marginRight: 10 }}
     >
      Anterior
     </button>
     <span>Página {page}</span>
     <button
      onClick={() => setPage((p) => p + 1)}
      disabled={productos.length < limit}
      style={{ marginLeft: 10 }}
     >
      Siguiente
     </button>
    </div>
   )}
  </div>
 );
}
