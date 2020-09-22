import React, { useContext } from 'react';

import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import { AuthContext } from './contexts/Auth';
import { SettingContext } from './contexts/SettingContext';

function App() {
  const { user } = useContext(AuthContext);
  const { toggleRoomSetting } = useContext(SettingContext);

  const handleClick = (e) => {
    const handleMoreOption = e.target.classList[1];
    const roomSettingOption = e.target.parentElement.classList.value;
    if (
      !(
        roomSettingOption === 'RoomSetting' ||
        handleMoreOption === 'handleMoreOption'
      )
    ) {
      toggleRoomSetting(true);
    }
  };

  return (
    <div className="App" onClick={handleClick}>
      {!user ? (
        <Login />
      ) : (
        <div className="App-body">
          <Sidebar />
          <Switch>
            <Route exact path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route exact path="/">
              <div className="App-home"></div>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
