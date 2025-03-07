"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEvents, registerForEvent, cancelEventRegistration } from "../../store/slices/eventsSlice"

function Events() {
  const dispatch = useDispatch()
  const { eventsList, registeredEvents } = useSelector((state) => state.events)
  const { loading, error } = useSelector((state) => ({
    loading: state.ui.loading.events,
    error: state.ui.error.events,
  }))

  const [filter, setFilter] = useState("all") // "all", "registered"

  useEffect(() => {
    dispatch(getEvents())

    // Verificar si hay un parámetro de filtro en la URL
    const queryParams = new URLSearchParams(window.location.search)
    const filterParam = queryParams.get("filter")
    if (filterParam === "registered") {
      setFilter("registered")
    }
  }, [dispatch])

  const handleRegister = (eventId) => {
    dispatch(registerForEvent(eventId))
  }

  const handleCancelRegistration = (eventId) => {
    dispatch(cancelEventRegistration(eventId))
  }

  const isRegistered = (eventId) => {
    return registeredEvents.includes(eventId)
  }

  const filteredEvents =
    filter === "all" ? eventsList : eventsList.filter((event) => registeredEvents.includes(event.id))

  return (
    <section className="p-5 bg-gray-800 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl">
          {filter === "registered" ? "Mis Eventos" : "Eventos de Videojuegos"}
        </h1>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"
            }`}
          >
            Todos los eventos
          </button>
          <button
            onClick={() => setFilter("registered")}
            className={`px-4 py-2 rounded-lg ${
              filter === "registered" ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"
            }`}
          >
            Mis eventos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-yellow-400 text-xl animate-pulse">Cargando eventos...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-lg">
          <p>Error al cargar los eventos: {error}</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-gray-700 rounded-xl p-8 text-center">
          {filter === "registered" ? (
            <>
              <p className="text-white text-xl mb-4">No estás registrado en ningún evento.</p>
              <button
                onClick={() => setFilter("all")}
                className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition"
              >
                Ver todos los eventos
              </button>
            </>
          ) : (
            <p className="text-white text-xl">No hay eventos disponibles.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <p className="text-yellow-400">{event.date}</p>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-300">{event.description}</p>

                {isRegistered(event.id) ? (
                  <button
                    onClick={() => handleCancelRegistration(event.id)}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                  >
                    Cancelar registro
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition"
                  >
                    Apuntarme
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Events

