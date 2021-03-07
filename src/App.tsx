import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChatView from './ChatView';
import Chats from './Chats';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';
import { selectUser } from './features/appSlice';

import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <h1>Let's Build Snapchat</h1>
      <Router>
        <div className="app_body">
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
      </Router>
    </div>
  );
}

export default App;
