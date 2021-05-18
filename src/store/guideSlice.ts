import { createSlice } from '@reduxjs/toolkit';
import { GuideType } from '../common/interface';

interface initialStateType {
  currentGuide: GuideType;
}

const initialState: initialStateType = {
  currentGuide: 'link',
};

export const guideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    changeGuide: (state, action: { type: string; payload: GuideType }) => {
      state.currentGuide = action.payload;
    },
  },
});
