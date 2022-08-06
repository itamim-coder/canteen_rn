import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './source/theme/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';

//Base
import Home from './source/screens/Home';

//Auth
import Login from './source/screens/Login';
import Signup from './source/screens/Signup';
import Verification from './source/screens/Verification';

//Wallet
import Topup from './source/screens/Topup';
import AddtoWallet from './source/screens/AddtoWallet';

//Profile
import Profile from './source/screens/Profile';
import UpdateProfile from './source/screens/UpdateProfile';

//Food Details
import FoodDetails from './source/screens/FoodDetails';

//Order Process
import MyCart from './source/screens/MyCart';
import Payment from './source/screens/Payment';
import MyOrder from './source/screens/MyOrder';
import Checkout from './source/screens/Checkout';
import {AuthProvider} from './source/context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const isLog=()=>{
//   try{
//     let user = await AsyncStorage.getItem
//   }
// }
//Bottom Tab Navigation
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
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Cart"
        component={MyCart}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="shopping-cart" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Order"
        component={MyOrder}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="archive" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  // console.log(prop);
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{header: () => null}}>
        {/* Auth  */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Verification" component={Verification} />

        {/* Bottom Tab Navigation  */}
        <Stack.Screen name="TabNavigator" component={TabNavigator} />

        {/* Wallet  */}
        <Stack.Screen name="Topup" component={Topup} />
        <Stack.Screen name="AddtoWallet" component={AddtoWallet} />

        {/* Profile */}
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />

        {/* Food Details */}
        <Stack.Screen name="FoodDetails" component={FoodDetails} />

        {/* Update Profile */}
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
