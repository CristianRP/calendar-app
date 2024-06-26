import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../store';

describe('Tests on uiSlice', () => {
  test('should return the default state', () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
  });

  test('should change the isDateModalOpen', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});