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
  _id: string;
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
    }
  }
});
       
export const { setEvents, setActiveEvent } = calendarSlice.actions;
