import { useEffect, useState } from 'react';
import { getDetalleProducto, PostlikeProducto, getComentarios, PostComentario } from '../api/api';

export default function ProductDetail({ productoId }) {
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState({ nombre: '', comentario: '', calificacion: 5 });

  useEffect(() => {
    setLoading(true);
    getDetalleProducto(productoId)
      .then(res => {
        if (res.success) {
          setProducto(res.data);
          setError(null);
        } else {
          setError('Producto no encontrado');
        }
      })
      .catch(() => setError('Error al cargar el producto'))
      .finally(() => setLoading(false));

    getComentarios(productoId).then(res => {
      if (res.success) setComentarios(res.data);
    });
  }, [productoId]);

  const handleLike = () => {
    if (likeLoading) return;
    setLikeLoading(true);
    PostlikeProducto(productoId).then(res => {
      if (res.success) {
        setProducto(prev => ({ ...prev, likes: prev.likes + 1 }));
      }
    }).finally(() => setLikeLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PostComentario(productoId, nuevoComentario).then(res => {
      if (res.success) {
        setComentarios(prev => [...prev, res.data]);
        setNuevoComentario({ nombre: '', comentario: '', calificacion: 5 });
      }
    });
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '1100px', margin: 'auto', padding: 20, display: 'flex', gap: 30 }}>
      <div style={{ flex: 1 }}>
        <img
          src={producto.imagen_url || 'https://via.placeholder.com/600x400?text=Sin+imagen'}
          alt={producto.modelo}
          style={{ width: '100%', borderRadius: 8 }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: 10 }}>{producto.modelo}</h2>
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Visitas:</strong> {producto.visitas}</p>
        <p>
          <strong>Likes:</strong> {producto.likes}
          <button
            onClick={handleLike}
            disabled={likeLoading}
            style={{ marginLeft: 10, padding: '4px 12px', cursor: 'pointer' }}
          >
            {likeLoading ? 'Cargando...' : '❤️ Me gusta'}
          </button>
        </p>
        <p><strong>Calificación promedio:</strong> {producto.calificacion_promedio || 'Sin calificaciones'}</p>
        <p><strong>Fecha registro:</strong> {new Date(producto.fecha_registro).toLocaleDateString()}</p>
        <p><strong>Última modificación:</strong> {new Date(producto.fecha_modificacion).toLocaleDateString()}</p>
        <p><strong>Especificaciones:</strong></p>
        <div style={{ background: '#f9f9f9', padding: 10, borderRadius: 5, whiteSpace: 'pre-wrap' }}>
          {producto.especificaciones}
        </div>
      </div>

      <div style={{ flex: 1, maxHeight: '80vh', overflowY: 'auto', borderLeft: '1px solid #ddd', paddingLeft: 20 }}>
        <h3>Comentarios</h3>
        {comentarios.length ? (
          comentarios.map(c => (
            <div key={c.id} style={{ marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid #ccc' }}>
              <p><strong>{c.nombre_usuario || 'Anónimo'}</strong></p>
              <p>⭐ {c.calificacion} / 5</p>
              <p>{c.texto}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios.</p>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <h4>Agregar Comentario</h4>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nuevoComentario.nombre}
            onChange={(e) => setNuevoComentario({ ...nuevoComentario, nombre: e.target.value })}
            required
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <textarea
            placeholder="Escribe un comentario..."
            value={nuevoComentario.comentario}
            onChange={(e) => setNuevoComentario({ ...nuevoComentario, comentario: e.target.value })}
            required
            rows={3}
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
          <label>
            Calificación:
            <select
              value={nuevoComentario.calificacion}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, calificacion: parseInt(e.target.value) })}
              style={{ marginLeft: 10 }}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <button type="submit" style={{ display: 'block', marginTop: 10, padding: '6px 16px' }}>Enviar</button>
        </form>
      </div>
    </div>
  );
}
