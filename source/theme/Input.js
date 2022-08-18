import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {Fonts} from './Fonts';
import TYPOGRAPHY from './typography';

const INPUT = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    color: colors.black,
    fontFamily: Fonts.primary,
    borderWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: colors.light,
    flex: 1,
    fontSize: 15,
    borderRadius: 5,
  },
});

export default INPUT;
