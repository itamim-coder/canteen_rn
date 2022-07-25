import {StyleSheet} from 'react-native';
import {colors} from '../colors';

const STYLES = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.light,
    flex: 1,
    fontSize: 15,
  },
  inputIcon: {marginTop: 7, position: 'absolute'},
  btnPrimary: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
