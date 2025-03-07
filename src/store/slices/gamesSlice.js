import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchGames, fetchGameDetails, fetchGamesByGenre } from "../../service/games"
import { fetchGamesByTag } from "../../service/tags"

// Thunks
export const getGames = createAsyncThunk(
  "games/getGames",
  async ({ searchTerm = "", page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchGames(searchTerm, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getGameDetails = createAsyncThunk("games/getGameDetails", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchGameDetails(id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const getGamesByGenre = createAsyncThunk(
  "games/getGamesByGenre",
  async ({ genre, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchGamesByGenre(genre, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getGamesByTag = createAsyncThunk("games/getGamesByTag", async ({ tag, page = 1 }, { rejectWithValue }) => {
  try {
    const response = await fetchGamesByTag(tag, page)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  gamesList: [],
  gamesCount: 0,
  currentGame: null,
  gamesByGenre: [],
  gamesByGenreCount: 0,
  gamesByTag: [],
  gamesByTagCount: 0,
}

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    clearCurrentGame: (state) => {
      state.currentGame = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getGames
      .addCase(getGames.fulfilled, (state, action) => {
        state.gamesList = action.payload.results || []
        state.gamesCount = action.payload.count || 0
      })

      // Handle getGameDetails
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.currentGame = action.payload
      })

      // Handle getGamesByGenre
      .addCase(getGamesByGenre.fulfilled, (state, action) => {
        state.gamesByGenre = action.payload.results || []
        state.gamesByGenreCount = action.payload.count || 0
      })

      // Handle getGamesByTag
      .addCase(getGamesByTag.fulfilled, (state, action) => {
        state.gamesByTag = action.payload.results || []
        state.gamesByTagCount = action.payload.count || 0
      })
  },
})

export const { clearCurrentGame } = gamesSlice.actions
export default gamesSlice.reducer