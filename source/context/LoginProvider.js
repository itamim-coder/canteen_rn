import {Text, View} from 'react-native';
import React, {Component, createContext, useContext} from 'react';

const LoginContext = createContext({});
export default class LoginProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  render() {
    const {isLoggedIn} = this.state;
    return (
      <LoginContext.Provider value={{isLoggedIn}}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export const useLogin = () => useContext(LoginContext);
