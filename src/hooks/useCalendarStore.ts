import { TCalendarEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent, setActiveEvent } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector(state => state.calendar);

  const onSetActiveEvent = (event: TCalendarEvent) => {
    dispatch(setActiveEvent(event));
  }

  const startSavingEvent = async(calendarEvent: TCalendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({...calendarEvent}));
    } else {
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().toISOString() }));
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
