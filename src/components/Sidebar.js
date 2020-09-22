import React, { useContext, useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from '../firebase/config';
import { AuthContext } from '../contexts/Auth';
// eslint-disable-next-line
import TestingComponent from './TestingComponent';

function Sidebar() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [filteredRoom, setfilteredRoom] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsbscribe = db.collection('rooms').onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsbscribe();
    };
  }, []);

  //Filtering room
  const handleChangeFilter = (e) => {
    console.log(rooms[0].data);
    let filterContacts = rooms.filter((room) => {
      const regex = new RegExp(`${e.target.value}`, 'gi');
      return room.data.name.match(regex);
    });
    setText(e.target.value);
    setfilteredRoom(filterContacts);
  };

  return (
    <div className="Sidebar">
      <div className="Sidebar-header">
        <Avatar src={user?.photoURL} />
        <div className="Sidebar-headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="Sidebar-search">
        <div className="Sidebar-searchContainer">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Search or start a new Chart"
            onChange={handleChangeFilter}
          />
        </div>
      </div>
      <div className="Sidebar-chats">
        <SidebarChat addNewChat />
        {text === ''
          ? rooms.map((room) => (
              <SidebarChat key={room.id} name={room.data.name} id={room.id} />
            ))
          : filteredRoom.map((room) => (
              <SidebarChat key={room.id} name={room.data.name} id={room.id} />
            ))}

        {/* {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.data.name} id={room.id} />
        ))} */}
      </div>
    </div>
  );
}

export default Sidebar;
