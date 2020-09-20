import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import db from '../firebase/config';
import './SidebarChat.css';

function SidebarChat({ addNewChat, name, id }) {
  const handleCreateChat = () => {
    const roomName = prompt('Please Enter chat name');

    if (roomName) {
      //do something
      console.log(roomName);
      db.collection('rooms').add({ name: roomName });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="SidebarChat">
        <Avatar />
        <div className="SidebarChat-info">
          <h2>{name}</h2>
          <p>Last Message....</p>
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
