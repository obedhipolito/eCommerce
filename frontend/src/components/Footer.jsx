const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <div className="mb-3">
          <a href="#" className="text-secondary mx-2 text-decoration-none">Política de privacidad</a>
          <a href="#" className="text-secondary mx-2 text-decoration-none">Términos y condiciones</a>
          <a href="#" className="text-secondary mx-2 text-decoration-none">Contacto</a>
        </div>
        <p className="mb-0 text-secondary">
          &copy; {new Date().getFullYear()} eCommerce. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;