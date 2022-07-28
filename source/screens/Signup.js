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
    <SafeAreaView style={[STYLES.screen, styles.loginContainer]}>
      <View style={styles.loginBox}>
        <Text style={[STYLES.h1, {textAlign: 'center'}]}>Create Account</Text>
        <Text style={[STYLES.primary, {textAlign: 'center'}]}>
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
            <Text style={STYLES.btnFont}>
              Continue
            </Text>
          </TouchableOpacity>
          <View style={{marginTop:10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                  style={{color: colors.light, fontFamily: 'Poppins-Regular', textAlign:'center'}}>
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
    flex: 1,
    justifyContent: 'center',
  },

 
});
