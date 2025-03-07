"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPublisherDetails, getPublisherGames, clearCurrentPublisher } from "../../store/slices/publishersSlice"
import { setPublisherGamesPage } from "../../store/slices/uiSlice"
import DOMPurify from "dompurify"

function PublisherDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentPublisher, publisherGames, publisherGamesCount } = useSelector((state) => state.publishers)
  const { loading, pagination } = useSelector((state) => ({
    loading: state.ui.loading.publisherDetails,
    pagination: state.ui.pagination,
  }))

  const { publisherGamesCurrentPage } = pagination
  const totalPages = Math.ceil(publisherGamesCount / 20)

  useEffect(() => {
    dispatch(getPublisherDetails(id))
    dispatch(getPublisherGames({ id, page: publisherGamesCurrentPage }))

    // Cleanup function
    return () => {
      dispatch(clearCurrentPublisher())
    }
  }, [dispatch, id, publisherGamesCurrentPage])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPublisherGamesPage(newPage))
    }
  }

  if (loading) {
    return <p className="text-center text-white text-lg">Cargando información del publisher...</p>
  }

  if (!currentPublisher) {
    return <p className="text-center text-red-500 text-lg">Error al cargar la información del publisher.</p>
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">{currentPublisher.name}</h1>
        <div
          className="mb-8 prose prose-invert max-w-none bg-gray-700 p-6 rounded-lg shadow-lg"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentPublisher.description) }}
        />

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Juegos del Publisher</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {publisherGames.map((game) => (
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
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(publisherGamesCurrentPage - 1)}
              disabled={publisherGamesCurrentPage === 1}
              className={`px-4 py-2 rounded ${
                publisherGamesCurrentPage === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              }`}
            >
              Anterior
            </button>
            <span className="text-yellow-400 font-semibold">
              Página {publisherGamesCurrentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(publisherGamesCurrentPage + 1)}
              disabled={publisherGamesCurrentPage === totalPages}
              className={`px-4 py-2 rounded ${
                publisherGamesCurrentPage === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PublisherDetails

