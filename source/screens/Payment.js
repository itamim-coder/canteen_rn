import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import Statusbar from '../components/Statusbar';
import Wallet from '../components/Wallet';
import {colors} from '../theme/colors';
import TYPOGRAPHY from '../theme/typography';

export default class Payment extends Component {
  render() {
    const paymentContainer = {backgroundColor: colors.black, flex: 1};
    const amountText = {
      ...TYPOGRAPHY.h4Bold,
      color: colors.pink,
    };
    return (
      <SafeAreaView style={paymentContainer}>
        <Statusbar name="Payment Method" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: colors.white,
          }}>
          <Text style={TYPOGRAPHY.h4Bold}>Amount to Pay</Text>
          <Text style={amountText}>$100</Text>
        </View>
        <Wallet />
      </SafeAreaView>
    );
  }
}


