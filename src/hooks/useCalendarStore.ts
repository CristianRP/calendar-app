import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertDateStrigToDateEvent } from '../helpers';
import { TCalendarEvent, onAddNewEvent, onDeleteEvent, onLoadEvents, onUpdateEvent, setActiveEvent } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { AxiosError } from 'axios';
import { AxiosErrorResponse } from '.';

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector(state => state.calendar);
  const { user } = useAppSelector(state => state.auth);

  const onSetActiveEvent = (event: TCalendarEvent) => {
    dispatch(setActiveEvent(event));
  }

  const startSavingEvent = async(calendarEvent: TCalendarEvent) => {
    try {
      if (calendarEvent._id) {
        await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, resource: { name: user.name!, _id: user.uid! }}));
        return;
      }
  
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({...calendarEvent, _id: data.event._id, resource: { name: user.name!, _id: user.uid! } }));
    } catch (error) {
      console.log(error);
      const eventError = error as AxiosError;
      const { data } = eventError.response! as AxiosErrorResponse;
      Swal.fire('Error on saving event', data.msg, 'error');
    }
  }

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  }

  const startLoadingEvents = async() => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertDateStrigToDateEvent(data.events);
      dispatch(onLoadEvents(events as TCalendarEvent[]));
    } catch(error) {
      console.log(error);
    }
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
    startLoadingEvents,
  }
}
