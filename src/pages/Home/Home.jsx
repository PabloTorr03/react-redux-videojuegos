"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getGames } from "../../store/slices/gamesSlice"


function Home() {
  const dispatch = useDispatch()
  const { gamesList } = useSelector((state) => state.games)
  const { loading, error } = useSelector((state) => ({
    loading: state.ui.loading.games,
    error: state.ui.error.games,
  }))

  useEffect(() => {
    dispatch(getGames({}))
  }, [dispatch])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando juegos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 pb-10">
      <section
        className="w-full mb-6 py-12 md:py-20 lg:py-28 xl:py-36 flex items-center justify-center"
        style={{
          backgroundImage: "url('image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="space-y-2 bg-[#282828] bg-opacity-60 p-4 rounded-md inline-block">
            <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Bienvenido a <span className="text-yellow-400">Videojuego Project</span>
            </h1>
            <p className="text-white text-lg md:text-xl font-semibold">Tu enciclopedia definitiva de videojuegos.</p>
            <p className="text-white text-lg md:text-xl font-semibold">
              Explora la historia, detalles y curiosidades de tus títulos favoritos.
            </p>
          </div>

          <div className="space-x-4 mt-4">
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              to="/Games"
            >
              Infórmese sobre cualquier Videojuego
            </Link>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h1 className="font-rubiksh text-3xl text-yellow-400 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-6">
          Videojuegos Destacados
        </h1>
        <div className="w-full mb-4 mt-6 relative">
          {gamesList.length > 0 ? (
            <Slider {...settings}>
              {gamesList.map((game) => (
                <Link to={`/gamesDetails/${game.id}`} key={game.id}>
                  <div className="text-center relative">
                    <div className="image-container relative h-0 pb-[40%] overflow-hidden rounded-md">
                      <img
                        className="absolute inset-0 w-full h-full object-contain rounded-md"
                        src={game.background_image || "/placeholder.svg"}
                        alt={game.name}
                      />
                    </div>
                    <p className="text-white mt-2">{game.name}</p>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p className="text-white">No se encontraron juegos destacados.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

