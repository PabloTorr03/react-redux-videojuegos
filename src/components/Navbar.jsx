"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import logo from "/logo.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  // Ejemplo de cómo podrías usar el estado de Redux si lo necesitas en el futuro
  // const someStateFromRedux = useSelector(state => state.someSlice.someValue);
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    // Ejemplo de cómo podrías dispatchar una acción si lo necesitas en el futuro
    // dispatch(someAction());
  }

  return (
    <nav className="bg-[#282828] flex items-center justify-between p-4 relative">
      {/* Contenedor del logo y el título */}
      <div className="flex items-center space-x-4">
        <img src={logo || "/placeholder.svg"} className="h-16 w-20" alt="Logo" />
        <span className="text-2xl sm:text-3xl font-semibold text-gray-200 whitespace-nowrap">Videojuegos Project</span>
      </div>

      {/* Botón de menú para móviles */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Links de navegación */}
      <div
        className={`fixed top-20 left-0 w-full bg-[#282828] z-50 transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        } md:opacity-100 md:max-h-screen md:static md:w-auto md:flex md:flex-row md:space-x-6`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-4 text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/Games"
          className={({ isActive }) =>
            `block py-2 px-4 text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }
        >
          VideoJuegos
        </NavLink>
        <NavLink
          to="/Publishers"
          className={({ isActive }) =>
            `block py-2 px-4 text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }
        >
          Publishers
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `block py-2 px-4 text-lg sm:text-2xl font-semibold ${isActive ? "text-gray-400" : "text-gray-200"} hover:text-gray-400 transition`
          }
        >
          Favoritos
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar

