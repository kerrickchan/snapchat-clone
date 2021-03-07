import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from './Login';
import ChatView from './ChatView';
import Chats from './Chats';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';

import logo from "./images/snapchat.jpg";
import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          id: authUser.uid,
          username: authUser.displayName,
          profilePic: authUser.photoURL,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {
          !user ?
          <Login /> :
          <>
            <img className="app__logo"
              src={logo}
              alt="App Logo"
            />
            <div className="app__body">
              <div className="app__background">
                <Switch>
                  <Route path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        }
      </Router>
    </div>
  );
}

export default App;
