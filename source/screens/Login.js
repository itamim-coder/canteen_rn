import React, {Component, useState} from 'react';
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

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  validate_field = () => {
    const {email, password} = this.state;
    if (email == '') {
      alert('Please fill email');
      return false;
    } else if (password == '') {
      alert('Please fill password');
      return false;
    }
    return true;
  };

  making_api_call = () => {
    if (this.validate_field()) {
      alert('Login Success');
    }
  };
  handleSubmit() {
    console.log(JSON.stringify(this.state.email));
    alert(`${this.state.email}`);
  }

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
                onChangeText={value => {
                  this.setState({email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password}
                onChangeText={value => {
                  this.setState({password: value});
                }}
                // onChangeText={text => setPassword(text)}
                placeholder="Password"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                secureTextEntry
                keyboardType="numeric"
                import
              />
            </View>
            <Button
              onPress={() => {
                this.handleSubmit();
              }}
              type="login"
              navigation={this.props.navigation}
            />
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
            <Text>email {this.state.email}</Text>
            <Text>pass {this.state.password}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;
