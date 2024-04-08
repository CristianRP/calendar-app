import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Modal, { Styles } from 'react-modal';
import DatePicker from 'react-datepicker';
import { DocumentCheckIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

import 'react-datepicker/dist/react-datepicker.css';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { TCalendarEvent } from '../../store';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
  }
}

const initState: TCalendarEvent = {
  _id: new Date().toISOString(),
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  resource: {
    _id: '123',
    name: ''
  }
}

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, onSetActiveEvent, startSavingEvent } = useCalendarStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState(initState)

  const titleClass = useMemo(() => {
    if (!formSubmited) return;

    return (!formValues.title || formValues.title?.length <= 0)
      && 'ring-2 ring-red-600 focus:ring focus:ring-red-400'
  }, [formValues.title, formSubmited])

  useEffect(() => {
    if (Object.keys(activeEvent).length > 0) {
      setFormValues({
        ...activeEvent
      })
    }
  }, [activeEvent])
  

  const onInputChange = ({ target }:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event: Date | null, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal();
    onSetActiveEvent({} as TCalendarEvent);
  }

  const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Invalid Dates', 'Check selected dates', 'error');
      return;
    }
    
    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className='modal'
      overlayClassName='ReactModalPortal__Background'
      closeTimeoutMS={ 200 }
    >
      <h1 className='text-2xl font-bold'>New Event</h1>
      <hr className='my-3' />
      <form className="mx-3 mb-6" onSubmit={ onSubmit }>

        <div className="flex flex-col mb-4">
          <label className='font-semibold'>Start Date & Time</label>
          <DatePicker
            name='start'
            selected={ formValues.start }
            className='rounded-md w-full'
            onChange={ (event) => onDateChange(event, 'start') }
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className='font-semibold'>End Date & Time</label>
          <DatePicker
            name='end'
            minDate={ formValues.start }
            selected={ formValues.end }
            className='rounded-md w-full'
            onChange={ (event) => onDateChange(event, 'end') }
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <hr className='my-3' />
        <div className="flex flex-col mb-4">
          <label className='font-semibold'>Title & Notes</label>
          <input 
              type="text" 
              className={`rounded-md ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={ formValues.title }
              onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">A short description</small>
        </div>

        <div className="flex flex-col mb-4">
          <textarea
              typeof='text'
              className="rounded-md"
              placeholder="Notas"
              rows={5}
              name="notes"
              value={ formValues.notes }
              onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Additional Information</small>
        </div>

        <button
          type="submit"
          className="p-2 bg-white ring-1 ring-blue-500 text-blue-500 rounded-md active:bg-blue-400 active:text-white focus:outline-none focus:ring focus:ring-blue-500 flex flex-row items-center"
        >
          <DocumentCheckIcon width={20} height={20} />
          <span>Save</span>
        </button>
      </form>
    </Modal>
  )
}

