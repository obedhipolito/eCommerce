CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  padre_id INT DEFAULT NULL,
  FOREIGN KEY (padre_id) REFERENCES categorias(id) ON DELETE SET NULL
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modelo VARCHAR(100) NOT NULL,
  especificaciones TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria_id INT NOT NULL,
  marca VARCHAR(100) NOT NULL,
  visitas INT DEFAULT 0,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  imagen_url VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  texto TEXT NOT NULL,
  nombre_usuario VARCHAR(100) NOT NULL,
  calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE accesorios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

INSERT INTO categorias (nombre, padre_id) VALUES
('Laptops', NULL),
('Desktops', NULL),
('Accesorios', NULL);

INSERT INTO categorias (nombre, padre_id) VALUES 
('Laptops', NULL), ('Desktops', NULL), ('Accesorios', NULL),
('Gaming', 1), ('Ultrabooks', 1), ('All-in-One', 2),
('Periféricos', 3), ('Monitores', 3), ('Componentes', 2), ('Workstations', 2);

INSERT INTO productos (modelo, especificaciones, precio, categoria_id, marca, visitas, likes, imagen_url) VALUES 
('SlimBook 651', 'Ryzen 5, 8GB RAM, HDD 1TB, Linux', 11070, 6, 'Dell', 11, 14, '/images/products/producto_1.jpg'),
('ZenPro 318', 'Intel i7, 16GB RAM, SSD 512GB, NVIDIA GTX 1660', 26826, 4, 'HyperX', 39, 11, '/images/products/producto_2.jpg'),
('Nova 426', 'Intel i5, 8GB RAM, SSD 256GB, Windows 11', 20588, 4, 'TechOne', 158, 49, '/images/products/producto_3.jpg'),
('ZenPro 670', 'Intel i3, 4GB RAM, 500GB HDD, Windows 10', 14739, 5, 'Asus', 92, 35, '/images/products/producto_4.jpg'),
('GamerX 326', 'Ryzen 5, 8GB RAM, HDD 1TB, Linux', 23013, 4, 'Asus', 103, 39, '/images/products/producto_5.jpg'),
('ZenPro 839', 'Intel i5, 8GB RAM, SSD 256GB, Windows 11', 17380, 4, 'HP', 145, 47, '/images/products/producto_6.jpg'),
('SlimBook 289', 'Intel i7, 16GB RAM, SSD 512GB, NVIDIA GTX 1660', 15296, 4, 'Asus', 49, 32, '/images/products/producto_7.jpg'),
('Nova 525', 'Ryzen 5, 8GB RAM, HDD 1TB, Linux', 28956, 4, 'Asus', 62, 12, '/images/products/producto_8.jpg'),
('SlimBook 590', 'Ryzen 5, 8GB RAM, HDD 1TB, Linux', 17437, 4, 'Asus', 182, 33, '/images/products/producto_9.jpg'),
('GamerX 281', 'Intel i3, 4GB RAM, 500GB HDD, Windows 10', 26060, 6, 'HP', 76, 45, '/images/products/producto_10.jpg');

INSERT INTO accesorios (categoria_id, nombre) VALUES 
(3, 'Mouse Logitech MX Master 3'),
(3, 'Teclado mecánico Razer BlackWidow V3'),
(3, 'Audífonos inalámbricos Sony WH-1000XM4'),
(3, 'Base de enfriamiento Cooler Master Notepal'),
(3, 'Monitor LG UltraGear 27" 144Hz'),
(3, 'Webcam Logitech C920 HD Pro'),
(3, 'Disco duro externo Seagate 2TB'),
(3, 'Hub USB-C Anker PowerExpand'),
(3, 'Impresora HP DeskJet 2720e'),
(3, 'Cámara de seguridad TP-Link Tapo C200');


INSERT INTO comentarios (producto_id, texto, nombre_usuario, calificacion) VALUES 
(1, 'Excelente desempeño y diseño. Muy recomendable.', 'Carlos Ramírez', 5),
(2, 'Buena calidad por el precio, ideal para estudiantes.', 'Ana López', 4),
(3, 'Cumple con lo necesario, aunque algo ruidoso.', 'Jorge Méndez', 3),
(4, 'Muy rápido, silencioso y con buena refrigeración.', 'María García', 5),
(5, 'El diseño y la pantalla son espectaculares.', 'Luis Hernández', 4),
(6, 'Ideal para gaming y edición de video.', 'Fernanda Ortega', 5),
(7, 'La batería dura bastante, pero el peso es elevado.', 'Pablo Torres', 3),
(8, 'Ligero, potente y con excelente pantalla.', 'Valeria Soto', 5),
(9, 'Perfecto para trabajo de oficina y navegación.', 'Eduardo Díaz', 4),
(10, 'Muy buena relación calidad/precio. Satisfecho.', 'Natalia Ruiz', 4);

CREATE FUNCTION calcular_mensualidad(precio DECIMAL(10,2), meses INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN ROUND((precio * 1.10) / meses, 2);
END;



CREATE OR REPLACE VIEW vista_mensualidades AS
SELECT 
  p.id,
  p.modelo,
  p.precio,
  calcular_mensualidad(p.precio, 6) AS mensualidad_6_meses,
  calcular_mensualidad(p.precio, 12) AS mensualidad_12_meses,
  c.nombre AS categoria
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
ORDER BY RAND()
LIMIT 10;

CREATE VIEW productos_con_promedio_calificacion AS
SELECT
    p.id,
    p.modelo,
    p.especificaciones,
    p.precio,
    p.categoria_id,
    p.marca,
    AVG(c.calificacion) AS promedio_calificacion,
    COUNT(c.id) AS total_comentarios
FROM productos p
LEFT JOIN comentarios c ON p.id = c.producto_id
GROUP BY p.id, p.modelo, p.especificaciones, p.precio, p.categoria_id, p.marca
ORDER BY promedio_calificacion DESC;
