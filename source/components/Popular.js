import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import TYPOGRAPHY from '../theme/typography';
import {FOOD_LIST} from '../data/food-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export class Popular extends Component {
  renderItem = ({item}) => {
    const {name, image, price} = item;
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {food: item})
          }>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={TYPOGRAPHY.h5}>{name}</Text>
            <View
              style={{
                padding: 16,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 125, height: 125}}
                source={image}
              />
            </View>
            <Text
              style={[
                TYPOGRAPHY.h5,
                // {fontWeight: 'bold', color: colors.ash}
              ]}>
              ${price}.00
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  render() {
    const popularBox = {
      paddingVertical: 20,
    };
    return (
      <View style={popularBox}>
        <Text style={TYPOGRAPHY.h3}>Popular Near You</Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: 10,
          }}
          data={FOOD_LIST}
          numColumns={2}
          renderItem={item => this.renderItem(item)}
        />
      </View>
    );
  }
}

export default Popular;
