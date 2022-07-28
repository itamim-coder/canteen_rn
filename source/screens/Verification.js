import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../theme/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import STYLES from '../theme/styles';

const Verification = () => {
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView style={STYLES.screen}>
      <View>
        <Text style={[STYLES.h2]}>Verification</Text>
        <Text style={[STYLES.primary]}>
          Enter verification code sent on given number
        </Text>
        <View style={styles.otpBox}>
          <Text style={[STYLES.primary]}>Enter 6 Digit OTP</Text>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setOtp(text)}
              placeholder="OTP"
              placeholderTextColor={'grey'}
              style={STYLES.input}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={STYLES.btnPrimary}>
            <Text style={STYLES.btnFont}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={[STYLES.primary, {color: colors.light}]}>
              0 min remain
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  STYLES.primary,
                  {color: colors.red, fontFamily: 'Poppins-Bold'},
                ]}>
                RESEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

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
