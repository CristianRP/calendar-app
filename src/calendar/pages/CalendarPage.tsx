import { Calendar, View } from 'react-big-calendar';
import { addHours } from 'date-fns/addHours';

import { CalendarEvent, CalendarModal, Navbar } from '..'
import { localizer } from '../../helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useUiStore } from '../../hooks';

const event = [{
  title: 'Birthday',
  notes: 'BUy a cake',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  resource: {
    _id: 123,
    name: 'abc'
  }
}]

export const CalendarPage = () => {
  const defaultView = localStorage.getItem('lastView') as View || 'week';

  const [lastView, setLastView] = useState<View>(defaultView);

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

  const onDoubleClick = () => {
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({ click: event});
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
        events={event}
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
    </>
  )
}
