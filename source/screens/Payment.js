import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Statusbar from '../components/Statusbar';
import Wallet from '../components/Wallet';
import {colors} from '../theme/colors';

const Payment = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.black, flex: 1}}>
      <Statusbar name="Payment Method" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding:10,
          backgroundColor: colors.white,
        }}>
        <Text style={styles.headText}>Amount to Pay</Text>
        <Text style={[styles.headText, {color: colors.pink}]}>$100</Text>
      </View>
      <Wallet />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});