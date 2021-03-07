import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface AppState {
  user: string;
  selectImage: string;
}

const initialState: AppState = {
  user: "",
  selectImage: "",
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
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
