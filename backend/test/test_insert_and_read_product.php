<?php
require_once __DIR__ . '/../install/config.php';

// este script es para probar la inserción y lectura de un producto en la base de datos
// Asegúrate de que la base de datos y la tabla 'productos' ya existan antes de ejecutar este script
// Puedes ejecutar este script desde la línea de comandos o desde un navegador web

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO productos (modelo, especificaciones, precio, categoria_id, marca) VALUES (?, ?, ?, ?, ?)");
    $modelo = "TEST-001";
    $especificaciones = "Intel i5, 8GB RAM, 256GB SSD";
    $precio = 15000;
    $categoria_id = 1;
    $marca = "TestBrand";
    $stmt->execute([$modelo, $especificaciones, $precio, $categoria_id, $marca]);
    echo "Producto insertado correctamente.\n";

    $stmt = $pdo->prepare("SELECT * FROM productos WHERE modelo = ?");
    $stmt->execute([$modelo]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($producto) {
        echo "Producto leído desde la base:\n";
        print_r($producto);
    } else {
        echo "No se encontró el producto insertado.";
    }
} catch (PDOException $e) {
    echo "" Error: " . $e->getMessage();
}
