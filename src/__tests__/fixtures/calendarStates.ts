import { TCalendarEvent } from '../../store'

export const event = {
  _id: '1',
  start: new Date('2024-04-09 07:00:00'),
  end: new Date('2024-04-09 09:00:00'),
  title: 'Test Event',
  notes: 'Some note',
  bgColor: '',
  resource: {
    _id: '123',
    name: 'Test User',
  }
}

export const events = [
  event,
  {
    ...event,
    _id: '2'
  }
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: {} as TCalendarEvent,
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: {} as TCalendarEvent,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
}
