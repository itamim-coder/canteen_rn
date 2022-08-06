import {Text, View} from 'react-native';
import React, {Component, createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  return <AuthContext.Provider value="Test">{children}</AuthContext.Provider>;
};
