"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getGameDetails, clearCurrentGame } from "../../store/slices/gamesSlice"

export default function GamesDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentGame } = useSelector((state) => state.games)
  const { loading, error } = useSelector((state) => ({
    loading: state.ui.loading.gameDetails,
    error: state.ui.error.gameDetails,
  }))

  // Estado para favoritos
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    dispatch(getGameDetails(id))

    // Cleanup function
    return () => {
      dispatch(clearCurrentGame())
    }
  }, [dispatch, id])

  // Verificar si el juego está en favoritos
  useEffect(() => {
    if (currentGame) {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
      setIsFavorite(storedFavorites.some((fav) => fav.id === currentGame.id))
    }
  }, [currentGame])

  // Función para alternar favoritos
  const toggleFavorite = () => {
    if (!currentGame) return

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    let newFavorites

    if (isFavorite) {
      // Remover de favoritos
      newFavorites = storedFavorites.filter((fav) => fav.id !== currentGame.id)
    } else {
      // Añadir a favoritos
      newFavorites = [...storedFavorites, currentGame]
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    )
  }

  if (error || !currentGame) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
      </div>
    )
  }

  const game = currentGame

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="container mx-auto p-6">
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-between">
              <h1 className="text-4xl bg-gray-700 bg-opacity-60 rounded-md font-bold text-white py-3 px-4 m-4">
                {game.name}
              </h1>

              {/* Botón de favoritos */}
              <button
                onClick={toggleFavorite}
                className={`m-4 p-3 rounded-full ${
                  isFavorite ? "bg-yellow-400 text-gray-900" : "bg-gray-700 bg-opacity-60 text-white"
                } hover:bg-yellow-500 transition-colors`}
                aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <p className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">⭐ {game.rating}</p>
              <p className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {game.released || "N/A"}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">{game.description_raw}</p>
            <div className="space-y-6">
              {/* Tags */}
              {game.tags && game.tags.length > 0 && (
                <div>
                  <h2 className="font-semibold text-yellow-400 mb-2">Tags:</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/tag/${tag.slug}`}
                        className="px-3 py-1 rounded-full bg-gray-600 text-white text-sm hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Géneros */}
              {game.genres && game.genres.length > 0 && (
                <div>
                  <h2 className="font-semibold text-yellow-400 mb-2">Géneros:</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.slug}`}
                        className="px-3 py-1 rounded-full bg-gray-600 text-white text-sm hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Publishers */}
              {game.publishers && game.publishers.length > 0 && (
                <div>
                  <h2 className="font-semibold text-yellow-400 mb-2">Publishers:</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.publishers.map((publisher) => (
                      <Link
                        key={publisher.id}
                        to={`/publisher/${publisher.id}`}
                        className="px-3 py-1 rounded-full bg-gray-600 text-white text-sm hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                      >
                        {publisher.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Plataformas */}
              {game.platforms && game.platforms.length > 0 && (
                <div>
                  <h2 className="font-semibold text-yellow-400 mb-2">Plataformas:</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform.platform.id}
                        className="px-3 py-1 rounded-full bg-gray-600 text-white text-sm"
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

