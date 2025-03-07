import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchEvents } from "../../data/Events.js"

// Cargar eventos registrados desde localStorage
const loadRegisteredEvents = () => {
  try {
    const registeredEvents = localStorage.getItem("registeredEvents")
    return registeredEvents ? JSON.parse(registeredEvents) : []
  } catch (error) {
    console.error("Error loading registered events from localStorage:", error)
    return []
  }
}

// Guardar eventos registrados en localStorage
const saveRegisteredEvents = (registeredEvents) => {
  try {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents))
  } catch (error) {
    console.error("Error saving registered events to localStorage:", error)
  }
}

// Thunk para cargar eventos
export const getEvents = createAsyncThunk("events/getEvents", async (_, { rejectWithValue }) => {
  try {
    const events = await fetchEvents()
    return events
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  eventsList: [],
  registeredEvents: loadRegisteredEvents(),
}

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    registerForEvent: (state, action) => {
      const eventId = action.payload
      if (!state.registeredEvents.includes(eventId)) {
        state.registeredEvents.push(eventId)
        saveRegisteredEvents(state.registeredEvents)
      }
    },
    cancelEventRegistration: (state, action) => {
      const eventId = action.payload
      state.registeredEvents = state.registeredEvents.filter((id) => id !== eventId)
      saveRegisteredEvents(state.registeredEvents)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.eventsList = action.payload
    })
  },
})

export const { registerForEvent, cancelEventRegistration } = eventsSlice.actions
export default eventsSlice.reducer

