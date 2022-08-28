import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {colors} from '../theme/colors';

export default class CounterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.initialValue || 0,
    };
    console.log('counter', this.state.quantity);
  }

  increment = () => {
    const count = this.state.quantity + 1;
    this.setState({quantity: count});
  };
  decrement = () => {
    if (this.state.quantity > 1) {
      const count = this.state.quantity - 1;
      this.setState({quantity: count});
    }
  };

  render() {
    return (
      <View
        style={{
          paddingVertical: 8,

          borderRadius: 5,
          backgroundColor: colors.gray,
          marginRight: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => this.decrement()}
          style={{marginHorizontal: 15}}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{paddingHorizontal: 4}}>{this.state.quantity}</Text>
        <TouchableOpacity
          onPress={() => this.increment()}
          style={{marginHorizontal: 15}}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
