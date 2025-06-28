import { useEffect, useState } from "react";
import { buscarProductos } from "../api/api";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SeacrhProduct() {
  const [resultados, setResultados] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query?.trim()) {
      buscarProductos(query).then(res => {
        setResultados(res.data || []);
      });
    } else {
      setResultados([]);
    }
  }, [query]);

  return (
    <div>
      <h2>Resultados para: <em>{query}</em></h2>
      {resultados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resultados.map(p => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
