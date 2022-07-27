import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import Wallet from '../components/Wallet';
import Statusbar from '../components/Statusbar';

const AddtoWallet = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.black, flex: 1}}>
      <Statusbar name="Add To Wallet" method="add" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          backgroundColor: colors.white,
        }}>
        <Text style={styles.headText}>Amount to Add</Text>
        <Text style={[styles.headText, {color: colors.pink}]}>$100</Text>
      </View>
      <Wallet />
    </SafeAreaView>
  );
};

export default AddtoWallet;

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
