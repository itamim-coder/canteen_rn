import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Statusbar from '../components/Statusbar';
import Wallet from '../components/Wallet';
import {colors} from '../theme/colors';
import TYPOGRAPHY from '../theme/typography';

export default class Payment extends Component {
  render() {
    return (
      <SafeAreaView style={{backgroundColor: colors.black, flex: 1}}>
        <Statusbar name="Payment Method" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: colors.white,
          }}>
          <Text style={TYPOGRAPHY.h3}>Amount to Pay</Text>
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
