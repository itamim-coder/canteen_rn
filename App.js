import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './source/screens/Login';

import Signup from './source/screens/Signup';
import Verification from './source/screens/Verification';
import { colors } from './source/theme/colors';
import Home from './source/screens/Home';
import Topup from './source/screens/Topup';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Topup" component={Topup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.white,
  }
});
