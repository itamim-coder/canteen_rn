import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {FOOD_LIST} from '../data/food-list';
import {useNavigation} from '@react-navigation/native';
import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
const FoodDetails = ({route}) => {
  const food = route.params.food;
  const {name, image, details, price} = food;
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    const {name, image, price} = item;

    return (
      <View>
        <TouchableOpacity
          style={{backgroundColor: colors.white, margin: 10, borderRadius: 10}}
          onPress={() => navigation.navigate('FoodDetails', {food: item})}>
          <Text style={{fontSize: 14, margin: 10, fontWeight: 'bold'}}>
            {name}
          </Text>
          <View
            style={{
              // flex: 2,
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 20,
              // paddingHorizontal: 20,
            }}>
            <Image
              resizeMode="cover"
              style={{width: 100, height: 80}}
              source={image}
            />
          </View>
          <Text style={{fontSize: 15, margin: 10, fontWeight: 'bold'}}>
            Price: ${price}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Statusbar name={name} />
      <View style={{paddingHorizontal: 20, flex: 1.5}}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            source={image}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: colors.red,
            }}
          />
          <Text style={{fontSize: 25, marginVertical: 5, fontWeight: 'bold'}}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>${price}</Text>
            <TouchableOpacity
              onPress={() => {
                /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                showMessage({
                  message: 'Added Successfully',
                  description: 'Click here to check cart',
                  type: 'success',
                  icon: 'success',

                  onPress: () => {
                    navigation.navigate('My Cart');
                    /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                  },
                });
              }}
              style={{
                backgroundColor: '#f5474a',
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{details}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{details}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{details}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{details}</Text>
        </ScrollView>
      </View>
      <ScrollView
        style={{
          backgroundColor: colors.grey,
          // padding: 150,
          flex: 1,

          // padding: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Text
          style={{
            marginVertical: 15,
            marginHorizontal: 20,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Similar Products
        </Text>
        <FlatList
          // style={{flex:1}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FOOD_LIST}
          // numColumns={2}
          renderItem={renderItem}
          // refreshing
          // contentInset={{right: 20, top: 0, left: 0, bottom: 0}}
        />
      </ScrollView>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default FoodDetails;

const styles = StyleSheet.create({
  statusbar: {
    padding: 20,
    // backgroundColor: colors.black,
  },
});
