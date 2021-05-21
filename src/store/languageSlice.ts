import i18n from 'i18next';
import { createSlice } from '@reduxjs/toolkit';
import { getStorageLng } from '../i18n/config';

export type languageType = 'zh' | 'en';

interface initialStateType {
  currentLanguage: languageType;
}

const initialState: initialStateType = {
  currentLanguage: getStorageLng(),
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
