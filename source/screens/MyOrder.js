import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Statusbar from '../components/Statusbar';
import {colors} from '../theme/colors';

const MyOrder = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Statusbar name="My Orders" />
      <View style={{marginTop: 30, paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 20, marginLeft: 10}}>Order DT100</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
              Order 3 Items
            </Text>

            <Text
              style={{
                backgroundColor: colors.green,
                padding: 5,
                marginLeft: 15,
                fontWeight: 'bold',
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              Order Delivered
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            marginBottom: 10,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20, marginLeft: 10}}>Order DT100</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
              Order 3 Items
            </Text>
            <Text
              style={{
                backgroundColor: colors.red,
                color: colors.white,
                padding: 5,
                marginLeft: 15,
                fontWeight: 'bold',
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              Order Cancelled
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            marginBottom: 10,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 20, marginLeft: 10}}>Order DT100</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
              Order 3 Items
            </Text>
            <Text
              style={{
                backgroundColor: colors.green,
                padding: 5,
                marginLeft: 15,
                fontWeight: 'bold',
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
              }}>
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
