import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {Fonts} from './Fonts';

const TYPOGRAPHY = StyleSheet.create({
  h1: {
    color: colors.black,
    fontFamily: Fonts.primaryBold,
    fontSize: 32,
  },
  h2: {
    color: colors.black,
    fontFamily: Fonts.primaryBold,
    fontSize: 25,
  },
  h3: {
    color: colors.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 18,
  },
  h4: {
    color: colors.black,
    fontFamily: Fonts.primaryMedium,
    fontSize: 17,
  },
  h4Bold: {
    color: colors.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 17,
  },
  h5: {
    color: colors.black,
    fontFamily: Fonts.primaryMedium,
    fontSize: 15,
  },
  h6: {
    color: colors.black,
    fontFamily: Fonts.primaryMedium,
    fontSize: 13,
  },
  primary: {
    color: colors.black,
    fontFamily: Fonts.primary,
  },
  medium: {
    color: colors.black,
    fontFamily: Fonts.primaryMedium,
  },
});

export default TYPOGRAPHY;
