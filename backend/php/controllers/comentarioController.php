<?php

require_once __DIR__ . '/../models/comentario.php';

class ComentarioController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new \Models\Comentario($pdo);
    }

    public function getComentariosByProductoController($productoId)
    {
        header('Content-Type: application/json');
        try {
            $comentarios = $this->model->getComentariosByProducto($productoId);
            echo json_encode([
                'success' => true,
                'data' => $comentarios
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    public function postComentarioController($productoId, $texto, $nombreUsuario, $calificacion)
    {
        header('Content-Type: application/json');
        try {
            $comentarioId = $this->model->postComentario($productoId, $texto, $nombreUsuario, $calificacion);
            echo json_encode([
                'success' => true,
                'data' => [
                    'comentario_id' => $comentarioId
                ]
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}