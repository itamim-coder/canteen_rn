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
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.verificationContainer}>
        <Text style={[styles.h1]}>Verification</Text>
        <Text style={[styles.primary]}>
          Enter verification code sent on given number
        </Text>
        <View style={styles.otpBox}>
          <Text style={[styles.primary]}>Enter 6 Digit OTP</Text>
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
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Submit
            </Text>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text style={styles.small}>0 min remain</Text>
            <TouchableOpacity>
              <Text style={(styles.small, {color: colors.pink})}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  verificationContainer: {
    margin: 20,
    marginTop: 80,
  },
  h1: {
    color: colors.black,
    fontSize: 25,
    fontWeight: 'bold',
    // margin: 20,
  },
  primary: {
    color: colors.grey,
    fontWeight: 'bold',
    fontSize: 20,
    // textAlign: 'center',
  },
  small: {
    color: colors.grey,
    fontWeight: 'bold',
    fontSize: 20,
  },
  bottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
  otpBox: {
    marginTop: 50,
  },
});
