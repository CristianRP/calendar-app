import { PlusIcon } from '@heroicons/react/24/outline'
import { useUiStore } from '../../hooks'
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { TCalendarEvent } from '../../store';
import { addHours } from 'date-fns';

const templateEvent: TCalendarEvent = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  resource: {
    _id: '123',
    name: 'Cristian',
  }
} 

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { onSetActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    onSetActiveEvent(templateEvent);
    openDateModal();
  }

  return (
    <button
      className='rounded-full bottom-6 bg-blue-700 text-3xl p-6 fixed right-6 shadow-lg w-16 h-16'
      onClick={ handleClickNew }
    >
      <PlusIcon width={35} height={35} className='text-white ml-[-60%] mt-[-50%]' />
    </button>
  )
}
