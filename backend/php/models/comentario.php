<?php
namespace Models;

class Comentario
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getComentariosByProducto($productoId)
    {
        $sql = "SELECT texto, nombre_usuario, calificacion 
                FROM comentarios 
                WHERE producto_id = :producto_id
                ORDER BY id DESC";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['producto_id' => $productoId]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function postComentario($productoId, $texto, $nombreUsuario, $calificacion)
    {
        $sql = "INSERT INTO comentarios (producto_id, texto, nombre_usuario, calificacion) 
                VALUES (:producto_id, :texto, :nombre_usuario, :calificacion)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            'producto_id' => $productoId,
            'texto' => $texto,
            'nombre_usuario' => $nombreUsuario,
            'calificacion' => $calificacion
        ]);
        return $this->pdo->lastInsertId();
    }
}
