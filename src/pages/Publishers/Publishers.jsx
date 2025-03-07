"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPublishers } from "../../store/slices/publishersSlice"
import { setPublishersPage, setPublishersSearchTerm } from "../../store/slices/uiSlice"

function Publishers() {
  const dispatch = useDispatch()
  const { publishersList, publishersCount } = useSelector((state) => state.publishers)
  const { loading, pagination, search } = useSelector((state) => ({
    loading: state.ui.loading.publishers,
    pagination: state.ui.pagination,
    search: state.ui.search,
  }))

  const { publishersCurrentPage } = pagination
  const { publishersSearchTerm } = search
  const totalPages = Math.ceil(publishersCount / 20)

  useEffect(() => {
    dispatch(getPublishers({ searchTerm: publishersSearchTerm, page: publishersCurrentPage }))
  }, [dispatch, publishersSearchTerm, publishersCurrentPage])

  const handlePreviousPage = () => {
    if (publishersCurrentPage > 1) {
      dispatch(setPublishersPage(publishersCurrentPage - 1))
    }
  }

  const handleNextPage = () => {
    if (publishersCurrentPage < totalPages) {
      dispatch(setPublishersPage(publishersCurrentPage + 1))
    }
  }

  const handleSearchChange = (e) => {
    dispatch(setPublishersSearchTerm(e.target.value))
    dispatch(setPublishersPage(1)) // Reset to first page on new search
  }

  return (
    <section className="p-5 bg-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-4 sm:space-y-0">
        <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl">Publishers</h1>

        <div className="flex items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <input
              type="text"
              placeholder="Buscar publishers..."
              value={publishersSearchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 pl-8 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-white text-lg">Cargando publishers...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {publishersList.length > 0 ? (
              publishersList.map((publisher) => (
                <Link
                  to={`/publisher/${publisher.id}`}
                  key={publisher.id}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden">
                    <img
                      src={publisher.image_background || "/placeholder.svg"}
                      alt={publisher.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white">{publisher.name}</h3>
                      <p className="text-gray-400">Juegos: {publisher.games_count}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-white text-lg col-span-4">No se encontraron publishers</p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={publishersCurrentPage === 1}
                className={`px-4 py-2 rounded ${
                  publishersCurrentPage === 1
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                }`}
              >
                Anterior
              </button>
              <span className="text-white">
                Página {publishersCurrentPage} de {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={publishersCurrentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  publishersCurrentPage === totalPages
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

export default Publishers

