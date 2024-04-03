import { TCalendarEvent, setActiveEvent } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector(state => state.calendar);

  const onSetActiveEvent = (event: TCalendarEvent) => {
    dispatch(setActiveEvent(event));
  }

  return {
    //* Properties
    events,
    activeEvent,

    //* Methods
    onSetActiveEvent,
  }
}
