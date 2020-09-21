import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, setUser: this.setUser }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContextProvider;
