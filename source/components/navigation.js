import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors} from '../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../screens/Home';
import MyOrder from '../screens/MyOrder';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ResetRequest from '../screens/ResetRequest';
import ConfirmPassword from '../screens/ConfirmPassword';
import Verification from '../screens/Verification';
import Topup from '../screens/Topup';
import AddtoWallet from '../screens/AddtoWallet';
import Profile from '../screens/Profile';
import UpdateProfile from '../screens/UpdateProfile';
import ManageChildren from '../screens/ManageChildren';
import StudentDetails from '../screens/StudentDetails';
import Transaction from '../screens/Transaction';
import Deposit from '../screens/Deposit';
import AddStudent from '../screens/AddStudent';
import FoodDetails from '../screens/FoodDetails';
import AllCategory from '../screens/AllCategory';
import FilterCategory from '../screens/FilterCategory';
import SchoolFood from '../screens/SchoolFood';
import Checkout from '../screens/Checkout';
import Payment from '../screens/Payment';
import MyCart from '../screens/MyCart';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export class Navigation extends Component {
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
    const user = await AsyncStorage.getItem('token');
    const token = JSON.parse(user);
    this.setState({token: token});
    // const dataToken = await AsyncStorage.getItem('token');
    // console.log(token);
    if (!token) {
      this.props.navigation.navigate('Login');
      this.setState({token: null});
    } else {
      this.setState({token: token});
      this.props.navigation.navigate('Home');
    }
  };
  render() {
    console.log('state', this.state?.token);
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
                // <Entypo name="home" size={30} color={color} />
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
          <Stack.Screen
            name="Profile"
            component={Profile}
            // token={this.state.token}
          />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="ManageChildren" component={ManageChildren} />
          <Stack.Screen name="MyOrder" component={MyOrder} />
          <Stack.Screen name="StudentDetails" component={StudentDetails} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Deposit" component={Deposit} />
          <Stack.Screen name="AddStudent" component={AddStudent} />

          {/* Food Details */}
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen name="AllCategory" component={AllCategory} />
          <Stack.Screen name="FilterCategory" component={FilterCategory} />
          <Stack.Screen name="SchoolFood" component={SchoolFood} />

          {/* Update Profile */}
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    length: state.cart.length,
  };
};

export default connect(mapStateToProps)(Navigation);
