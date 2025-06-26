<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/data.php';

//este script se encaarga de crear la base de datos y las tablas necesarias
// y de insertar datos de prueba masivos en la base de datos



function log_message(string $message): void
{
    file_put_contents(LOG_FILE, date('[Y-m-d H:i:s] ') . $message . PHP_EOL, FILE_APPEND);

    echo date('[Y-m-d H:i:s] ') . $message . PHP_EOL;
    flush();
}

try {
    $pdo = new PDO("mysql:host=" . DB_HOST , DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    log_message("Conexión exitosa al servidor de base de datos.");

    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME);
    log_message("Base de datos '" . DB_NAME . "' creada o ya existe.");

    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    log_message("Conectado a la base de datos '" . DB_NAME . "'");

    $initSQLPath = __DIR__ . '/init.sql';
    $stmt = $pdo->query("SHOW TABLES LIKE 'productos'");
    if ($stmt->rowCount() === 0) {
        log_message("No existen tablas. Ejecutando init.sql...");
        $initSQL = file_get_contents($initSQLPath);
        $pdo->exec($initSQL);
        log_message("Script init.sql ejecutado correctamente.");
    } else {
        log_message("Las tablas ya existen. No se ejecutó init.sql.");
    }

} catch (PDOException $e) {
    log_message("Error al conectar al servidor de base de datos: " . $e->getMessage());
    exit;
}

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    log_message("Conexión exitosa a la base de datos.");


    $stmt_producto = $pdo->prepare("INSERT INTO productos (modelo, especificaciones, precio, categoria_id, marca, imagen_url) VALUES (?, ?, ?, ?, ?, ?)");
    $countProductos = 0;
    for ($i = 0; $i < 2000; $i++) {
        $imagen_url = "/images/products/producto_" . ($i + 1) . ".jpg";
        $marca = $marcas[array_rand($marcas)];
        $proc = $procesadores[array_rand($procesadores)];
        $memoria = $ram[array_rand($ram)];
        $disco = $discos[array_rand($discos)];
        $categoria = $categorias[array_rand($categorias)];

        $modelo = "PROD-" . strtoupper(bin2hex(random_bytes(3)));

        $especificaciones = "$proc, $memoria RAM, $disco";

        $precio = rand(10000, 60000);

        $stmt_producto->execute([$modelo, $especificaciones, $precio, $categoria, $marca, $imagen_url]);
        $countProductos++;

        if ($countProductos % 50 == 0) {
            log_message("Productos generados: $countProductos");
        }
    }

    log_message("Total productos generados: $countProductos");

    $idsProductos = $pdo->query("SELECT id FROM productos")->fetchAll(PDO::FETCH_COLUMN);

    $stmt_comentario = $pdo->prepare("INSERT INTO comentarios (producto_id, texto, nombre_usuario, calificacion) VALUES (?, ?, ?, ?)");

    $countComentarios = 0;

    $usuarios = [];
    foreach ($nombres as $nombre) {
        foreach ($apellidos as $apellido) {
            $usuarios[] = "$nombre $apellido";
        }
    }
    

    for ($i = 0; $i < 10000; $i++) {
        $producto_id = $idsProductos[array_rand($idsProductos)];
        $texto = $comentarios_textos[array_rand($comentarios_textos)];
        $nombre_usuario = $usuarios[array_rand($usuarios)];
        $calificacion = rand(1, 5);

        $stmt_comentario->execute([$producto_id, $texto, $nombre_usuario, $calificacion]);
        $countComentarios++;

        if ($countComentarios % 100 == 0) {
            log_message("Comentarios generados: $countComentarios");
        }
    }

    log_message("Total comentarios generados: $countComentarios");

    log_message("Generación masiva completada exitosamente.");

} catch (PDOException $e) {
    log_message("Error: " . $e->getMessage());
}
