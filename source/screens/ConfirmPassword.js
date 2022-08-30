import React, {Component} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import INPUT from '../theme/Input';

import {colors} from '../theme/colors';
import Button from '../components/Button';
import {Fonts} from '../theme/Fonts';
import BUTTONS from '../theme/Buttons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ResetRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_error: '',
      code: '',
      code_error: '',
      password: '',
      password_confirmation: '',
      password_error: '',
      password_confirmation_error: '',
      confirmInfo: '',
      disabled: false,
      indicator: false,
    };
  }
  validate_field = () => {
    const {code, email, password, password_confirmation} = this.state;
    if (
      code == '' &&
      email == '' &&
      password == '' &&
      password_confirmation == ''
    ) {
      this.setState({code_error: 'Please enter your code'});
      this.setState({email_error: 'Please enter your register email'});

      this.setState({password_error: 'Please enter your New password'});
      this.setState({
        password_confirmation_error: 'Please enter your New retype password',
      });
      return false;
    } else if (code == '') {
      this.setState({code_error: 'Please enter your code'});
      return false;
    } else if (password == '') {
      this.setState({password_error: 'Please enter your New password'});
      return false;
    } else if (password_confirmation == '') {
      this.setState({
        password_confirmation_error: 'Please enter your New retype password',
      });
      return false;
    } else if (password !== password_confirmation) {
      this.setState({
        password_confirmation_error: 'Password didnot match',
      });
      return false;
    } else if (email == '') {
      this.setState({email_error: 'email input'});
      return false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      this.setState({email_error: 'Email Address should be valid'});
      return false;
    }
    return true;
  };
  confirmation_api_call = () => {
    if (this.validate_field()) {
      const data = {
        code: this.state.code,
        email: this.state.email,

        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
      };
      this.setState({indicator: true});
      this.setState({disabled: true});
      axios
        .post('https://laqil.com/public/api/password/reset', data)
        .then(res => {
          let confirmInfo = res.data;
          this.setState({resetInfo: confirmInfo});

          const status = res.data.status;
          console.log(status);
          if (status == true) {
            alert(res.data.message);
            this.setState({indicator: false});
            this.setState({disabled: false});
            this.props.navigation.navigate('Login');
          }
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.errors.email);

            console.log(error.response.data.errors);
          }
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={[SCREEN.screen, {backgroundColor: colors.white}]}>
        <KeyboardAvoidingView>
          <Text style={[TYPOGRAPHY.h2]}>Reset Password</Text>
          <Text style={[TYPOGRAPHY.primary, {color: colors.ash}]}>
            Enter your email verification code will be sent on given email
          </Text>
          <View style={styles.otpBox}>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              Enter your Code
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.code}
                onChangeText={value => {
                  this.setState({code: value, code_error: ''});
                }}
                placeholder="Code"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.code_error}
            </Text>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              New Password
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password}
                onChangeText={value => {
                  this.setState({password: value, password_error: ''});
                }}
                placeholder="new password"
                secureTextEntry
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.password_error}
            </Text>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              Retype your password
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password_confirmation}
                onChangeText={value => {
                  this.setState({
                    password_confirmation: value,
                    password_confirmation_error: '',
                  });
                }}
                placeholder="Password confirmation"
                secureTextEntry
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.password_confirmation_error}
            </Text>
            <Text style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
              Enter your email
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
            <TouchableOpacity
              onPress={() => {
                this.confirmation_api_call();
              }}
              disabled={this.state.disabled}
              style={BUTTONS.btnPrimary}>
              {this.state.indicator ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={BUTTONS.btnFont}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    marginTop: 50,
  },
});
