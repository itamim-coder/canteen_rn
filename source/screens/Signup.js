import React, {Component} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';
import {Fonts} from '../theme/Fonts';
import Button from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statusbar from '../components/Statusbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      registerUser: '',
      name_error: '',
      email_error: '',
      phone_error: '',
      password_error: '',
      password_confirmation_error: '',
      indicator: false,
      disabled: false,
      user_type: 'parent',
      secureTextEntry1: true,
      secureTextEntry2: true,
    };
  }
  validate_field = () => {
    const {name, email, phone, password, password_confirmation} = this.state;

    if (
      name == '' &&
      email == '' &&
      phone == '' &&
      password == '' &&
      password_confirmation == ''
    ) {
      this.setState({name_error: 'Please enter your valid name'});
      this.setState({email_error: 'Please enter your valid email'});
      this.setState({phone_error: 'Please enter your valid phone'});
      this.setState({password_error: 'Please enter your password'});
      this.setState({
        password_confirmation_error: 'Please enter retype password',
      });
      return false;
    } else if (name == '') {
      this.setState({name_error: 'Please enter your valid name'});
      return false;
    } else if (email == '') {
      this.setState({email_error: 'Please enter your email'});
      return false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      this.setState({email_error: 'Email Address should be valid'});
      return false;
    } else if (phone == '') {
      this.setState({phone_error: 'Please enter your valid phone'});
      return false;
    } else if (password == '') {
      this.setState({password_error: 'Please enter your valid password'});
      return false;
    } else if (password_confirmation == '') {
      this.setState({
        password_confirmation_error: 'Please enter your password',
      });

      return false;
    } else if (password_confirmation != password) {
      this.setState({
        password_confirmation_error: 'Password didnot match',
      });
      return false;
    }
    return true;
  };

  register_api_call = () => {
    if (this.validate_field()) {
      const data = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        user_type: this.state.user_type,
        password_confirmation: this.state.password_confirmation,
      };
      this.setState({indicator: true});
      this.setState({disabled: true});

      setTimeout(() => {
        this.setState({indicator: false});
        this.setState({disabled: false});
      }, 1500);
      axios
        .post('https://laqil.com/public/api/register', data)
        .then(res => {
          let registerUser = res.data;
          this.setState({registerUser: registerUser});

          AsyncStorage.setItem('token', JSON.stringify(res.data.token));
          console.log(registerUser);
          const status = res.data.status;
          console.log(res.data);
          if (status == true) {
            // alert(res.data.message);
            this.props.navigation.navigate('TabNavigator');
            this.setState({indicator: false});
            this.setState({disabled: false});
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.message);

            console.log(error.response.data.errors);

            this.setState({indicator: false});
            this.setState({disabled: false});
          }
        });
    }
  };

  render() {
    const container = {
      backgroundColor: colors.white,
      flex: 1,
    
    };
    const box = {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 100,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar />
        <ScrollView style={[SCREEN.screen, container]}>
          <View style={box}>
            <Text style={[TYPOGRAPHY.h2, {textAlign: 'center'}]}>
              Create Account
            </Text>
            <Text
              style={[
                TYPOGRAPHY.primary,
                {textAlign: 'center', color: colors.ash, marginVertical: 5},
              ]}>
              If you don't have an account, please provide your email and phone
              to register.
            </Text>

            <View>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Full Name
              </Text>
              <View style={INPUT.inputContainer}>
                <TextInput
                  value={this.state.name}
                  onChangeText={value => {
                    this.setState({name: value, name_error: ''});
                  }}
                  placeholder="Name"
                  placeholderTextColor={'grey'}
                  style={INPUT.input}
                />
              </View>
              <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
                {this.state.name_error}
              </Text>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Email Address
              </Text>
              <View style={INPUT.inputContainer}>
                <TextInput
                  value={this.state.email}
                  onChangeText={value => {
                    this.setState({email: value, email_error: ''});
                  }}
                  placeholder="Email"
                  placeholderTextColor={'grey'}
                  style={INPUT.input}
                />
              </View>
              <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
                {this.state.email_error}
              </Text>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Phone
              </Text>
              <View style={INPUT.inputContainer}>
                <TextInput
                  value={this.state.phone}
                  onChangeText={value => {
                    this.setState({phone: value, phone_error: ''});
                  }}
                  placeholder="Phone"
                  placeholderTextColor={'grey'}
                  style={INPUT.input}
                  keyboardType="numeric"
                />
              </View>
              <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
                {this.state.phone_error}
              </Text>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Password
              </Text>
              <View style={[INPUT.inputContainer]}>
                <TextInput
                  value={this.state.password}
                  onChangeText={value => {
                    this.setState({password: value, passerror: ''});
                  }}
                  placeholder="Password"
                  placeholderTextColor={'grey'}
                  style={[INPUT.input]}
                  secureTextEntry={this.state.secureTextEntry1}
                />
                {this.state.secureTextEntry1 === true ? (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry1: false})}>
                    <Ionicons
                      name="eye-off"
                      size={24}
                      color="black"
                      style={{margin: 10, color: colors.light}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry1: true})}>
                    <Ionicons
                      name="eye"
                      size={24}
                      color="black"
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* <View style={INPUT.inputContainer}>
                <TextInput
                  value={this.state.password}
                  onChangeText={value => {
                    this.setState({password: value, password_error: ''});
                  }}
                  placeholder="Password"
                  placeholderTextColor={'grey'}
                  style={INPUT.input}
                  secureTextEntry
                />
              </View> */}
              <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
                {this.state.password_error}
              </Text>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Retype Password
              </Text>
              <View style={[INPUT.inputContainer]}>
                <TextInput
                  value={this.state.password_confirmation}
                  onChangeText={value => {
                    this.setState({
                      password_confirmation: value,
                      password_confirmation_error: '',
                    });
                  }}
                  placeholder="Retype Password"
                  placeholderTextColor={'grey'}
                  style={[INPUT.input]}
                  secureTextEntry={this.state.secureTextEntry2}
                />
                {this.state.secureTextEntry2 === true ? (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry2: false})}>
                    <Ionicons
                      name="eye-off"
                      size={24}
                      color="black"
                      style={{margin: 10, color: colors.light}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.setState({secureTextEntry2: true})}>
                    <Ionicons
                      name="eye"
                      size={24}
                      color="black"
                      style={{margin: 10}}
                    />
                  </TouchableOpacity>
                )}
              </View>
          
              <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
                {this.state.password_confirmation_error}
              </Text>

              <TouchableOpacity
                disabled={this.state.disabled}
                onPress={() => {
                  this.register_api_call();
                }}
                style={BUTTONS.btnPrimary}>
                {this.state.indicator ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={BUTTONS.btnFont}>Register</Text>
                )}
              </TouchableOpacity>
              {/* <Button
              type="continue"
              navigation={this.props.navigation}
              page="Verification"
            /> */}

              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text
                    style={{
                      color: colors.light,
                      fontFamily: Fonts.primary,
                      textAlign: 'center',
                    }}>
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
