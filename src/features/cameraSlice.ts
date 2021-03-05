import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface CameraState {
  cameraImage: string;
}

const initialState: CameraState = {
  cameraImage: ''
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraImage: (state, action: PayloadAction<string>) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state, action: PayloadAction<string>) => {
      state.cameraImage = '';
    },
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state: RootState) => state.camera.cameraImage;

export default cameraSlice.reducer;
