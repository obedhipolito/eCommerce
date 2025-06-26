<?php
require_once __DIR__ . '/../models/categoria.php';

class CategoriaController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new \Models\Categoria($pdo);
    }

    public function getCategoriasPadreController()
    {
        header('Content-Type: application/json');
        try {
            $data = $this->model->getCategoriasPadre();
            echo json_encode(['success' => true, 'data' => $data]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function getCategoriasHijasController($padreId)
    {
        header('Content-Type: application/json');
        try {
            $data = $this->model->getCategoriasHijas($padreId);
            echo json_encode(['success' => true, 'data' => $data]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
