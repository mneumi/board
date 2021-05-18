import { configureStore } from '@reduxjs/toolkit';
import { languageSlice } from './languageSlice';
import { guideSlice } from './guideSlice';

const rootReducer = {
  language: languageSlice.reducer,
  guide: guideSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
