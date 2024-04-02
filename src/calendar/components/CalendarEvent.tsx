import { EventProps } from 'react-big-calendar';

export const CalendarEvent = ({ event }: EventProps) => {
  
  const { title, resource: user } = event;

  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </>
  )
}
