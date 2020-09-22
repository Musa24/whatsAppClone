import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import db from '../firebase/config';
import './RoomSetting.css';

const handleDeleteRoom = (roomId, history) => {
  if (roomId) {
    db.collection('rooms')
      .doc(roomId)
      .delete()
      .then(() => {
        console.log('Successfully delete');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function RoomSetting() {
  const { roomId } = useParams();
  const history = useHistory();
  return (
    <div className="RoomSetting">
      <div>Contact info</div>
      <div>Select messages</div>
      <div>Mute notifications</div>
      <div>Clear Message</div>
      <div onClick={() => handleDeleteRoom(roomId, history)}>Delete room</div>
    </div>
  );
}

export default RoomSetting;
