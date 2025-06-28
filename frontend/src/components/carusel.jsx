import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../styles/carusel.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel({ productos, onClick }) {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClick = (id) => {
   navigate(`/producto/${id}`);
  };

  return (
   <Slider {...settings}>
    {productos.map((producto) => (
     <div
      key={producto.id}
      className="carousel-item"
      onClick={() => handleClick(producto.id)}
      style={{ cursor: "pointer" }}
     >
      <div className="carousel-product-card">
       <div className="carousel-product-image">
        <img
         src={producto.imagen_url || "/images/products/product_1.jpg"}
         alt={producto.modelo}
        />
       </div>
       <div className="carousel-product-info">
        <p className="marca">
         {producto.marca} {producto.especificaciones}
        </p>
        <h2 className="modelo">{producto.modelo}</h2>
        <p className="precio">${producto.precio}</p>
        <p className="likes">❤️ {producto.likes} Likes</p>
       </div>
      </div>
     </div>
    ))}
   </Slider>
  );
}
