import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase/config';
import React, { useContext } from 'react';
import './Login.css';
import { AuthContext } from '../contexts/Auth';

function Login() {
  const { setUser } = useContext(AuthContext);

  const handleSign = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="Login">
      <div className="Login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/300px-WhatsApp.svg.png"
          alt="logo"
          alt=""
        />
        <div className="Login-text">
          <h1>Sign in to WhatsApp-Clone</h1>
        </div>
        <Button type="submit" onClick={handleSign}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
