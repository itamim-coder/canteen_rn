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
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleSignin = () => {};
  return (
    <SafeAreaView style={[STYLES.screen, styles.loginContainer]}>
      <View style={styles.loginBox}>
        <Text style={[STYLES.h1, {textAlign: 'center'}]}>Log in</Text>
        <Text style={[STYLES.primary, {textAlign: 'center'}]}>
          If you already have a YumCayman.ky account{'\n'}please log in below
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
              onChangeText={text => setPassword(text)}
              placeholder="Password"
              placeholderTextColor={'grey'}
              style={STYLES.input}
              secureTextEntry
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
              // onPress={handleSignin}
            onPress={() => navigation.navigate('TabNavigator')}
            style={STYLES.btnPrimary}>
            <Text style={STYLES.btnFont}>Login</Text>
          </TouchableOpacity>
          <View style={styles.loginBottom}>
            <TouchableOpacity>
              <Text
                style={{color: colors.light, fontFamily: 'Poppins-Regular'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{color: colors.light, fontFamily: 'Poppins-Regular'}}>
                Sign up
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
