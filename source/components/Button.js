import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import BUTTONS from '../theme/Buttons';

export class Button extends Component {
  render() {
    const checkOutButton = {
      ...BUTTONS.btnPrimary,
      paddingHorizontal: 30,
      marginBottom: 18,
    };
    console.log(this.props);
    if (this.props.type == 'checkout') {
      return (
        <TouchableOpacity
          style={checkOutButton}
          onPress={() => this.props.navigation.navigate('Checkout')}>
          <Text style={[BUTTONS.btnFont]}>Checkout</Text>
        </TouchableOpacity>
      );
    } else if (this.props.type == 'login') {
      return (
        <TouchableOpacity
          // onPress={handleSignin}
          onPress={() => this.props.navigation.navigate('TabNavigator')}
          style={BUTTONS.btnPrimary}>
          <Text style={BUTTONS.btnFont}>Login</Text>
        </TouchableOpacity>
      );
    } else if (this.props.type == 'continue') {
      const page = this.props.page;
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(`${page}`)}
          style={BUTTONS.btnPrimary}>
          <Text style={BUTTONS.btnFont}>Continue</Text>
        </TouchableOpacity>
      );
    } else if (this.props.type == 'submit') {
      return (
        <TouchableOpacity style={BUTTONS.btnPrimary}>
          <Text style={BUTTONS.btnFont}>Submit</Text>
        </TouchableOpacity>
      );
    }
  }
}

export default Button;
