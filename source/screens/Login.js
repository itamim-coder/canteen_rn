import React, {Component, useContext, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';

import BUTTONS from '../theme/Buttons';
import TYPOGRAPHY from '../theme/typography';
import {Fonts} from '../theme/Fonts';
import INPUT from '../theme/Input';
import SCREEN from '../theme/Screen';
import Button from '../components/Button';
import {Signin} from '../../redux/authAction';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userInfo: '',
      emailerror: '',
      passerror: '',
      disabled: false,
      indicator: false,
      token: '',
      secureTextEntry: true,
      flag: 0,
    };
  }

  validate_field = () => {
    const {email, password} = this.state;

    if (email == '' && password == '') {
      this.setState({emailerror: 'Please enter your email'});
      this.setState({passerror: 'Please enter your password'});
      return false;
    } else if (email == '') {
      this.setState({emailerror: 'email input'});
      return false;
    } else if (password == '') {
      this.setState({passerror: 'pass input'});
      return false;
    }
    return true;
  };
  making_api_call = () => {
    console.log('1');
    if (this.validate_field()) {
      const data = {email: this.state.email, password: this.state.password};
      console.log('2');
      this.setState({indicator: true});
      this.setState({disabled: true});
      setTimeout(() => {
        this.setState({indicator: false});
        this.setState({disabled: false});
      }, 1500);

      axios
        .post('https://laqil.com/public/api/login', data)
        .then(res => {
          console.log('3');
          let userInfo = res.data;
          console.log(userInfo);
          this.setState({userInfo: userInfo});

          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('token', JSON.stringify(res.data.token));
          const status = res.data.data.status;
          console.log(res.data.token);

          if (status == 1) {
            AsyncStorage.setItem('isLoggedIn', '1');

            // alert(res.data.message);
            // this.setState({indicator: false});
            // this.setState({disabled: false});
            // console.log(this.props.navigation.navigate('TabNavigator'));

            console.log('4 login accept');

            // this.props.navigation.navigate('TabNavigator');
          }
        })
        .catch(function (error) {
          console.log('5 error');
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    }
  };

  render() {
    const loginContainer = {
      ...SCREEN.screen,
      backgroundColor: colors.white,
      flex: 1,
    };
    const loginBox = {
      flex: 1,
      justifyContent: 'center',
    };
    const loginBottom = {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
    console.log('signin', this.props.dispatch);
    return (
      <SafeAreaView style={loginContainer}>
        <View style={loginBox}>
          <Text style={[TYPOGRAPHY.h2, {textAlign: 'center'}]}>Sign in</Text>
          <Text
            style={[
              TYPOGRAPHY.primary,
              {textAlign: 'center', color: colors.ash, marginVertical: 5},
            ]}>
            If you already have a YumCayman.ky account{'\n'}please log in below
          </Text>
          <View>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              Email Address
            </Text>
            <View style={[INPUT.inputContainer]}>
              <TextInput
                value={this.state.email}
                onChangeText={value => {
                  this.setState({email: value, emailerror: ''});
                }}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>

            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.emailerror}
            </Text>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              Password
            </Text>
            <View>
              <View style={[INPUT.inputContainer]}>
                <TextInput
                  value={this.state.password}
                  onChangeText={value => {
                    this.setState({password: value, passerror: ''});
                  }}
                  placeholder="Password"
                  placeholderTextColor={'grey'}
                  style={[INPUT.input]}
                  secureTextEntry={this.state.secureTextEntry}
                />
                {this.state.secureTextEntry === true ? (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry: false})}>
                    <Ionicons
                      name="eye-off"
                      size={24}
                      color="black"
                      style={{margin: 10, color: colors.light}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry: true})}>
                    <Ionicons
                      name="eye"
                      size={24}
                      color="black"
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.passerror}
            </Text>
            <Button type="login" navigation={this.props.navigation} />

            {this.state.indicator === true ? (
              (console.log(this.state.indicator),
              (
                <View>
                  <TouchableOpacity
                    disabled={this.state.disabled}
                    style={BUTTONS.btnPrimary}>
                    <ActivityIndicator color={colors.white} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.making_api_call();
                  }}
                  disabled={this.state.disabled}
                  style={BUTTONS.btnPrimary}>
                  <Text style={BUTTONS.btnFont}>Login</Text>
                  {/* <ActivityIndicator color={colors.white} /> */}
                </TouchableOpacity>
              </View>
            )}

            <View style={loginBottom}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ResetRequest')}>
                <Text style={{color: colors.light, fontFamily: Fonts.primary}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={{color: colors.light, fontFamily: Fonts.primary}}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  // console.log(cartProduct);
  return {
    Signin: (email, password) => {
      dispatch(Signin(email, password));
    },
  };
};

export default connect(mapDispatchToProps)(Login);
