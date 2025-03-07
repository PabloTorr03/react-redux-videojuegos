const API_KEY = "abfcaa3f2880420ba56076c4db68078b"
const BASE_URL = "https://api.rawg.io/api/publishers"

export const fetchPublishers = async (searchQuery = "", page = 1) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&search=${searchQuery}&page=${page}&page_size=20`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los publishers")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchPublisherDetails = async (id) => {
  try {
    const url = `${BASE_URL}/${id}?key=${API_KEY}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los detalles del publisher")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}

export const fetchPublisherGames = async (id, page = 1) => {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${id}&page=${page}&page_size=20`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los juegos del publisher")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

