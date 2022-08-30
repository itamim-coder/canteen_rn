import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {Fonts} from './Fonts';

const BUTTONS = StyleSheet.create({
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
    fontFamily: Fonts.primaryMedium,
    fontSize: 15,
  },
});

export default BUTTONS;
