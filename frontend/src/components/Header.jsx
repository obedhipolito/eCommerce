import { useState, useEffect } from 'react';
import { getCategoriasPadre, getCategoriasHijas } from '../api/api';
import { useNavigate} from 'react-router-dom';
import '../styles/Header.css';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const [categoriasPadre, setCategoriasPadre] = useState([]);
  const [categoriasHijas, setCategoriasHijas] = useState([]);
  const [categoriaPadreSeleccionada, setCategoriaPadreSeleccionada] = useState('');
  const [categoriaHijaSeleccionada, setCategoriaHijaSeleccionada] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      navigate('/');
    } else {
      navigate(`/buscar?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleCategoriaPadreChange = (e) => {
    const catId = e.target.value;
    setCategoriaPadreSeleccionada(catId);
    setCategoriaHijaSeleccionada('');
    if (catId) navigate(`/categoria/${catId}`);
    else navigate('/');
    };

    const handleCategoriaHijaChange = (e) => {
     const catHijaId = e.target.value;
     setCategoriaHijaSeleccionada(catHijaId);
     if (catHijaId) navigate(`/categoria/${catHijaId}`);
     else if (categoriaPadreSeleccionada)
      navigate(`/categoria/${categoriaPadreSeleccionada}`);
     else navigate("/");
    };

    useEffect(() => {
        getCategoriasPadre().then(res => {
            if (res.success){
                const únicas = res.data.filter(
            (cat, index, self) =>
            index === self.findIndex(c => c.id === cat.id)
        );
        setCategoriasPadre(únicas);
            }
        });
        }, []);

        useEffect(() => {
        if (categoriaPadreSeleccionada) {
            getCategoriasHijas(categoriaPadreSeleccionada).then(res => {
            if (res.success) setCategoriasHijas(res.data);
            });
        } else {
            setCategoriasHijas([]);
        }
        }, [categoriaPadreSeleccionada]);
  

  return (
   <header className="main-header">
    <div className="header-left">
     <div className="logo">
      <a href="/">eCommerce</a>
     </div>
     <div className="categorias">
      <select
       value={categoriaPadreSeleccionada}
       onChange={handleCategoriaPadreChange}
      >
       <option value="">Categorías</option>
       {categoriasPadre.map((c) => (
        <option key={c.id} value={c.id}>
         {c.nombre}
        </option>
       ))}
      </select>

      {categoriasHijas.length > 0 && (
       <select
        value={categoriaHijaSeleccionada}
        onChange={handleCategoriaHijaChange}
       >
        <option value="">Subcategorías</option>
        {categoriasHijas.map((c) => (
         <option key={c.id} value={c.id}>
          {c.nombre}
         </option>
        ))}
       </select>
      )}
     </div>
    </div>

    <form className="buscador" onSubmit={handleSubmit}>
     <input
      type="text"
      placeholder="Buscar productos..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
     />
     <button type="submit" className="icon-button">
      <svg
       width="20"
       height="20"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
      >
       <circle cx="11" cy="11" r="8" />
       <path d="M21 21l-4.35-4.35" />
      </svg>
     </button>
    </form>

    <div className="header-right"></div>
   </header>
  );
}
