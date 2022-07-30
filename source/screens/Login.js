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

export default class Login extends Component {
  render() {
    // const { navigate } = this.props.navigation; 
    return (
      <SafeAreaView style={[SCREEN.screen, styles.loginContainer]}>
        <View style={styles.loginBox}>
          <Text style={[TYPOGRAPHY.h1, {textAlign: 'center'}]}>Log in</Text>
          <Text style={[TYPOGRAPHY.primary, {textAlign: 'center'}]}>
            If you already have a YumCayman.ky account{'\n'}please log in below
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
                // onChangeText={text => setPassword(text)}
                placeholder="Password"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                secureTextEntry
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              // onPress={handleSignin}
              onPress={() => this.props.navigation.navigate('TabNavigator')}
              style={BUTTONS.btnPrimary}>
              <Text style={BUTTONS.btnFont}>Login</Text>
            </TouchableOpacity>
            <View style={styles.loginBottom}>
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

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  loginBox: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
