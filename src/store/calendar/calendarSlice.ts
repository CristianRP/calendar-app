import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().toISOString(),
  title: 'Birthday',
  notes: 'BUy a cake',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  resource: {
    _id: 123,
    name: 'abc'
  }
}

interface Resource {
  _id: number;
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
  events: TCalendarEvent[];
  activeEvent: TCalendarEvent;
}

const initialState: CalendarState = {
  events: [ tempEvent ],
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
    }
  }
});
       
export const { setEvents, setActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
