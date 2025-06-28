import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center p-5" style={{ maxWidth: '600px' }}>
        <img 
          src="/images/404.png" 
          alt="Página no encontrada" 
          className="img-fluid mb-4"
          style={{ maxHeight: '300px' }}
        />
        <h2 className="h3 mb-3">¡Ups! Página no encontrada</h2>
        <p className="lead mb-4">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary btn-lg px-4"
        >
          <i className="bi bi-house-door me-2"></i>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;