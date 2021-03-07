import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import User from '../User';

interface AppState {
  user: User | null;
  selectImage: string;
}

const initialState: AppState = {
  user: null,
  selectImage: "",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action: PayloadAction<string>) => {
      state.selectImage = action.payload;
    },
    resetImage: (state) => {
      state.selectImage = "";
    },
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const selectUser = (state: RootState) => state.app.user;

export const selectSelectedImage = (state: RootState) => state.app.selectImage;

export default appSlice.reducer;
