import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase/config';

function Chat() {
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }

    // return () => {
    //   // cleanup
    // };
  }, [roomId]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit', input);
    setInput('');
  };

  return (
    <div className="Chat">
      <div className="Chat-header">
        <Avatar />
        <div className="Chat-headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen</p>
        </div>
        <div className="Chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="Chat-body">
        <p className={`Chat-message  ${true && 'Chat-receiver'}   `}>
          <span className="Chat-name">Musa</span>
          Hey Guys My name is Musa
          <span className="Chat-timestamp">3.12pm</span>
        </p>
        <p className={`Chat-message  ${false && 'Chat-receiver'}   `}>
          <span className="Chat-name">Musa</span>
          Hey Guys My name is Musa
          <span className="Chat-timestamp">3.12pm</span>
        </p>
      </div>
      <div className="Chat-footer">
        <InsertEmoticonIcon />
        <form onSubmit={hadleSubmit}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send a messsage</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
