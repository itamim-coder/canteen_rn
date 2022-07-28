import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import STYLES from '../theme/styles';

const Wallet = () => {
  return (
    <View
      style={{
        backgroundColor: colors.grey,
        flex: 1,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        padding: 15,
      }}>
      <View style={{marginTop: 30, paddingBottom: 20}}>
        <Text style={STYLES.h3}>Wallets</Text>
      </View>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/payPal.png')}
        />
        <Text style={[STYLES.medium, {paddingLeft: 20, fontSize: 20}]}>
          Paypel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/payumoney.png')}
        />
        <Text style={[STYLES.medium, {paddingLeft: 20, fontSize: 20}]}>
          PayU money
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/stripe.png')}
        />
        <Text style={[STYLES.medium, {paddingLeft: 20, fontSize: 20}]}>
          Stripe
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <Text style={[STYLES.h3, {paddingBottom: 20}]}>Card</Text>
        <TouchableOpacity style={styles.paymentBox}>
          <Image
            style={[styles.paymentImg, {resizeMode: 'contain'}]}
            source={require('../../assets/images/payment/card.png')}
          />
          <Text style={[STYLES.medium, {paddingLeft: 20, fontSize: 20}]}>
            Bank
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Wallet;

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
