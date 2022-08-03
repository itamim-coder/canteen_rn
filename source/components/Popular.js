import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import TYPOGRAPHY from '../theme/typography';
import {FOOD_LIST} from '../data/food-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import Button from './Button';
import {BottomSheet} from 'react-native-btr';

export class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
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
             
              marginBottom: 10,
            }}>
            <Text style={TYPOGRAPHY.h6}>{name}</Text>
            <View
              style={{
                padding: 14,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 125, height: 125}}
                source={image}
              />
            </View>
            <Text style={[TYPOGRAPHY.h6, {color: colors.green}]}>
              Customize
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[TYPOGRAPHY.h3, {fontWeight: 'bold'}]}>
                ${price}.00
              </Text>
              <TouchableOpacity
              
                style={{
                  backgroundColor: colors.red,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  +
                </Text>
              </TouchableOpacity>

      
            </View>
            
          </View>
        </TouchableOpacity>
        <View>
      
        </View>
      </SafeAreaView>
    );
  };
  render() {
    const popularBox = {
      marginVertical: 20,
    };
    return (
      <View style={popularBox}>
        <Text style={[TYPOGRAPHY.h3, {fontWeight: 'bold', marginBottom: 20}]}>
          Popular Near You
        </Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-around',
            // marginTop: 5,
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
