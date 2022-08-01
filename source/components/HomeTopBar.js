import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';

export class HomeTopBar extends Component {
  render() {
    const image = {
      height: 40,
      width: 40,
    };
    const topBar = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
    };
    return (
      <View style={topBar}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image
            style={image}
            source={require('../../assets/images/profile.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Topup')}>
          <Image
            style={image}
            source={require('../../assets/images/ic_wallet.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeTopBar;
