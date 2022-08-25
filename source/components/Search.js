import {Text, StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../theme/Fonts';
import {colors} from '../theme/colors';
export default class Search extends Component {
  render() {
    const search = {
      marginVertical: 20,
      fontSize: 16,
      paddingHorizontal: 15,
      backgroundColor: colors.white,
      borderRadius: 10,
      shadowColor: '#000',
      borderWidth: 0.3,
    };
    const searchWrapper = {
      flexDirection: 'row',
    };
    const searchIcon = {
      color: '#b0b0b0',
      marginRight: 10,
      marginTop: 14,
    };
    const searchInput = {
      color: '#b4b4b4',
      fontFamily: Fonts.primary,
    };
    return (
      <View style={search}>
        <View style={searchWrapper}>
          <AntDesign
            name="search1"
            size={18}
            color="black"
            style={searchIcon}
          />
          <TextInput placeholder="Search Food...." style={searchInput} />
        </View>
      </View>
    );
  }
}
