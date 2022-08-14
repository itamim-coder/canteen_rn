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
      emailerror: '',
      code: '',
      codeerror: '',
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
    if (email == '') {
      this.setState({emailerror: 'email input'});
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
          AsyncStorage.setItem('confirmInfo', JSON.stringify(confirmInfo));

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
            // let emailerror = error.response.data.errors.email;

            // this.setState({emailerror: emailerror});
            alert(error.response.data.errors.email);

            // ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
            // this.setState({indicator: false});
            // this.setState({disabled: false});

            // return;
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.errors);

            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={SCREEN.screen}>
        <KeyboardAvoidingView>
          <Text style={[TYPOGRAPHY.h2]}>Reset Password</Text>
          <Text style={[TYPOGRAPHY.primary]}>
            Enter your email verification code will be sent on given email
          </Text>
          <View style={styles.otpBox}>
            <Text style={[TYPOGRAPHY.primary]}>Enter your Code</Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.code}
                onChangeText={value => {
                  this.setState({code: value, codeerror: ''});
                }}
                placeholder="Code"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.codeerror}
            </Text>
            <Text style={[TYPOGRAPHY.primary]}>New Password</Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password}
                onChangeText={value => {
                  this.setState({password: value, passworderror: ''});
                }}
                placeholder="new password"
                secureTextEntry
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.passworderror}
            </Text>
            <Text style={[TYPOGRAPHY.primary]}>Retype your password</Text>
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
            <Text style={[TYPOGRAPHY.primary]}>Enter your email</Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.email}
                onChangeText={value => {
                  this.setState({email: value, emailerror: ''});
                }}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <Text style={{color: colors.bloodRed, fontFamily: Fonts.primary}}>
              {this.state.emailerror}
            </Text>
            <TouchableOpacity
              // onPress={handleSignin}

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
            {/* <Button type="submit" navigation={this.props.navigation} /> */}
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
