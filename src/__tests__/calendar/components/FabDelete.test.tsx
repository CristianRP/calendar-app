import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../calendar';
import { useCalendarStore } from '../../../hooks/useCalendarStore';
import { TCalendarEvent } from '../../../store';

vi.mock('../../../hooks/useCalendarStore');

describe('Tests on <FabDelete /> component', () => {

  const mockStartDeletingEvent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  })

  test('should render the component with the button display none', () => {

    vi.mocked(useCalendarStore).mockReturnValue({
      hasEventSelected: false,
      events: [],
      activeEvent: {} as TCalendarEvent,
      onSetActiveEvent: vi.fn(),
      startSavingEvent: vi.fn(),
      startDeletingEvent: vi.fn(),
      startLoadingEvents: vi.fn()
    })

    render(
      <FabDelete />
    );

    const btn = screen.getByLabelText('btn-delete');
    expect(btn.classList).toContain('rounded-full');
    expect(btn.classList).toContain('bg-red-700');
    expect(btn.style.display).toBe('none');
  });

  test('should render the component and display the button', () => {

    vi.mocked(useCalendarStore).mockReturnValue({
      hasEventSelected: true,
      events: [],
      activeEvent: {} as TCalendarEvent,
      onSetActiveEvent: vi.fn(),
      startSavingEvent: vi.fn(),
      startDeletingEvent: vi.fn(),
      startLoadingEvents: vi.fn()
    })

    render(
      <FabDelete />
    );

    const btn = screen.getByLabelText('btn-delete');
    expect(btn.style.display).toBe('');
  });

  test('should call startDeletingEvent', () => {

    vi.mocked(useCalendarStore).mockReturnValue({
      hasEventSelected: true,
      events: [],
      activeEvent: {} as TCalendarEvent,
      onSetActiveEvent: vi.fn(),
      startSavingEvent: vi.fn(),
      startDeletingEvent: mockStartDeletingEvent,
      startLoadingEvents: vi.fn()
    })

    render(
      <FabDelete />
    );

    const btn = screen.getByLabelText('btn-delete');
    fireEvent.click(btn)
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});