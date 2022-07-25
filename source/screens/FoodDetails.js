import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const FoodDetails = ({route}) => {
  const food = route.params.food;
  console.log(food);
  const {name} = food;
  return (
    <View>
      <Text>FoodDetails{name}</Text>
    </View>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({});
