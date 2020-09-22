import React, { Component, createContext } from 'react';

export const SettingContext = createContext();

class SettingContextProvider extends Component {
  state = {
    roomSetting: false,
  };

  toggleRoomSetting = (value) => {
    console.log('Setting', value);
    this.setState({ roomSetting: value });
  };

  render() {
    return (
      <SettingContext.Provider
        value={{ ...this.state, toggleRoomSetting: this.toggleRoomSetting }}
      >
        {this.props.children}
      </SettingContext.Provider>
    );
  }
}

export default SettingContextProvider;
