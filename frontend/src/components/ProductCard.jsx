import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ producto, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/producto/${producto.id}`);
    };
    return (
     <div className="card" onClick={handleClick}>
      <div className="card-image">
       <img
        src={producto.imagen_url || "/images/products/product_1.jpg"}
        alt={producto.modelo}
       />
      </div>
      <div className="card-content">
       <h5 className="card-marca">
        {producto.marca} {producto.especificaciones}
       </h5>
       <p className="card-modelo">Modelo: {producto.modelo}</p>
       <p className="card-precio">${producto.precio}</p>
      </div>
     </div>
    );
}

export default ProductCard;
