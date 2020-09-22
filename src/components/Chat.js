import React, { useContext, useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import DeleteIcon from '@material-ui/icons/Delete';

import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../firebase/config';
import firebase from 'firebase';
import { AuthContext } from '../contexts/Auth';
import RoomSetting from './RoomSetting';
import { SettingContext } from '../contexts/SettingContext';

function Chat() {
  const { user } = useContext(AuthContext);
  const { roomSetting, toggleRoomSetting } = useContext(SettingContext);
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  // const [showDeleteBtn, setShowDeleteBtn] = useState(true);
  const [showRoomSetting, setShowRoomSetting] = useState(false);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data()?.name));
    }

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        )
      );

    //Close roomSetting
    if (roomSetting) {
      setShowRoomSetting(false);
    }
  }, [roomId, roomSetting]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      email: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  //Deleting a message
  const handleDelete = (e) => {
    const id = e.target.parentElement.parentElement.parentElement.dataset.id;

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document Successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //OPTION
  const handleMoreOption = () => {
    toggleRoomSetting(false);
    console.log('Hnaldop', roomSetting);
    setShowRoomSetting(!showRoomSetting);
    console.log('Lat line');
  };

  return (
    <div className="Chat">
      <div className="Chat-header">
        <Avatar />
        <div className="Chat-headerInfo">
          <h3>{roomName}</h3>

          {messages.length > 0 && (
            <p>
              last seen{' '}
              {new Date(
                messages[messages.length - 1]?.data?.timestamp?.toDate()
              )?.toUTCString()}
            </p>
          )}
        </div>
        <div className="Chat-headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              onClick={handleMoreOption}
              className="handleMoreOption"
            />
          </IconButton>
        </div>
      </div>

      <div className="Chat-body">
        {messages.map((message) => (
          <p
            key={message.id}
            data-id={message.id}
            className={`Chat-message  ${
              message.data.email === user.email && 'Chat-receiver'
            }   `}
          >
            <span className="Chat-name">{message.data.name}</span>
            {message.data.message}
            <span className="Chat-timestamp">
              {/* handling the timestamp in firebase */}
              {new Date(message?.data.timestamp?.toDate()).toUTCString()}
            </span>
            {message.data.email === user.email && (
              <span className="Chat-delete" onClick={handleDelete}>
                <DeleteIcon />
              </span>
            )}
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
      {showRoomSetting && <RoomSetting />}
    </div>
  );
}

export default Chat;
