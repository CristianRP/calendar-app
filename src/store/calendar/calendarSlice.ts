import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Resource {
  _id: string;
  name: string;
}

export type TCalendarEvent = {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  resource: Resource;
}

type CalendarState = {
  isLoadingEvents: boolean;
  events: TCalendarEvent[];
  activeEvent: TCalendarEvent;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: {} as TCalendarEvent,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<TCalendarEvent[]>) => {
      state.events = action.payload;
    },
    setActiveEvent: (state, action: PayloadAction<TCalendarEvent>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action: PayloadAction<TCalendarEvent>) => {
      state.events.push(action.payload);
      state.activeEvent = {} as TCalendarEvent;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<TCalendarEvent>) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload
        }
        return event;
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = {} as TCalendarEvent;
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<TCalendarEvent[]>) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent._id === event._id);
        if (!exists) {
          state.events.push(event);
        }
      })
    }
  }
});
       
export const { setEvents, setActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;
