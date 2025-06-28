// este archivo contiene las funciones para interactuar con la API del backend de eCommerce

//en caso de que la URL de la API cambie, actualiza esta constante
const API_URL = 'http://localhost/eCommerce/backend/public_html';

//get
export const getDestacados = async () =>
  fetch(`${API_URL}/productos_destacados`).then(res => res.json());

export const getMasVendidos = async () =>
  fetch(`${API_URL}/productos_mas_vendido`).then(res => res.json());

export const getProductosDestacadosPorCategoria = async (categoriaId) =>
  fetch(`${API_URL}/productos_destacados_categoria?categoria_id=${categoriaId}`).then(res => res.json());

export const getProductosMasVendidosPorCategoria = async (categoriaId) =>
  fetch(`${API_URL}/productos_mas_vendidos_categoria?categoria_id=${categoriaId}`).then(res => res.json());

export const getCategoriasPadre = async () =>
  fetch(`${API_URL}/categorias_padre`).then(res => res.json());

export const getCategoriasHijas = async (padreId) =>
  fetch(`${API_URL}/categorias_hijas?padre_id=${padreId}`).then(res => res.json());

export const getDetalleProducto = async (id) =>
  fetch(`${API_URL}/producto_detalle?id=${id}`).then(res => res.json());

export const getComentarios = async (producto_id) =>
  fetch(`${API_URL}/comentarios_producto?producto_id=${producto_id}`).then(res => res.json());

export const buscarProductos = async (query) =>
  fetch(`${API_URL}/buscar_productos?query=${query}`).then(res => res.json());

export const getProductosPaginados = async (page, limit) =>
  fetch(`${API_URL}/productos_paginados?page=${page}&limit=${limit}`).then(res => res.json());

export const getProductosByCategoria = async (categoriaId, page = 1, limit = 20) =>
  fetch(`${API_URL}/producto_por_categoria?categoria_id=${categoriaId}&page=${page}&limit=${limit}`)
    .then(res => res.json());

export const getCategoriaPorId = async (id) =>
  fetch(`${API_URL}/categoria_por_id?id=${id}`).then(res => res.json());


//post

export async function PostLikeToggle(productoId, url) {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: productoId }),
  });
  return res.json();
}

export async function PostComentario(productoId, comentarioData) {
  return fetch(`${API_URL}/post_comentario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      producto_id: productoId,
      texto: comentarioData.comentario,
      nombre_usuario: comentarioData.nombre,
      calificacion: comentarioData.calificacion,
    }),
  }).then(res => res.json());
}
