import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../theme/colors';
import {connect} from 'react-redux';
import TYPOGRAPHY from '../theme/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class FloatCart extends Component {
  render() {
    console.log(this.props.navigation);
    return (
      <SafeAreaView>
        {this.props.length > 0 ? (
          <View
            style={{
              backgroundColor: 'rgba(52, 52, 52, 1)',
              paddingVertical: 30,
              paddingHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[TYPOGRAPHY.medium, {color: colors.white}]}>
                {this.props.length} Items
              </Text>
              <Text style={[TYPOGRAPHY.medium, {color: colors.white}]}>
                {' '}
                |{' '}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('My Cart')}
              style={{
                backgroundColor: colors.red,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="basket" size={24} color="white" />
              <Text style={[TYPOGRAPHY.medium, {color: colors.white}]}>
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
  };
};

export default connect(mapStateToProps)(FloatCart);
