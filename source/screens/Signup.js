import React, {Component} from 'react';
import {
  SafeAreaView,
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

export default class Signup extends Component {
  render() {
    return (
      <SafeAreaView style={[SCREEN.screen, styles.loginContainer]}>
        <View style={styles.loginBox}>
          <Text style={[TYPOGRAPHY.h1, {textAlign: 'center'}]}>
            Create Account
          </Text>
          <Text style={[TYPOGRAPHY.primary, {textAlign: 'center'}]}>
            If you don't have an account, please provide your email and phone to
            register.
          </Text>

          <View>
            <View style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setName(text)}
                placeholder="Name"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setPhone(text)}
                placeholder="Phone"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                keyboardType="numeric"
              />
            </View>
            <Button
              type="continue"
              navigation={this.props.navigation}
              page="Verification"
            />
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    // backgroundColor: colors.white,
    flex: 1,
  },
  loginBox: {
    flex: 1,
    justifyContent: 'center',
  },
});
