import React from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setCameraImage } from './features/cameraSlice';

import './WebcamCapture.css';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user'
};

export default function WebcamCapture() {
  const dispatch = useDispatch();
  const histroy = useHistory();
  const webcamRef: React.LegacyRef<Webcam> | undefined = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      dispatch(setCameraImage(imageSrc));
      histroy.push('/preview');
    } else {
      console.error('Unknown capture problem');
    }
  }, [webcamRef, histroy, dispatch]);

  return (
    <div className="webcamCapture">
      <Webcam ref={webcamRef}
        videoConstraints={videoConstraints}
        width={videoConstraints.width}
        height={videoConstraints.height}
        screenshotFormat={"image/jpeg"}
        audio={false}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize={"large"}
      />
      {/* <img src={image} alt=""/> */}
    </div>
  )
}
