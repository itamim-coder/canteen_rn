import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Statusbar from '../components/Statusbar';
import {colors} from '../theme/colors';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';

export default class MyOrder extends Component {
  render() {
    const orderTitle = {
      ...TYPOGRAPHY.primary,
      fontSize: 20,
      fontWeight: '800',
      marginLeft: 10,
    };
    const orderStatus = {
      ...TYPOGRAPHY.medium,

      backgroundColor: colors.green,
      padding: 5,
      marginLeft: 15,

      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name="My Orders" />
        <View style={SCREEN.screen}>
          <View
            style={{
              backgroundColor: colors.white,
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={orderTitle}>Order DT100</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={(TYPOGRAPHY.primary, {marginLeft: 10})}>
                Order 3 Items
              </Text>

              <Text style={orderStatus}>Order Delivered</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              paddingVertical: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Text style={orderTitle}>Order DT100</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={(TYPOGRAPHY.primary, {marginLeft: 10})}>
                Order 3 Items
              </Text>

              <Text
                style={[
                  TYPOGRAPHY.medium,
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
            <Text style={orderTitle}>Order DT100</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={(TYPOGRAPHY.primary, {marginLeft: 10})}>
                Order 3 Items
              </Text>

              <Text type="success" style={orderStatus}>Order Delivered</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
