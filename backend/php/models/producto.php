<?php
namespace Models;

class Producto
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getDestacadosAleatorios(int $limit = 10): array
    {
        $sql = "
            SELECT 
                p.id,
                p.modelo,
                p.precio,
                p.marca,
                p.especificaciones,
                p.imagen_url
            FROM productos p
            ORDER BY RAND()
            LIMIT :limit
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    public function getMasVendidos(int $limit = 10): array
    {
        $sql = "
            SELECT 
                p.id,
                p.modelo,
                p.precio,
                p.marca,
                p.especificaciones,
                p.imagen_url,
                ROUND(AVG(c.calificacion), 1) AS calificacion_promedio
            FROM productos p
            LEFT JOIN comentarios c ON p.id = c.producto_id
            GROUP BY p.id
            ORDER BY calificacion_promedio DESC
            LIMIT :limit
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getMasVendidosPorCategoria(int $categoriaId, int $limit = 10): array
    {
        $sql = "
            SELECT 
                p.id,
                p.modelo,
                p.precio,
                p.marca,
                p.especificaciones,
                p.imagen_url,
                COUNT(c.id) AS total_comentarios,
                ROUND(AVG(c.calificacion), 1) AS promedio_calificacion
            FROM productos p
            JOIN comentarios c ON p.id = c.producto_id
            WHERE p.categoria_id = :categoria_id
            GROUP BY p.id
            ORDER BY total_comentarios DESC, promedio_calificacion DESC
            LIMIT :limit
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':categoria_id', $categoriaId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getDestacadosPorCategoria(int $categoriaId, int $limit = 10): array
    {
        $sql = "
            SELECT 
                p.id,
                p.modelo,
                p.precio,
                p.marca,
                p.likes,
                p.especificaciones,
                p.imagen_url
            FROM productos p
            WHERE p.categoria_id = :categoria_id
            ORDER BY p.likes DESC
            LIMIT :limit
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':categoria_id', $categoriaId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getProductoDetalle(int $id): ?array
    {
        $sql = "
            SELECT 
                p.id,
                p.modelo,
                p.especificaciones,
                p.precio,
                p.marca,
                p.visitas,
                p.imagen_url,
                p.likes,
                p.fecha_registro,
                p.fecha_modificacion,
                c.nombre AS categoria,
                ROUND(AVG(com.calificacion), 1) AS calificacion_promedio
            FROM productos p
            LEFT JOIN categorias c ON p.categoria_id = c.id
            LEFT JOIN comentarios com ON p.id = com.producto_id
            WHERE p.id = :id
            GROUP BY p.id
            LIMIT 1
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $producto = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $producto ?: null;
    }

    public function incrementarVisitas(int $id): bool
    {
        $sql = "UPDATE productos SET visitas = visitas + 1  WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    public function incrementarLikes(int $id): bool
    {
        $sql = "UPDATE productos SET likes = likes + 1 WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    public function buscarProductos(string $query, int $limit = 20): array
    {
        $sql = "
            SELECT id, modelo, precio, marca
            FROM productos
            WHERE modelo LIKE :query
            OR especificaciones LIKE :query
            OR marca LIKE :query
            LIMIT :limit
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':query', "%$query%", \PDO::PARAM_STR);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getProductosPaginados(int $page = 1, int $limit): array
    {
        $offset = ($page - 1) * $limit;
        $sql = "SELECT id, modelo, precio, marca, especificaciones, imagen_url
            FROM productos
            ORDER BY id
            LIMIT :limit OFFSET :offset";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getProductByCategoria(int $categoriaId, int $limit, int $offset = 0): array
    {
        $sql = "SELECT id, modelo, precio, marca, especificaciones, imagen_url
            FROM productos
            WHERE categoria_id = :categoria_id
            ORDER BY id
            LIMIT :limit OFFSET :offset";

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':categoria_id', $categoriaId, \PDO::PARAM_INT);
        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }


}
