import { Calendar, View } from 'react-big-calendar';

import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from '..'
import { localizer } from '../../helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { TCalendarEvent } from '../../store';

export const CalendarPage = () => {
  const defaultView = localStorage.getItem('lastView') as View || 'week';

  const [lastView, setLastView] = useState<View>(defaultView);

  const { events, onSetActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();

  const eventStyleGetter = () => {
    const style: React.CSSProperties = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity:  0.8,
      color: 'white'
    };

    return {
      style
    }
  }

  const onDoubleClick = (event: TCalendarEvent) => {
    onSetActiveEvent(event);
    openDateModal();
  }

  const onSelect = (event: TCalendarEvent) => {
    onSetActiveEvent(event);
  }

  const onViewChanged = (event: View) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', paddingTop: 5 }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />

      <FabAddNew />
    </>
  )
}
