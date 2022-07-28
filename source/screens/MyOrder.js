import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Statusbar from '../components/Statusbar';
import {colors} from '../theme/colors';
import STYLES from '../theme/styles';

const MyOrder = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Statusbar name="My Orders" />
      <View style={STYLES.screen}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text
            style={[
              STYLES.primary,
              {fontSize: 20, fontWeight: '800', marginLeft: 10},
            ]}>
            Order DT100
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={(STYLES.primary, {marginLeft: 10})}>
              Order 3 Items
            </Text>

            <Text
              style={[
                STYLES.medium,
                {
                  backgroundColor: colors.green,
                  padding: 5,
                  marginLeft: 15,

                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                },
              ]}>
              Order Delivered
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text
            style={[
              STYLES.primary,
              {fontSize: 20, fontWeight: '800', marginLeft: 10},
            ]}>
            Order DT100
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={(STYLES.primary, {marginLeft: 10})}>
              Order 3 Items
            </Text>

            <Text
              style={[
                STYLES.medium,
                {
                  backgroundColor: colors.red,
                  padding: 5,
                  marginLeft: 15,
                  color: colors.white,
                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                },
              ]}>
              Order Cancelled
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text
            style={[
              STYLES.primary,
              {fontSize: 20, fontWeight: '800', marginLeft: 10},
            ]}>
            Order DT100
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={(STYLES.primary, {marginLeft: 10})}>
              Order 3 Items
            </Text>

            <Text
              style={[
                STYLES.medium,
                {
                  backgroundColor: colors.green,
                  padding: 5,
                  marginLeft: 15,

                  borderBottomLeftRadius: 10,
                  borderTopLeftRadius: 10,
                },
              ]}>
              Order Delivered
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyOrder;

const styles = StyleSheet.create({});
