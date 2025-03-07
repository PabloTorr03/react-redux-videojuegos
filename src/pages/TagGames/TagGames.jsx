"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getGamesByTag } from "../../store/slices/gamesSlice"
import { setGamesByTagPage } from "../../store/slices/uiSlice"

function TagGames() {
  const { tag } = useParams()
  const dispatch = useDispatch()
  const { gamesByTag, gamesByTagCount } = useSelector((state) => state.games)
  const { loading, pagination } = useSelector((state) => ({
    loading: state.ui.loading.gamesByTag,
    pagination: state.ui.pagination,
  }))

  const { gamesByTagCurrentPage } = pagination
  const totalPages = Math.ceil(gamesByTagCount / 20)

  useEffect(() => {
    dispatch(getGamesByTag({ tag, page: gamesByTagCurrentPage }))
  }, [dispatch, tag, gamesByTagCurrentPage])

  const handlePreviousPage = () => {
    if (gamesByTagCurrentPage > 1) {
      dispatch(setGamesByTagPage(gamesByTagCurrentPage - 1))
    }
  }

  const handleNextPage = () => {
    if (gamesByTagCurrentPage < totalPages) {
      dispatch(setGamesByTagPage(gamesByTagCurrentPage + 1))
    }
  }

  return (
    <section className="p-5 bg-gray-800">
      <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl mb-4">Juegos con el tag: {tag}</h1>

      {loading ? (
        <p className="text-center text-white text-lg">Cargando juegos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {gamesByTag.length > 0 ? (
              gamesByTag.map((game) => (
                <Link
                  to={`/gamesDetails/${game.id}`}
                  key={game.id}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden">
                    <img
                      src={game.background_image || "/placeholder.svg"}
                      alt={game.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white">{game.name}</h3>
                      <p className="text-yellow-400">⭐ {game.rating}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-white text-lg col-span-4">No se encontraron juegos para este tag</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={gamesByTagCurrentPage === 1}
                className={`px-4 py-2 rounded ${
                  gamesByTagCurrentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                }`}
              >
                Anterior
              </button>
              <span className="text-white">
                Página {gamesByTagCurrentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={gamesByTagCurrentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  gamesByTagCurrentPage === totalPages
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default TagGames

