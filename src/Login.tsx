import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { login } from './features/appSlice';
import { auth, provider } from './firebase';

import './Login.css';

export default function Login() {
  const dispatch = useDispatch();
  
  const signIn = () => {
    auth.signInWithPopup(provider)
        .then(result => {
          dispatch(login({
            id: result.user!.uid,
            username: result.user!.displayName,
            profilePic: result.user!.photoURL,
          }));
        })
        .catch(error => alert(error.message));
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="logo" />
        <Button variant="outlined" onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
}
