import { useRouteError, Link } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  // Podemos usar Redux aquí si necesitamos acceder a algún estado global
  // Por ejemplo, para mostrar un mensaje de error personalizado basado en el estado
  // const { someState } = useSelector(state => state.someSlice)

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Fondo con efecto de "glitch" */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-yellow-400 animate-pulse"></div>
        <div className="w-full h-full bg-red-500 animate-pulse delay-75 absolute top-0 left-0"></div>
        <div className="w-full h-full bg-blue-500 animate-pulse delay-150 absolute top-0 left-0"></div>
      </div>

      {/* Contenido principal */}
      <div className="z-10 text-center">
        <h1 className="text-9xl font-bold text-yellow-400 mb-4 animate-bounce">404</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Oops! Página no encontrada</h2>
        <p className="text-xl text-gray-300 mb-6 max-w-lg">
          Lo sentimos, parece que te has perdido en el ciberespacio. La página que buscas no existe o ha sido movida.
        </p>
        <p className="text-lg text-red-400 mb-8">
          <i>{error.statusText || error.message}</i>
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="flex items-center justify-center bg-yellow-400 text-gray-900 py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300 text-lg font-semibold"
          >
            🏠 Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-500 transition duration-300 text-lg font-semibold"
          >
            ⬅️ Volver
          </button>
        </div>
      </div>

      {/* Decoración adicional */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500"></div>
    </div>
  )
}

