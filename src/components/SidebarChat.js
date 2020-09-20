import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css';

function SidebarChat({ addNewChat }) {
  const handleCreateChat = () => {
    const roomName = prompt('Please Enter chat name');

    if (roomName) {
      //do something
    }
  };

  return !addNewChat ? (
    <div className="SidebarChat">
      <Avatar />
      <div className="SidebarChat-info">
        <h2>Room name</h2>
        <p>Last Message</p>
      </div>
    </div>
  ) : (
    <div className="SidebarChat" onClick={handleCreateChat}>
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
