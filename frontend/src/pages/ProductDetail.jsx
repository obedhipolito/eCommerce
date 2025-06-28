import { useEffect, useState } from "react";
import {
 getDetalleProducto,
PostLikeToggle,
 getComentarios,
 PostComentario,
} from "../api/api";
import "../styles/ProductDetails.css";

export default function ProductDetail({ productoId }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
 const [producto, setProducto] = useState(null);
 const [comentarios, setComentarios] = useState([]);
 const [loading, setLoading] = useState(true);
 const [likeLoading, setLikeLoading] = useState(false);
 const [error, setError] = useState(null);
 const [nuevoComentario, setNuevoComentario] = useState({
  nombre: "",
  comentario: "",
  calificacion: 5,
 });
 const [mostrarMensualidades, setMostrarMensualidades] = useState(false);

 useEffect(() => {
  setLoading(true);
  getDetalleProducto(productoId)
   .then((res) => {
    if (res.success) {
     setProducto(res.data);
     setError(null);
    } else {
     setError("Producto no encontrado");
    }
   })
   .catch(() => setError("Error al cargar el producto"))
   .finally(() => setLoading(false));

  getComentarios(productoId).then((res) => {
   if (res.success) setComentarios(res.data);
  });
 }, [productoId]);

 useEffect(() => {
  if (producto) {
   setLikesCount(producto.likes || 0);
  }
 }, [producto]);

const handleLike = async () => {
 if (likeLoading) return;
 setLikeLoading(true);

 try {
  const url = liked ? "/producto_unlike" : "/producto_like"; 
  const res = await PostLikeToggle(productoId, url);
  if (res.success) {
   setLiked(!liked);
   setLikesCount((count) => (liked ? count - 1 : count + 1));
  }
 } catch (error) {
 } finally {
  setLikeLoading(false);
 }
};

 const handleSubmit = (e) => {
  e.preventDefault();
  PostComentario(productoId, nuevoComentario).then((res) => {
   if (res.success) {
    setComentarios((prev) => [
     ...prev,
     {
      id: res.data.comentario_id,
      nombre_usuario: nuevoComentario.nombre,
      calificacion: nuevoComentario.calificacion,
      texto: nuevoComentario.comentario,
     },
    ]);
    setNuevoComentario({ nombre: "", comentario: "", calificacion: 5 });
   }
  });
 };

 if (loading) return <p>Cargando producto...</p>;
 if (error) return <p>{error}</p>;

 return (
  <div className="product-container">
   <div className="product-header">
    <p>
     <strong>Categoría:</strong> {producto.categoria}
    </p>
    <p>
     <strong>Fecha de registro:</strong>{" "}
     {new Date(producto.fecha_registro).toLocaleDateString()} |{" "}
     <strong>Última modificación:</strong>{" "}
     {new Date(producto.fecha_modificacion).toLocaleDateString()} |{" "}
     <strong>Visitas:</strong> {producto.visitas}
    </p>
   </div>

   <div className="product-layout">
    <div style={{ flex: 1 }}>
     <img
      src={
       producto.imagen_url ||
       "/images/products/product_1.jpg"
      }
      alt={producto.modelo}
      style={{ width: "100%", borderRadius: 8 }}
     />
    </div>

    <div style={{ flex: 1 }}>
     <h2 style={{ marginBottom: 10 }}>{producto.modelo}</h2>
     <p>
      <strong>Marca:</strong> {producto.marca}
     </p>
     <p>
      <strong>Calificación promedio:</strong>{" "}
      {producto.calificacion_promedio || "Sin calificaciones"}
     </p>
     <p>
      <strong>Especificaciones:</strong>
     </p>
     <div className="product-specs">{producto.especificaciones}</div>
    </div>

    <div className="product-price-section">
     <p>
      <strong>Precio:</strong> ${producto.precio}
     </p>


     <div className="monthly-payments">
      <button
       onClick={() => setMostrarMensualidades((prev) => !prev)}
       style={{ padding: "6px 12px", cursor: "pointer" }}
      >
       {mostrarMensualidades
        ? "Ocultar pagos a meses"
        : "Mostrar pagos a meses disponibles"}
      </button>

      {mostrarMensualidades && (
       <div className="monthly-box">
        <p>
         <strong>6 meses:</strong> ${producto.mensualidad_6_meses}
        </p>
        <p>
         <strong>12 meses:</strong> ${producto.mensualidad_12_meses}
        </p>
       </div>
      )}
     </div>

     <div className="likes-section">
      <p>
       <strong>Likes:</strong> {likesCount}
      </p>
      <button
       onClick={handleLike}
       disabled={likeLoading}
       style={{ marginTop: 5, padding: "4px 12px", cursor: "pointer" }}
      >
       {likeLoading ? "Cargando..." : "❤️ Me gusta"}
      </button>
     </div>
    </div>
   </div>

   <div className="comments-section">
    <h3>Comentarios</h3>
    {comentarios.length ? (
     comentarios.map((c) => (
      <div
       key={c.id}
       style={{
        marginBottom: 15,
        paddingBottom: 10,
        borderBottom: "1px solid #ccc",
       }}
      >
       <p>
        <strong>{c.nombre_usuario || "Anónimo"}</strong>
       </p>
       <p>⭐ {c.calificacion} / 5</p>
       <p>{c.texto}</p>
      </div>
     ))
    ) : (
     <p>No hay comentarios.</p>
    )}

    <form onSubmit={handleSubmit} className="comment-form">
     <h4>Agregar Comentario</h4>
     <input
      type="text"
      placeholder="Tu nombre"
      value={nuevoComentario.nombre}
      onChange={(e) =>
       setNuevoComentario({ ...nuevoComentario, nombre: e.target.value })
      }
      required
      style={{ width: "100%", marginBottom: 10, padding: 8 }}
     />
     <textarea
      placeholder="Escribe un comentario..."
      value={nuevoComentario.comentario}
      onChange={(e) =>
       setNuevoComentario({ ...nuevoComentario, comentario: e.target.value })
      }
      required
      rows={3}
      style={{ width: "100%", marginBottom: 10, padding: 8 }}
     />
     <label>
      Calificación:
      <select
       value={nuevoComentario.calificacion}
       onChange={(e) =>
        setNuevoComentario({
         ...nuevoComentario,
         calificacion: parseInt(e.target.value),
        })
       }
       style={{ marginLeft: 10 }}
      >
       {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={n}>
         {n}
        </option>
       ))}
      </select>
     </label>
     <button
      type="submit"
      style={{ display: "block", marginTop: 10, padding: "6px 16px" }}
     >
      Enviar
     </button>
    </form>
   </div>
  </div>
 );
}
