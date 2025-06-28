<?php
require_once __DIR__ . '/../php/config/database.php';
require_once __DIR__ . '/../php/routes/routes.php';


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$router = new Router();

//productos
//obtiene los productos más vendidos en base a las calificaciones
$router->get('/productos_mas_vendido', function () use ($pdo) {
    (new ProductoController($pdo))->getMasVendidosController();
});

//obtiene los productos destacados aleatorios
$router->get('/productos_destacados', function () use ($pdo) {
    (new ProductoController($pdo))->getDestacadosAleatoriosController();
});

//obtiene los productos destacados por categoria basados en los likes
$router->get('/productos_destacados_categoria', function () use ($pdo) {
    if (isset($_GET['categoria_id'])) {
        $catId = intval($_GET['categoria_id']);
        (new ProductoController($pdo))->getDestacadosPorCategoriaController($catId);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro categoria_id']);
    }
});

//obtiene los productos más vendidos por categoria en base a las calificaciones
$router->get('/productos_mas_vendidos_categoria', function () use ($pdo) {
    if (isset($_GET['categoria_id'])) {
        $catId = intval($_GET['categoria_id']);
        (new ProductoController($pdo))->getMasVendidosPorCategoriaController($catId);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro categoria_id']);
    }
});

//obtiene detalle de un producto específico
$router->get('/producto_detalle', function () use ($pdo) {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        (new ProductoController($pdo))->getDetalleProductoController($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro id']);
    }
});

//incrementa los likes de un producto
$router->post('/producto_like', function () use ($pdo) {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput ?: '[]', true);

    if (isset($input['id'])) {
        $id = intval($input['id']);
        (new ProductoController($pdo))->incrementarLikesController($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro id o formato inválido']);
    }
});

$router->post('/producto_unlike', function () use ($pdo) {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput ?: '[]', true);

    if (isset($input['id'])) {
        $id = intval($input['id']);
        (new ProductoController($pdo))->decrementarLikesController($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro id o formato inválido']);
    }
});

//busca productos por marca, especificaciones y modelo
$router->get('/buscar_productos', function () use ($pdo) {
    if (isset($_GET['query'])) {
        $query = trim($_GET['query']);
        (new ProductoController($pdo))->buscarProductosController($query);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro query']);
    }
});

//obtiene productos por categoria
$router->get('/producto_por_categoria', function () use ($pdo) {
    if (isset($_GET['categoria_id'])) {
        $categoriaId = intval($_GET['categoria_id']);
        $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 12;
        (new ProductoController($pdo))->getProductosByCategoriaController($categoriaId, $page, $limit);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro categoria_id']);
    }
});

//obtiene productos paginados
$router->get('/productos_paginados', function () use ($pdo) {
    $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    (new ProductoController($pdo))->getProductosPaginadosController($page, $limit);
});


//comentarios
//obtiene los comentarios de un producto específico
$router->get('/comentarios_producto', function () use ($pdo) {
    if (isset($_GET['producto_id'])) {
        $productoId = intval($_GET['producto_id']);
        (new ComentarioController($pdo))->getComentariosByProductoController($productoId);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro producto_id']);
    }
});

//publica un comentario en un producto específico
$router->post('/post_comentario', function () use ($pdo) {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['producto_id'], $input['texto'], $input['nombre_usuario'], $input['calificacion'])) {
        $productoId = intval($input['producto_id']);
        $texto = trim($input['texto']);
        $nombreUsuario = trim($input['nombre_usuario']);
        $calificacion = intval($input['calificacion']);
        (new ComentarioController($pdo))->postComentarioController($productoId, $texto, $nombreUsuario, $calificacion);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Faltan parámetros requeridos']);
    }
});

//categorias
//obtiene todas las categorias padre
$router->get('/categorias_padre', function () use ($pdo) {
    (new CategoriaController($pdo))->getCategoriasPadreController();
});

//obtiene las categorias hijas de una categoria padre
$router->get('/categorias_hijas', function () use ($pdo) {
    if (isset($_GET['padre_id'])) {
        $padreId = intval($_GET['padre_id']);
        (new CategoriaController($pdo))->getCategoriasHijasController($padreId);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro padre_id']);
    }
});

$router->get('/categoria_por_id', function () use ($pdo) {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        (new CategoriaController($pdo))->getCategoriaByIdController($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el parámetro id']);
    }
});


$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);