import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const Topup = () => {
  return (
    <SafeAreaView style={styles.topupConatiner}>
      <View style={styles.addMoneyBox}>
        <ImageBackground
          style={styles.bgimg}
          resizeMode="cover"
          source={require('../../assets/images/wallet_bg.png')}>
          <Text style={styles.bgtxt}>Wallet</Text>
          <Text style={styles.balancetxt}>Total Balance{'\n'}$1000</Text>
        </ImageBackground>
        <View>
          <Text>Add Money</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Topup;

const styles = StyleSheet.create({
  topupConatiner: {
    flex: 1,
    // backgroundColor: bla
  },
  addMoneyBox: {
    margin: 20,
  },
  bgimg: {
    justifyContent: 'center',
    height: 200,
    // borderRadius: 200,
  },
  bgtxt: {
    color: 'white',
    fontSize: 35,
    margin: 15,
    // marginTop: -100,
    // lineHeight: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  balancetxt: {
    // color: colors.dar,
    fontSize: 20,
    marginLeft: 15,
    // marginTop: -110,
    // lineHeight: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});
