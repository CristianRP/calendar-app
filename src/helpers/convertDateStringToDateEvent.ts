import { addHours, parseISO } from 'date-fns'

type TBackendEvent = {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  resource?: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
  };
}

export const convertDateStrigToDateEvent = (events: TBackendEvent[]) => {
  return events.map(event => {
    event.start = event.start ? parseISO(event.start.toString()) : new Date();
    event.end = event.end ? parseISO(event.end.toString()) : addHours(new Date(), 2);
    event.resource = event.user;
    return event;
  })
}
