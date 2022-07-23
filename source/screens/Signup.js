import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import STYLES from '../theme/styles';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.h1}>Create Account</Text>
        <Text style={styles.primary}>
          If you don't have an account, please provide your email and phone to
          register.
        </Text>

        <View>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder="Email"
              placeholderTextColor={'grey'}
              style={STYLES.input}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder="Name"
              placeholderTextColor={'grey'}
              style={STYLES.input}
            />
          </View>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setPhone(text)}
              placeholder="Phone"
              placeholderTextColor={'grey'}
              style={STYLES.input}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Verification')}
            style={STYLES.btnPrimary}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Continue
            </Text>
          </TouchableOpacity>
          <View style={styles.Bottom}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: colors.darkGrey,
                  fontWeight: 'bold',
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
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    // backgroundColor: colors.white,
    flex: 1,
  },
  loginBox: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
  },
  h1: {
    color: colors.black,
    fontSize: 36,
    textAlign: 'center',
  },
  primary: {
    color: colors.black,
    textAlign: 'center',
  },
  btnPrimary: {
    backgroundColor: colors.black,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  Bottom: {
    marginTop: 10,
  },
});
