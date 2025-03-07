const API_KEY = "abfcaa3f2880420ba56076c4db68078b"
const BASE_URL = "https://api.rawg.io/api/games"

export const fetchGamesByTag = async (tag, page = 1) => {
  try {
    const url = `${BASE_URL}?key=${API_KEY}&tags=${tag}&page=${page}&page_size=20`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los juegos por tag")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}