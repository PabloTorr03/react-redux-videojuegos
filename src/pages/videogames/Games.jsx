"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getGames } from "../../store/slices/gamesSlice"
import { setGamesPage, setGamesSearchTerm } from "../../store/slices/uiSlice"

function Games() {
  const dispatch = useDispatch()
  const { gamesList, gamesCount } = useSelector((state) => state.games)
  const { loading, error, pagination, search } = useSelector((state) => ({
    loading: state.ui.loading.games,
    error: state.ui.error.games,
    pagination: state.ui.pagination,
    search: state.ui.search,
  }))

  const { gamesCurrentPage } = pagination
  const { gamesSearchTerm } = search
  const totalPages = Math.ceil(gamesCount / 20)

  useEffect(() => {
    dispatch(getGames({ searchTerm: gamesSearchTerm, page: gamesCurrentPage }))
  }, [dispatch, gamesSearchTerm, gamesCurrentPage])

  const handlePreviousPage = () => {
    if (gamesCurrentPage > 1) {
      dispatch(setGamesPage(gamesCurrentPage - 1))
    }
  }

  const handleNextPage = () => {
    if (gamesCurrentPage < totalPages) {
      dispatch(setGamesPage(gamesCurrentPage + 1))
    }
  }

  const handleSearchChange = (e) => {
    dispatch(setGamesSearchTerm(e.target.value))
    dispatch(setGamesPage(1)) // Reset to first page on new search
  }

  return (
    <section className="p-5 bg-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
        <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl">Biblioteca de Juegos</h1>

        <div className="flex items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <input
              type="text"
              placeholder="Buscar..."
              value={gamesSearchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 pl-8 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-white text-lg">Cargando juegos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {gamesList && gamesList.length > 0 ? (
              gamesList.map((game) => (
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
              <p className="text-center text-white text-lg col-span-4">No se encontraron juegos</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={gamesCurrentPage === 1}
                className={`px-4 py-2 rounded ${
                  gamesCurrentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                }`}
              >
                Anterior
              </button>
              <span className="text-white">
                Página {gamesCurrentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={gamesCurrentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  gamesCurrentPage === totalPages
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

export default Games

