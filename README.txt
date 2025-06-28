Proyecto eCommerce
==================
Descripción
-----------
Este proyecto es una aplicación de comercio electrónico desarrollada como parte de un assessment para una posición de desarrollador Fullstack. Implementa un sistema básico de productos, categorías, comentarios, likes, búsquedas y navegación por categorías, utilizando PHP en el backend y React en el frontend.

Nombre completo: José Obed Mariano Hipólito  
Posición deseada: Desarrollador Fullstack  

📊 Nivel de conocimiento en lenguajes (aproximado):  
- PHP: 90%  
- JavaScript: 90%  
- React: 85%  
- MySQL: 85%  
- HTML/CSS/Bootstrap: 90%  

📧 Correo de contacto: obedhipolito@gmail.com  
🔗 GitHub personal: https://github.com/obedhipolito  
🏢 Referencias de trabajo: Desarrollador en NYSATEC y Quadit (proyectos privados)

🧠 Nivel que elegí para resolver el assessment: Nivel **Avanzado**

---

🛠️ Instrucciones de instalación del proyecto:

1. Clonar o descargar este repositorio en tu equipo.
2. Asegúrate de tener instalado **XAMPP 7.4.33** y haber iniciado el servidor Apache y MySQL.
3. Mover la carpeta del proyecto llamada `eCommerce` dentro del directorio `htdocs` de XAMPP (usualmente ubicado en `C:\xampp\htdocs\`).
4. Entrar a la carpeta `backend/install/` y ejecutar el archivo `setup.php` en el navegador para inicializar la base de datos desde el archivo `init.sql`. Ejemplo:  
   `http://localhost/eCommerce/backend/install/setup.php`
5. Crear un archivo `.env` dentro de la carpeta `backend/` con los datos de conexión a la base de datos. Puedes guiarte con el archivo `.env.example`.
6. En una terminal, acceder a la carpeta `frontend/` y ejecutar los siguientes comandos:
    npm install
    npm start
7. Accede al frontend en tu navegador mediante:  
`http://localhost:3000` (o el puerto que indique )

> ⚠️ Los endpoints PHP se sirven desde:  
> `http://localhost/eCommerce/backend/public_html/`
Nota: Los endpoints del backend están definidos en el archivo `api.js` dentro de la carpeta `frontend/src/api`.

---

📋 Actividades completadas:

✅ Proyecto completo en GitHub con ramas master y development.
✅Implementación completa del backend en PHP 7.4 usando arquitectura MVC (modelos, controladores, rutas) y conexión segura con PDO a MySQL.
✅Script de instalación y poblamiento de base de datos (setup.php y init.sql) con más de 2000 productos y 10,000 comentarios generados automáticamente, incluyendo categorías anidadas y accesorios asociados.
✅Configuración y uso de archivo .env para variables de entorno y conexión.
✅Frontend moderno y responsivo desarrollado en React 19 con Bootstrap para estilos.
✅Funcionalidades completas de navegación, incluyendo:
✅Listado y filtrado de productos por categorías padre e hijas.
✅Paginación en listados de productos destacados y más vendidos.
✅Detalle de producto con especificaciones, comentarios y sistema de likes.
✅Búsqueda dinámica de productos por texto.
✅Procedimiento almacenado o equivalente para cálculo de mensualidades a 6 y 12 meses con interés anual del 10%.
✅Pruebas automatizadas y scripts en PHP para validar conexión y manipulación básica de datos.
✅.htaccess configurado para restringir acceso a vistas privadas y con protección de rutas sensibles
✅Código limpio, modular y organizado, con documentación básica para facilitar mantenimiento y escalabilidad.
✅ Vista de productos ordenados por calificación promedio implementada vía consulta SQL optimizada.
✅ Imágenes responsivas y diseño adaptable verificado en distintas resoluciones.
✅ Mockups y capturas de pantalla en carpeta `/screenshots/` para presentación visual móvil.
✅ Todos los elementos visuales requeridos en el frontend (buscador, paginación, filtros, etc.) están presentes, incluso si algunos no tienen funcionalidad completa.

Información  Detallada

Tecnologías utilizadas
----------------------

Frontend
- React ^19.1.0
- Bootstrap para estilos
- JavaScript moderno (ES6+)

Backend
- PHP 7.4
- XAMPP 7.4.33 (servidor local)
- MySQL para la base de datos
- Arquitectura MVC personalizada (Modelos, Controladores, Rutas)
- Uso de .env para configuración de entorno

Herramientas adicionales
- Node.js v20.17.0 (para gestión de paquetes con npm)
- fetch API para llamadas HTTP
- Pruebas con PHP (archivos .php en la carpeta /tests)

Instalación
-----------

Requisitos previos
- Tener instalado XAMPP 7.4.33
- Tener instalado Node.js v20.17.0
- Git (opcional, para clonar el repositorio)

Pasos
1. Clonar o descargar el repositorio.
2. Mover la carpeta `eCommerce` a la ruta:
   C:\xampp\htdocs\
3. Crear un archivo `.env` dentro de la carpeta `backend`, basado en el archivo `env.example`, con tus credenciales de MySQL:

   DB_HOST=localhost
   DB_NAME=ecommerce
   DB_USER=root
   DB_PASS=

4. Ejecutar el archivo setup.php ubicado en:
   http://localhost/eCommerce/backend/install/setup.php

   Este paso creará la base de datos y poblará las tablas usando el script init.sql.

5. En consola, navegar a la carpeta frontend e instalar las dependencias de React:

   cd eCommerce/frontend
   npm install
   npm start

   Esto abrirá el frontend en http://localhost:3000.

Endpoints importantes
---------------------
Todos los endpoints del backend están disponibles desde:
http://localhost/eCommerce/backend/public_html/

Nota: Los endpoints del backend están definidos en el archivo `api.js` dentro de la carpeta `frontend/src/api`.



Ejemplos:
- producto_por_categoria?categoria_id=2
- producto_like
- comentarios
- buscar?query=...

Estructura del Proyecto
-----------------------

eCommerce/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── public_html/
│   ├── install/
│   │   ├── setup.php
│   │   └── init.sql
│   ├── tests/
│   │   ├── test_db_connection.php
│   │   └── test_insert_and_read_product.php
│   └── .env / .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.js
│   └── package.json

Notas importantes
-----------------
- Al seleccionar una categoría o subcategoría desde el Header, los productos se cargan dinámicamente mediante rutas como:
  /categoria/:id
- Se muestra la lista de productos, paginada, y se pueden ver detalles individuales, dar "like", y dejar comentarios con calificación.

Evidencia visual del funcionamiento:
- Página de inicio
- Detalle de producto
- Búsqueda de productos
- comentarios

Puedes abrir estos archivos desde la carpeta /screenshots/ del proyecto.