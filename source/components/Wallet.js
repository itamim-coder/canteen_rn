import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { colors } from '../theme/colors';

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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Wallets</Text>
      </View>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/payPal.png')}
        />
        <Text style={{paddingLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
          Paypel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/payumoney.png')}
        />
        <Text style={{paddingLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
          PayU money
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentBox}>
        <Image
          style={styles.paymentImg}
          source={require('../../assets/images/payment/stripe.png')}
        />
        <Text style={{paddingLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
          Stripe
        </Text>
      </TouchableOpacity>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 20}}>
          Card
        </Text>
        <TouchableOpacity style={styles.paymentBox}>
          <Image
            style={[styles.paymentImg, {resizeMode: 'contain'}]}
            source={require('../../assets/images/payment/card.png')}
          />
          <Text style={{paddingLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
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
