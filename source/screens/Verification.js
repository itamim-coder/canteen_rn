import React, {Component} from 'react';
import {
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
import BUTTONS from '../theme/Buttons';

export default class Verification extends Component {
  render() {
    return (
      <SafeAreaView style={SCREEN.screen}>
        <View>
          <Text style={[TYPOGRAPHY.h2]}>Verification</Text>
          <Text style={[TYPOGRAPHY.primary]}>
            Enter verification code sent on given number
          </Text>
          <View style={styles.otpBox}>
            <Text style={[TYPOGRAPHY.primary]}>Enter 6 Digit OTP</Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setOtp(text)}
                placeholder="OTP"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={BUTTONS.btnPrimary}>
              <Text style={BUTTONS.btnFont}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.bottom}>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  // {color: colors.light}
                ]}>
                0 min remain
              </Text>
              <TouchableOpacity>
                <Text
                  style={[
                    TYPOGRAPHY.h4,
                    // {color: colors.red, fontFamily: 'Poppins-Bold'},
                  ]}>
                  RESEND
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
  bottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    marginTop: 50,
  },
});
