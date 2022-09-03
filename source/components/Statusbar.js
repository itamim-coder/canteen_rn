import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import TYPOGRAPHY from '../theme/typography';
// import STYLES from '../theme/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Statusbar = ({name, type, length}) => {
  // console.log(type);
  const navigation = useNavigation();
  if (type == 'food') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flex: 0.1}}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <View style={{flex: 2}}>
          <Text
            style={[
              TYPOGRAPHY.h4Bold,
              {
                textAlign: 'center',
              },
            ]}>
            {name}
          </Text>
        </View>
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{flex: 0.1}}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <View style={{flex: 2}}>
          <Text
            style={[
              TYPOGRAPHY.h4Bold,
              {
                textAlign: 'center',
              },
            ]}>
            {name}
          </Text>
        </View>
      </View>
    );
  }
};

export default Statusbar;

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
