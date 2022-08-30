import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyCart from '../screens/MyCart';
import MyOrder from '../screens/MyOrder';
import {colors} from '../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../screens/Profile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default class MainNAv extends Component {
  render() {
    const TabNavigator = () => {
      return (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.darkOrange,
            inactiveTintColor: colors.light,
            showLabel: false,
          }}
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({color}) => (
                <AntDesign name="home" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="My Cart"
            component={MyCart}
            options={{
              tabBarIcon: ({color}) => (
                <AntDesign name="shoppingcart" size={30} color={color} />
              ),
              tabBarBadge: this.props.length,
            }}
          />
          <Tab.Screen
            name="My Order"
            component={MyOrder}
            options={{
              tabBarIcon: ({color}) => (
                <Feather name="list" size={30} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    };
  
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          {/* <Stack.Screen name="ResetRequest" component={ResetRequest} />
          <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
          <Stack.Screen name="Verification" component={Verification} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
