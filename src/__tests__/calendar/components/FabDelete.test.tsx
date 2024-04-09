import { render, screen } from '@testing-library/react';
import { FabDelete } from '../../../calendar';
import ReactModal from 'react-modal';

describe('Tests on <FabDelete /> component', () => {
  test('should render the component', () => {
    ReactModal.setAppElement('body');
    render(
      <FabDelete />
    );
    screen.debug();
  });
});