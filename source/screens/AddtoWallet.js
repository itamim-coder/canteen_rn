import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
import Wallet from '../components/Wallet';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';

export default class AddtoWallet extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.black, flex: 1}}>
        <Statusbar name="Add To Wallet" method="add" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            backgroundColor: colors.white,
          }}>
          <Text style={TYPOGRAPHY.h3}>Amount to Add</Text>
          <Text style={[TYPOGRAPHY.h3, {color: colors.pink}]}>$100</Text>
        </View>
        <Wallet />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
