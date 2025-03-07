import { configureStore } from "@reduxjs/toolkit"
import gamesReducer from "./slices/gamesSlice"
import publishersReducer from "./slices/publishersSlice"
import uiReducer from "./slices/uiSlice"
import eventsReducer from "./slices/eventsSlice"

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    publishers: publishersReducer,
    ui: uiReducer,
    events: eventsReducer,
  },
})
