"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [sortOption, setSortOption] = useState("none")

  useEffect(() => {
    // Obtener favoritos del localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(storedFavorites)
  }, [])

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const toggleFavorite = (e, gameId) => {
    e.preventDefault()
    e.stopPropagation()

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    const newFavorites = storedFavorites.filter((game) => game.id !== gameId)

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  // Ordenar juegos según la opción seleccionada
  const sortedFavorites = [...favorites]
  if (sortOption === "name") {
    sortedFavorites.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOption === "rating") {
    sortedFavorites.sort((a, b) => b.rating - a.rating)
  } else if (sortOption === "released") {
    sortedFavorites.sort((a, b) => {
      if (!a.released) return 1
      if (!b.released) return -1
      return new Date(b.released) - new Date(a.released)
    })
  }

  if (favorites.length === 0) {
    return (
      <section className="p-5 bg-gray-800 min-h-screen">
        <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl mb-6">Mis Juegos Favoritos</h1>
        <div className="bg-gray-700 rounded-xl p-8 text-center">
          <p className="text-white text-xl">No tienes juegos favoritos guardados.</p>
          <Link
            to="/Games"
            className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition"
          >
            Explorar juegos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="p-5 bg-gray-800 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl">Mis Juegos Favoritos</h1>

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        >
          <option value="none">Ordenar por</option>
          <option value="name">Alfabético</option>
          <option value="rating">Valoración</option>
          <option value="released">Fecha de lanzamiento</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sortedFavorites.map((game) => (
          <Link
            to={`/gamesDetails/${game.id}`}
            key={game.id}
            className="transform transition duration-300 hover:scale-105"
          >
            <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => toggleFavorite(e, game.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{game.name}</h3>
                <p className="text-yellow-400">⭐ {game.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Favorites

