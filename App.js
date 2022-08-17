import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

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
import ResetRequest from './source/screens/ResetRequest';
import Verification from './source/screens/Verification';

//Wallet
import Topup from './source/screens/Topup';
import AddtoWallet from './source/screens/AddtoWallet';

//Profile
import Profile from './source/screens/Profile';
import UpdateProfile from './source/screens/UpdateProfile';
import ManageChildren from './source/screens/ManageChildren';

//Food Details
import FoodDetails from './source/screens/FoodDetails';

//Order Process
import MyCart from './source/screens/MyCart';
import Payment from './source/screens/Payment';
import MyOrder from './source/screens/MyOrder';
import Checkout from './source/screens/Checkout';
import {AuthProvider} from './source/context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AllCategory from './source/screens/AllCategory';
import ConfirmPassword from './source/screens/ConfirmPassword';
import FilterCategory from './source/screens/FilterCategory';
import SchoolFood from './source/screens/SchoolFood';
import AddStudent from './source/screens/AddStudent';
import StudentDetails from './source/screens/StudentDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }
  componentDidMount() {
    this.handleToken();
  }
  handleToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    // console.log(dataToken);
    if (!dataToken) {
      // this.props.navigation.replace('Login');
      this.setState({token: null});
    } else {
      this.setState({token: dataToken});
      // this.props.navigation.replace('TabNavigator');
    }
  };
  render() {
    // console.log(this.state.token);
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
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => null}}>
          {/* Auth  */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ResetRequest" component={ResetRequest} />
          <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
          <Stack.Screen name="Verification" component={Verification} />

          {/* Bottom Tab Navigation  */}
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

          {/* Wallet  */}
          <Stack.Screen name="Topup" component={Topup} />
          <Stack.Screen name="AddtoWallet" component={AddtoWallet} />

          {/* Profile */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="ManageChildren" component={ManageChildren} />
          <Stack.Screen name="StudentDetails" component={StudentDetails} />
          <Stack.Screen name="AddStudent" component={AddStudent} />

          {/* Food Details */}
          {/* <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen name="AllCategory" component={AllCategory} />
          <Stack.Screen name="FilterCategory" component={FilterCategory} />
          <Stack.Screen name="SchoolFood" component={SchoolFood} /> */}

          {/* Update Profile */}
          {/* <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
