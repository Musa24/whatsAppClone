import React, { useState } from 'react';

import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
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
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
