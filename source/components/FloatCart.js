import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../theme/colors';
import {connect} from 'react-redux';
import TYPOGRAPHY from '../theme/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class FloatCart extends Component {
  render() {
    console.log(this.props.totalQuantity);
    return (
      <SafeAreaView>
        {this.props.length > 0 ? (
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 1)',
              paddingVertical: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[TYPOGRAPHY.h4, {color: colors.white}]}>
                {this.props.totalQuantity} Items
              </Text>
              <Text style={[TYPOGRAPHY.h4, {color: colors.red}]}> | </Text>
              <Text style={[TYPOGRAPHY.h4, {color: colors.white}]}>
                ${this.props.totalAmount}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('My Cart')}
              style={{
                backgroundColor: colors.red,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="basket" size={24} color="white" />
              <Text
                style={[
                  TYPOGRAPHY.medium,
                  {color: colors.white, marginLeft: 5},
                ]}>
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    length: state.cart.length,
    totalAmount: state.cart.reduce((acc, item) => acc + item.quantityPrice, 0),
    totalQuantity: state.cart.reduce((acc, item) => acc + item.quantity, 0),
  };
};

export default connect(mapStateToProps)(FloatCart);
