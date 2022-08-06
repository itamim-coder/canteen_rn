import React, {Component, useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
import {AuthContext} from '../context/AuthContext';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../../App';
import Home from './Home';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userInfo: '',

      emailerror: '',
      passerror: '',
    };
  }
  // console.log(error)
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
    if (this.validate_field()) {
      const data = {email: this.state.email, password: this.state.password};
      axios
        .post('https://laqil.com/public/api/login', data)
        .then(res => {
          let userInfo = res.data;
          this.setState({userInfo: userInfo});
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('token', res.data.token);
          const status = res.data.data.status;
          console.log(res.data.token);
          if (status == 1) {
            alert(res.data.message);
            this.props.navigation.navigate('TabNavigator');
          }
        })
        .catch(function (error) {
          if (error.response) {
            // let emailerror = error.response.data.errors.email;

            // this.setState({emailerror: emailerror});
            alert(error.response.data.message);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response);
            // console.log(error.response.status);
            // console.log(error.response.headers);
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
    // const val = useContext(AuthContext);
    return (
      <SafeAreaView style={loginContainer}>
        <View style={loginBox}>
          <Text style={[TYPOGRAPHY.h1, {textAlign: 'center'}]}>Log in</Text>
          <Text style={[TYPOGRAPHY.primary, {textAlign: 'center'}]}>
            If you already have a YumCayman.ky account{'\n'}please log in below
          </Text>
          <View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.email}
                // onFocus={this.setState}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({email: value, emailerror: ''});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.emailerror}
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password}
                onChangeText={value => {
                  this.setState({password: value, passerror: ''});
                }}
                // onChangeText={text => setPassword(text)}
                placeholder="Password"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                secureTextEntry
                // keyboardType="numeric"
                // import
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.passerror}
            </Text>
            {/* <Button
              onPress={() => {
                this.making_api_call();
              }}
              type="login"
              navigation={this.props.navigation}
            /> */}
            <TouchableOpacity
              // onPress={handleSignin}
              onPress={() => {
                this.making_api_call();
              }}
              style={BUTTONS.btnPrimary}>
              <Text style={BUTTONS.btnFont}>Login</Text>
            </TouchableOpacity>
            <View style={loginBottom}>
              <TouchableOpacity>
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

export default Login;
