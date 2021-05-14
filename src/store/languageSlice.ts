import { createSlice } from '@reduxjs/toolkit';
import i18n from "i18next";

export type languageType = 'zh' | 'en';

interface initialStateType {
  currentLanguage: languageType;
}

const initialState: initialStateType = {
  currentLanguage: 'zh',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (
      state,
      action: { type: string; payload: languageType }
    ) => {
      state.currentLanguage = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});
