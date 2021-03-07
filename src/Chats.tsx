import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Avatar } from '@material-ui/core';
import {
  Search,
  ChatBubble,
  RadioButtonUnchecked,
} from '@material-ui/icons';

import Chat from './Chat';
import Post from './Post';
import { auth, db } from './firebase';
import { selectUser } from './features/appSlice';
import { resetCameraImage } from './features/cameraSlice';

import './Chats.css';

export default function Chats() {
  const [posts, setPosts] = React.useState(Array<Post>());
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapchat => {
        setPosts(snapchat.docs.map(
          doc => ({
            id: doc.id,
            data: doc.data(),
          })
        ));
      });
  }, []);

  const takePic = () => {
    dispatch(resetCameraImage);
    history.push('/');
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar src={user!.profilePic!} className="chats__avatar" onClick={() => auth.signOut()}/>
        <div className="chats__search">
          <Search />
          <input type="text" placeholder="Friends"/>
        </div>
        <ChatBubble className="chats__bubble"/>
      </div>

      <div className="chats__posts">
        {
          posts.map(
            ({id, data: { profilePic, username, timestamp, imageUrl, read }},) => (
              <Chat
                key={id}
                id={id}
                profilePic={profilePic}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
              />
            )
          )
        }
      </div>

      <RadioButtonUnchecked
        className="chats__takePic"
        fontSize="large"
        onClick={takePic}
      />
    </div>
  );
}
