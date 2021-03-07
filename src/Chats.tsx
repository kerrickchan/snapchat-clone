import React from 'react';
import { Avatar } from '@material-ui/core';
import {
  Search,
  ChatBubble,
} from '@material-ui/icons';

import Chat from './Chat';
import Post from './Post';
import { db } from './firebase';

import './Chats.css';

export default function Chats() {
  const [posts, setPosts] = React.useState(Array<Post>());

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

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar"/>
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
    </div>
  );
}
