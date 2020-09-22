import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase/config';
import './SidebarChat.css';

import truncate from '../helpers/truncate';

function SidebarChat({ addNewChat, name, id }) {
  const [messages, setMessages] = useState('');

  useEffect(() => {
    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const handleCreateChat = () => {
    const roomName = prompt('Please Enter chat name');

    if (roomName) {
      //do something
      db.collection('rooms').add({ name: roomName });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="SidebarChat">
        <Avatar />
        <div className="SidebarChat-info">
          <h4>{name}</h4>

          <p>{truncate(messages[0]?.message, 41)}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="SidebarChat" onClick={handleCreateChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
