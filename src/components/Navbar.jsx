"use client"

import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import logo from "/logo.png"
import { User } from "lucide-react" // Importamos el icono de usuario

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const dispatch = useDispatch()

  // Simulación de usuario con sesión iniciada
  const user = {
    name: "Usuario Demo",
    avatar: null, // Si quieres añadir un avatar personalizado
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  // Cerrar el menú de usuario al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-[#282828] flex items-center justify-between p-4 relative z-40">
      {/* Contenedor del logo y el título */}
      <div className="flex items-center space-x-4">
        <img src={logo || "/placeholder.svg"} className="h-16 w-20" alt="Logo" />
        <span className="text-2xl sm:text-3xl font-semibold text-gray-200 whitespace-nowrap">Videojuegos Project</span>
      </div>

      {/* Botón de menú para móviles */}
      <div className="md:hidden flex items-center">
        {/* Icono de usuario para móviles */}
        <div className="relative mr-4" ref={userMenuRef}>
          <button
            onClick={toggleUserMenu}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <User className="h-6 w-6" />
          </button>
        </div>

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
        } md:opacity-100 md:max-h-screen md:static md:w-auto md:flex md:flex-row md:space-x-6 md:items-center`}
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

        {/* Icono de usuario para escritorio */}
        <div className="hidden md:block relative ml-4" ref={userMenuRef}>
          <button
            onClick={toggleUserMenu}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Menú global que aparecerá por encima de todo */}
      {userMenuOpen && (
        <div
          className="fixed top-20 right-4 w-48 bg-yellow-400 text-gray-900 rounded-md shadow-lg z-[9999]"
          style={{
            position: "fixed",
            top: "80px",
            right: "16px",
            width: "200px",
            backgroundColor: "#f59e0b",
            color: "#111827",
            borderRadius: "0.375rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            zIndex: 9999,
            border: "2px solid white",
          }}
        >
          <div className="py-2 px-4 border-b border-gray-600">
            <p className="font-medium">{user.name}</p>
          </div>
          <div className="py-1">
            <NavLink
              to="/favorites"
              onClick={() => setUserMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm ${isActive ? "bg-yellow-500" : "hover:bg-yellow-500"}`
              }
            >
              Mis Favoritos
            </NavLink>
            <NavLink
              to="/events?filter=registered"
              onClick={() => setUserMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm ${isActive ? "bg-yellow-500" : "hover:bg-yellow-500"}`
              }
            >
              Mis Eventos
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

