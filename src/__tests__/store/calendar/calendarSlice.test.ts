import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onUpdateEvent, setActiveEvent } from '../../../store';
import { calendarWithEventsState, event, events, initialState } from '../../fixtures/calendarStates';

describe('Tests on calendarSlice', () => {
  test('should return the default state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  describe('#setActiveEvent', () => {
    test('should active the event', () => {
      const state = calendarSlice.reducer(calendarWithEventsState, setActiveEvent(event));
      expect(state.activeEvent).toEqual(event);
    });
  });

  describe('#onAddNewEvent', () => {
    test('should add a new event', () => {
      const newEvent = { ...event, id: '3' };
      const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
      expect(state.events).toEqual([...events, newEvent]);
    });
  });

  describe('#onUpdateEvent', () => {
    test('should update an event', () => {
      const updatedEvent = { ...event, id: '1', title: 'Title Updated' };
      const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
      expect(state.events).toContain(updatedEvent);
    });
  });

  describe('#onDeleteEvent', () => {
    test('should delete event and remove active event', () => {
      const state = calendarSlice.reducer(calendarWithEventsState, setActiveEvent(events[1]));
      const newState = calendarSlice.reducer(state, onDeleteEvent());
      expect(newState.events).not.contain(events[1]);
    });
  });

  describe('#onLoadEvents', () => {
    test('should load the events', () => {
      const state = calendarSlice.reducer(initialState, onLoadEvents(events));
      expect(state.isLoadingEvents).toBeFalsy();
      expect(state.events).toEqual(events);

      const newState = calendarSlice.reducer(state, onLoadEvents(events));
      expect(newState.events).toHaveLength(events.length);
    });
  });

  describe('#onLogoutCalendar', () => {
    test('should clear events, active event and set isLoading to true', () => {
      const state = calendarSlice.reducer(calendarWithEventsState, onLogoutCalendar());
      expect(state.isLoadingEvents).toBeTruthy();
      expect(state.events).toStrictEqual([]);
      expect(state.activeEvent).toStrictEqual({});
    });
  });
});
