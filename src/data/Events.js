// events.js
// Añade o modifica los eventos al gusto
// Las imágenes pueden ser las que tengas en la carpeta public
export const events = [
    {
      id: 1,
      title: "Gaming Expo 2025",
      location: "New York",
      image: "gaming_expo.png",
      date: "15-18 Junio, 2025",
      description: "La mayor exposición de videojuegos del año con los últimos lanzamientos y tecnologías.",
    },
    {
      id: 2,
      title: "Indie Game Developers Meetup",
      location: "San Francisco",
      image: "indie_meetup.png",
      date: "5 Julio, 2025",
      description: "Encuentro para desarrolladores independientes donde compartir ideas y experiencias.",
    },
    {
      id: 3,
      title: "Esports Championship",
      location: "Los Angeles",
      image: "esports.png",
      date: "22-24 Agosto, 2025",
      description: "Campeonato internacional de deportes electrónicos con los mejores equipos del mundo.",
    },
    {
      id: 4,
      title: "Retro Gaming Festival",
      location: "Chicago",
      image: "retro_gaming.png",
      date: "10-12 Septiembre, 2025",
      description: "Festival dedicado a los videojuegos clásicos con torneos, exposiciones y charlas.",
    },
    {
      id: 5,
      title: "Game Developers Conference",
      location: "Boston",
      image: "game_dev_conf.png",
      date: "3-5 Octubre, 2025",
      description: "Conferencia para profesionales de la industria con talleres y presentaciones.",
    },
  ]
  
  // Simula una petición API que devuelve los eventos después de un pequeño retraso.
  export const fetchEvents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(events)
      }, 500) // Simula un retraso de 500 milisegundos
    })
  }
  
  