import React, {Component} from 'react';
import {
  ActivityIndicator,
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
      resetInfo: '',
      disabled: false,
      indicator: false,
    };
  }
  validate_field = () => {
    const {email} = this.state;
    if (email == '') {
      this.setState({emailerror: 'email input'});
      return false;
    }
    return true;
  };
  reset_api_call = () => {
    if (this.validate_field()) {
      const data = {email: this.state.email};
      this.setState({indicator: true});
      this.setState({disabled: true});
      axios
        .post('https://laqil.com/public/api/password/email', data)
        .then(res => {
          let resetInfo = res.data;
          this.setState({resetInfo: resetInfo});
          AsyncStorage.setItem('resetInfo', JSON.stringify(resetInfo));

          const status = res.data.status;
          console.log(status);
          if (status == true) {
            alert(res.data.message);
            this.setState({indicator: false});
            this.setState({disabled: false});
            this.props.navigation.navigate('ConfirmPassword');
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
        <View>
          <Text style={[TYPOGRAPHY.h2]}>Reset Password</Text>
          <Text style={[TYPOGRAPHY.primary]}>
            Enter your email verification code will be sent on given email
          </Text>
          <View style={styles.otpBox}>
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
                this.reset_api_call();
              }}
              disabled={this.state.disabled}
              style={BUTTONS.btnPrimary}>
              {this.state.indicator ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={BUTTONS.btnFont}>Submit</Text>
              )}
            </TouchableOpacity>
            {/* <Button type="submit" navigation={this.props.navigation} /> */}
          </View>
        </View>
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
