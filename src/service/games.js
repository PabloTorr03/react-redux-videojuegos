const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23"
const BASE_URL = "https://api.rawg.io/api/games"

export const fetchGames = async (searchQuery = "", page = 1) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&search=${searchQuery}&page=${page}&page_size=20`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Error al obtener los datos")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchGameDetails = async (id) => {
  try {
    const url = `${BASE_URL}/${id}?key=${API_KEY}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Error al obtener los datos del juego")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchGamesByGenre = async (genre, page = 1) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&genres=${genre}&page=${page}&page_size=20`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Error al obtener los juegos por género")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

