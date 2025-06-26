import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel({ productos, onClick }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {productos.map((producto) => (
        <div key={producto.id} className="p-2">
          <ProductCard producto={producto} onClick={onClick} />
        </div>
      ))}
    </Slider>
  );
}
