<?php
namespace Models;

class Categoria
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getCategoriasPadre(): array
    {
        $sql = "SELECT id, nombre FROM categorias WHERE padre_id IS NULL ORDER BY nombre";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getCategoriasHijas(int $padreId): array
    {
        $sql = "SELECT id, nombre FROM categorias WHERE padre_id = :padre_id ORDER BY nombre";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['padre_id' => $padreId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getCategoriaById(int $id): array
    {
        $sql = "SELECT id, nombre, padre_id FROM categorias WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
