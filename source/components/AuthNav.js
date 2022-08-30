import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default class AuthNav extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          {/* <Stack.Screen name="ResetRequest" component={ResetRequest} />
          <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
          <Stack.Screen name="Verification" component={Verification} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
