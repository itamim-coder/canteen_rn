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
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBox}>
        <Text style={styles.h1}>Login</Text>
        <Text style={styles.primary}>
          If you already have a YumCayman.ky account
        </Text>
        <Text style={styles.primary}>please log in below</Text>
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
            />
          </View>
          <TouchableOpacity
            //   onPress={handleSignin}
            onPress={() => navigation.navigate('TabNavigator')}
            style={STYLES.btnPrimary}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.loginBottom}>
            <TouchableOpacity>
              <Text style={{color: colors.darkGrey, fontWeight: 'bold'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{color: colors.darkGrey, fontWeight: 'bold'}}>
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
  loginBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
