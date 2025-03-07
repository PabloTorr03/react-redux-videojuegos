import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchPublishers, fetchPublisherDetails, fetchPublisherGames } from "../../service/publishers"

// Thunks
export const getPublishers = createAsyncThunk(
  "publishers/getPublishers",
  async ({ searchTerm = "", page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchPublishers(searchTerm, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getPublisherDetails = createAsyncThunk(
  "publishers/getPublisherDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPublisherDetails(id)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getPublisherGames = createAsyncThunk(
  "publishers/getPublisherGames",
  async ({ id, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetchPublisherGames(id, page)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  publishersList: [],
  publishersCount: 0,
  currentPublisher: null,
  publisherGames: [],
  publisherGamesCount: 0,
}

const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {
    clearCurrentPublisher: (state) => {
      state.currentPublisher = null
      state.publisherGames = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getPublishers
      .addCase(getPublishers.fulfilled, (state, action) => {
        state.publishersList = action.payload.results || []
        state.publishersCount = action.payload.count || 0
      })

      // Handle getPublisherDetails
      .addCase(getPublisherDetails.fulfilled, (state, action) => {
        state.currentPublisher = action.payload
      })

      // Handle getPublisherGames
      .addCase(getPublisherGames.fulfilled, (state, action) => {
        state.publisherGames = action.payload.results || []
        state.publisherGamesCount = action.payload.count || 0
      })
  },
})

export const { clearCurrentPublisher } = publishersSlice.actions
export default publishersSlice.reducer

