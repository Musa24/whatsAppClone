import React, { useContext, useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';

import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase/config';
import firebase from 'firebase';
import { AuthContext } from '../contexts/Auth';

function Chat() {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    // return () => {
    //   // cleanup
    // };
  }, [roomId]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className="Chat">
      <div className="Chat-header">
        <Avatar />
        <div className="Chat-headerInfo">
          <h3>{roomName}</h3>

          {messages.length > 0 && (
            <p>
              {' '}
              last seen
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              )?.toUTCString()}
            </p>
          )}
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
        {messages.map((message) => (
          <p
            className={`Chat-message  ${
              message.name === user.displayName && 'Chat-receiver'
            }   `}
          >
            <span className="Chat-name">{message.name}</span>
            {message.message}
            <span className="Chat-timestamp">
              {/* handling the timestamp in firebase */}
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
