import { TrashIcon } from '@heroicons/react/24/outline'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  }

  return (
    <button
      aria-label='btn-delete'
      className='rounded-full bottom-6 bg-red-700 text-3xl p-6 fixed left-6 shadow-lg w-16 h-16'
      onClick={ handleDelete }
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <TrashIcon width={30} height={30} className='text-white ml-[-40%] mt-[-50%]' />
    </button>
  )
}
