import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { selectSelectedImage } from './features/appSlice';

import './ChatView.css';

export default function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();

  React.useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history.replace('/chats');
  }

  return (
    <div className="chatview">
      <img src={selectedImage} alt="" onClick={exit}/>
      <CountdownCircleTimer
        isPlaying
        duration={10}
        strokeWidth={6}
        size={50}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {
          ({remainingTime}) => {
            if (remainingTime === 0) {
              exit();
            }

            return remainingTime;
          }
        }
      </CountdownCircleTimer>
    </div>
  )
}
