import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns/addHours';

import { CalendarEvent, Navbar } from '..'
import { localizer } from '../../helpers';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const event = [{
  title: 'Birthday',
  notes: 'BUy a cake',
  start: new Date(),
  end: addHours(new Date(), 2),
  // bgColor: '#fafafa',
  resource: {
    _id: 123,
    name: 'abc'
  }
}]

export const CalendarPage = () => {
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

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)', paddingTop: 5 }}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
      />
    </>
  )
}
