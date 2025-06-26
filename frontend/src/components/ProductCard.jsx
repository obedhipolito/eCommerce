import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ producto, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/producto/${producto.id}`);
    };
    return(
        <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden max-w-sm"
    >
      <img
        src={producto.imagen || "/images/product/product_1"}
        alt={producto.modelo}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div>
          <h3 className="text-sm text-gray-600">{producto.marca} {producto.especificaciones}</h3>
          <p className="text-lg font-semibold mb-1">Modelo: {producto.modelo}</p>
        </div>
        <div>
          <p className="text-md text-green-600 font-bold mt-2">${producto.precio}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
