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
import Transaction from './source/screens/Transaction';
import Deposit from './source/screens/Deposit';
import {Provider} from 'react-redux';
import store from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Navigation from './source/components/navigation';
import AuthNav from './source/components/AuthNav';
import MainNAv from './source/components/MainNAv';
import LoginProvider from './source/context/LoginProvider';

let persistore = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // token: null,
    };
    // console.log('from pro', this.props);
  }

  // getUser = async () => {
  //   const user = await AsyncStorage.getItem('isLoggedIn');
  //   const parse = JSON.parse(user);
  //   // const name = parse.data.name;

  //   this.setState({token: parse});

  //   console.log('token', parse);
  // };
  // componentDidMount() {
  //   this.getUser();
  // }

  render() {
    console.log('app', this.contextType);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
          <Navigation />

          {/* {this.state.token !== null ? <MainNAv /> : <AuthNav />} */}
        </PersistGate>
      </Provider>
    );
  }
}
