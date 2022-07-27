import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

const Statusbar = ({name}) => {
  return (
    <View style={{padding: 15, backgroundColor: colors.white}}>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            margin: 5,
          }}>
          {name}
        </Text>
      </View>
    
    </View>
  );
};

export default Statusbar;

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
