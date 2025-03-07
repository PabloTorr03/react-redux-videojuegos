import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#282828] shadow text-gray-400 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-6 md:space-y-0">
        
        {/* Nombre y descripción */}
        <div className="md:w-1/3">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-200">Videojuegos Project</h2>
          <p className="mt-2 text-sm sm:text-base">Tu portal para descubrir y explorar videojuegos.</p>
        </div>

        {/* Redes Sociales */}
        <div className="md:w-1/3 text-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Síguenos</h3>
          <div className="flex justify-center items-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-gray-200 transition">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-gray-200 transition">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:text-gray-200 transition">
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div className="md:w-1/3 text-center md:text-right">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Contacto</h3>
          <p className="text-sm sm:text-base">
            <span className="inline-flex items-center"><i className="far fa-envelope mr-2"></i> <a href="mailto:info@videojuegosproject.com" className="hover:text-gray-200">info@videojuegosproject.com</a></span>
          </p>
          <p className="text-sm sm:text-base">
            <span className="inline-flex items-center"><i className="fas fa-phone-alt mr-2"></i> +34 123 456 789</span>
          </p>
        </div>

      </div>

      {/* Línea separadora */}
      <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />

      {/* Copyright */}
      <div className="text-center text-sm">© 2025 Videojuegos Project. Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
