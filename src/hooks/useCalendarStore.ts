import { calendarApi } from '../api';
import { TCalendarEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent, setActiveEvent } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector(state => state.calendar);
  const { user } = useAppSelector(state => state.auth);

  const onSetActiveEvent = (event: TCalendarEvent) => {
    dispatch(setActiveEvent(event));
  }

  const startSavingEvent = async(calendarEvent: TCalendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({...calendarEvent}));
    } else {
      const { data } = await calendarApi.post('/events', calendarEvent);
      console.log(data)
      dispatch(onAddNewEvent({...calendarEvent, _id: data.event._id, resource: { name: user.name!, _id: user.uid! } }));
    }
  }

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: Object.keys(activeEvent).length > 0,

    //* Methods
    onSetActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
