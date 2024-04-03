import { useState } from 'react';
import { addHours } from 'date-fns';
import Modal, { Styles } from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { DocumentCheckIcon } from '@heroicons/react/24/outline';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
  }
}

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setFormValues] = useState({
    title: 'CRistian',
    notes: 'Ramirez',
    start: new Date(),
    endDate: addHours(new Date(), 2),
  })

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    console.log('closing-modal');
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={ isOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className='modal'
      overlayClassName='ReactModalPortal__Background'
      closeTimeoutMS={ 200 }
    >
      <h1 className='text-2xl font-bold'>New Event</h1>
      <hr className='my-3' />
      <form className="mx-3 mb-6">

        <div className="flex flex-col mb-4">
          <label className='font-semibold'>Start Date & Time</label>
          <DatePicker
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
            minDate={ formValues.start }
            selected={ formValues.endDate }
            className='rounded-md w-full'
            onChange={ (event) => onDateChange(event, 'endDate') }
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <hr className='my-3' />
        <div className="flex flex-col mb-4">
          <label className='font-semibold'>Title & Notes</label>
          <input 
              type="text" 
              className="rounded-md"
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

