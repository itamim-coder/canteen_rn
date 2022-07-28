import {StyleSheet} from 'react-native';
import {colors} from '../colors';

const STYLES = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
  },
  h1: {
    color: colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
  },
  h2: {
    color: colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
  },
  h3: {
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  h4: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
  },
  h5: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  primary: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
  medium: {
    color: colors.black,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    borderWidth: 0.5,
    borderColor: colors.light,
    flex: 1,
    fontSize: 15,
  },
  btnPrimary: {
    backgroundColor: colors.red,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btnFont: {
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },

  btnSecondary: {
    height: 50,
    borderWidth: 1,
    borderColor: '#a5a5a5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  btnImage: {width: 20, height: 20, marginLeft: 5},

  line: {height: 1, width: 30, backgroundColor: '#a5a5a5'},
});

export default STYLES;
