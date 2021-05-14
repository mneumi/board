import { configureStore } from '@reduxjs/toolkit';
import { languageSlice } from "./languageSlice";

const rootReducer = {
  language: languageSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;