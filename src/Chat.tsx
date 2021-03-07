import React from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import ReactTimeago from 'react-timeago';

import { selectImage } from './features/appSlice';
import { db } from './firebase';

import './Chat.css';

export default function Chat({id, profilePic, username, timestamp, imageUrl, read}:
                             {id: string, profilePic: string, username: string, timestamp: firebase.firestore.Timestamp, imageUrl: string, read: boolean}) {

  const dispatch = useDispatch();
  const histroy = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true
        },
        {
          merge: true
        }
      );

      histroy.push('/chats/view/');
    }
  }  

  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic}/>
      <div className="chat__info">
        <h4>{username}</h4>
        <p>Tap to view - <ReactTimeago date={new Date(timestamp.toDate()).toUTCString()}/></p>
      </div>

      {!read && <StopRounded className="chat__read"/>}
    </div>
  )
}
