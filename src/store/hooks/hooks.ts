import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '..';
import { useState } from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useState;
