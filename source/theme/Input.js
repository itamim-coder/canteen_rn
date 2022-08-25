import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {Fonts} from './Fonts';
import TYPOGRAPHY from './typography';

const INPUT = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    // marginTop: 10,
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 5,
  },
  input: {
    color: colors.black,
    fontFamily: Fonts.primary,

    paddingHorizontal: 15,
    paddingVertical: 10,

    flex: 1,
    fontSize: 15,
  },
});

export default INPUT;
