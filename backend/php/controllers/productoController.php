<?php

require_once __DIR__ . '/../models/producto.php';

class ProductoController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new \Models\Producto($pdo);
    }

    public function getMasVendidosController()
    {
        header('Content-Type: application/json');
        try {
            echo json_encode([
                'success' => true,
                'data' => $this->model->getMasVendidos(10)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getDestacadosAleatoriosController()
    {
        header('Content-Type: application/json');
        try {
            echo json_encode([
                'success' => true,
                'data' => $this->model->getDestacadosAleatorios(10)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getMasVendidosPorCategoriaController($categoriaId)
    {
        header('Content-Type: application/json');
        try {
            echo json_encode([
                'success' => true,
                'data' => $this->model->getMasVendidosPorCategoria($categoriaId, 10)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getDestacadosPorCategoriaController($categoriaId)
    {
        header('Content-Type: application/json');
        try {
            echo json_encode([
                'success' => true,
                'data' => $this->model->getDestacadosPorCategoria($categoriaId, 10)
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getDetalleProductoController(int $productoId)
    {
        header('Content-Type: application/json');
        try {
            $this->model->incrementarVisitas($productoId);
            $producto = $this->model->getProductoDetalle($productoId);
            if (!$producto) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Producto no encontrado']);
                return;
            }
            echo json_encode(['success' => true, 'data' => $producto]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }


    public function incrementarLikesController(int $id)
    {
        header('Content-Type: application/json');
        try {
            $ok = $this->model->incrementarLikes($id);
            if ($ok) {
                echo json_encode(['success' => true, 'message' => 'Like registrado']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Error al registrar like']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function buscarProductosController(string $query)
    {
        header('Content-Type: application/json');
        try {
            $resultados = $this->model->buscarProductos($query);
            echo json_encode(['success' => true, 'data' => $resultados]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function getProductosPaginadosController(int $page = 1, int $limit)
    {
        header('Content-Type: application/json');
        try {
            $productos = $this->model->getProductosPaginados($page, $limit);
            echo json_encode(['success' => true, 'data' => $productos]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function getProductosByCategoriaController(int $categoriaId, int $page = 1, int $limit = 12)
    {
        header('Content-Type: application/json');
        try {
            $offset = ($page - 1) * $limit;
            $productos = $this->model->getProductByCategoria($categoriaId, $limit, $offset);
            echo json_encode(['success' => true, 'data' => $productos]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
