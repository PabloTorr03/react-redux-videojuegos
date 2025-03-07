import { createSlice } from "@reduxjs/toolkit"
import { getGames, getGameDetails, getGamesByGenre, getGamesByTag } from "./gamesSlice"
import { getPublishers, getPublisherDetails, getPublisherGames } from "./publishersSlice"

const initialState = {
  loading: {
    games: false,
    gameDetails: false,
    gamesByGenre: false,
    gamesByTag: false,
    publishers: false,
    publisherDetails: false,
  },
  error: {
    games: null,
    gameDetails: null,
    gamesByGenre: null,
    gamesByTag: null,
    publishers: null,
    publisherDetails: null,
  },
  pagination: {
    gamesCurrentPage: 1,
    gamesByGenreCurrentPage: 1,
    gamesByTagCurrentPage: 1,
    publishersCurrentPage: 1,
    publisherGamesCurrentPage: 1,
  },
  search: {
    gamesSearchTerm: "",
    publishersSearchTerm: "",
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGamesPage: (state, action) => {
      state.pagination.gamesCurrentPage = action.payload
    },
    setGamesByGenrePage: (state, action) => {
      state.pagination.gamesByGenreCurrentPage = action.payload
    },
    setGamesByTagPage: (state, action) => {
      state.pagination.gamesByTagCurrentPage = action.payload
    },
    setPublishersPage: (state, action) => {
      state.pagination.publishersCurrentPage = action.payload
    },
    setPublisherGamesPage: (state, action) => {
      state.pagination.publisherGamesCurrentPage = action.payload
    },
    setGamesSearchTerm: (state, action) => {
      state.search.gamesSearchTerm = action.payload
    },
    setPublishersSearchTerm: (state, action) => {
      state.search.publishersSearchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Games loading states
      .addCase(getGames.pending, (state) => {
        state.loading.games = true
        state.error.games = null
      })
      .addCase(getGames.fulfilled, (state) => {
        state.loading.games = false
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading.games = false
        state.error.games = action.payload
      })

      // Game details loading states
      .addCase(getGameDetails.pending, (state) => {
        state.loading.gameDetails = true
        state.error.gameDetails = null
      })
      .addCase(getGameDetails.fulfilled, (state) => {
        state.loading.gameDetails = false
      })
      .addCase(getGameDetails.rejected, (state, action) => {
        state.loading.gameDetails = false
        state.error.gameDetails = action.payload
      })

      // Games by genre loading states
      .addCase(getGamesByGenre.pending, (state) => {
        state.loading.gamesByGenre = true
        state.error.gamesByGenre = null
      })
      .addCase(getGamesByGenre.fulfilled, (state) => {
        state.loading.gamesByGenre = false
      })
      .addCase(getGamesByGenre.rejected, (state, action) => {
        state.loading.gamesByGenre = false
        state.error.gamesByGenre = action.payload
      })

      // Games by tag loading states
      .addCase(getGamesByTag.pending, (state) => {
        state.loading.gamesByTag = true
        state.error.gamesByTag = null
      })
      .addCase(getGamesByTag.fulfilled, (state) => {
        state.loading.gamesByTag = false
      })
      .addCase(getGamesByTag.rejected, (state, action) => {
        state.loading.gamesByTag = false
        state.error.gamesByTag = action.payload
      })

      // Publishers loading states
      .addCase(getPublishers.pending, (state) => {
        state.loading.publishers = true
        state.error.publishers = null
      })
      .addCase(getPublishers.fulfilled, (state) => {
        state.loading.publishers = false
      })
      .addCase(getPublishers.rejected, (state, action) => {
        state.loading.publishers = false
        state.error.publishers = action.payload
      })

      // Publisher details loading states
      .addCase(getPublisherDetails.pending, (state) => {
        state.loading.publisherDetails = true
        state.error.publisherDetails = null
      })
      .addCase(getPublisherDetails.fulfilled, (state) => {
        state.loading.publisherDetails = false
      })
      .addCase(getPublisherDetails.rejected, (state, action) => {
        state.loading.publisherDetails = false
        state.error.publisherDetails = action.payload
      })

      // Publisher games loading states
      .addCase(getPublisherGames.pending, (state) => {
        state.loading.publisherDetails = true
      })
      .addCase(getPublisherGames.fulfilled, (state) => {
        state.loading.publisherDetails = false
      })
      .addCase(getPublisherGames.rejected, (state, action) => {
        state.loading.publisherDetails = false
      })
  },
})

export const {
  setGamesPage,
  setGamesByGenrePage,
  setGamesByTagPage,
  setPublishersPage,
  setPublisherGamesPage,
  setGamesSearchTerm,
  setPublishersSearchTerm,
} = uiSlice.actions

export default uiSlice.reducer

