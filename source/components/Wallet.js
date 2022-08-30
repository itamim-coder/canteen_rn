import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../theme/colors';
import TYPOGRAPHY from '../theme/typography';

export default class Wallet extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.gray,
          flex: 1,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
          padding: 15,
        }}>
        <View style={{marginTop: 30, paddingBottom: 20}}>
          <Text style={TYPOGRAPHY.h4Bold}>Wallets</Text>
        </View>
        <TouchableOpacity style={styles.paymentBox}>
          <Image
            style={styles.paymentImg}
            source={require('../../assets/images/payment/payPal.png')}
          />
          <Text style={[TYPOGRAPHY.medium, {paddingLeft: 20, fontSize: 17}]}>
            Paypel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBox}>
          <Image
            style={styles.paymentImg}
            source={require('../../assets/images/payment/payumoney.png')}
          />
          <Text style={[TYPOGRAPHY.medium, {paddingLeft: 20, fontSize: 17}]}>
            PayU money
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBox}>
          <Image
            style={styles.paymentImg}
            source={require('../../assets/images/payment/stripe.png')}
          />
          <Text style={[TYPOGRAPHY.medium, {paddingLeft: 20, fontSize: 17}]}>
            Stripe
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 30}}>
          <Text style={[TYPOGRAPHY.h4Bold, {paddingBottom: 20}]}>Card</Text>
          <TouchableOpacity style={styles.paymentBox}>
            <Image
              style={[styles.paymentImg, {resizeMode: 'contain'}]}
              source={require('../../assets/images/payment/card.png')}
            />
            <Text style={[TYPOGRAPHY.medium, {paddingLeft: 20, fontSize: 17}]}>
              Bank
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paymentImg: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
