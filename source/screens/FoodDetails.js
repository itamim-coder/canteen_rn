import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
import {FOOD_LIST} from '../data/food-list';
import {useNavigation} from '@react-navigation/native';
import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';
import {Fonts} from '../theme/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDetails: {},
      cart: '',
    };
  }

  renderItem = ({item}) => {
    const sliderCard = {
      backgroundColor: colors.white,
      marginRight: 10,
      // marginTop: 40,
      borderRadius: 10,
      padding: 10,
    };
    const foodName = {
      ...TYPOGRAPHY.h6,
      // padding: 10,
    };
    const priceText = {
      ...TYPOGRAPHY.h5,
      // padding: 10,
    };
    const {name, image, price} = item;
    return (
      <View>
        <TouchableOpacity
          style={sliderCard}
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {food: item})
          }>
          <Text style={foodName}>{name}</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Image
              resizeMode="cover"
              style={{width: 100, height: 80}}
              source={image}
            />
          </View>
          <Text style={[TYPOGRAPHY.h6, {color: colors.green}]}>Customize</Text>
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
                style={{color: colors.white, fontWeight: 'bold', fontSize: 15}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const detailsContainer = {flex: 1, backgroundColor: colors.white};
    const detailsScreen = {
      // ...SCREEN.screen,
      paddingTop: 0,
      paddingBottom: 0,
      flex: 1.8,
    };
    const cartButton = {
      ...BUTTONS.btnFont,
      fontSize: 15,
      color: colors.white,
    };
    const addToCart = id => {
      let shoppingCart;

      const storedCart = AsyncStorage.getItem('shopping-cart');
      if (storedCart) {
        shoppingCart = storedCart;
      } else {
        shoppingCart = {};
      }

      const quantity = shoppingCart[id];

      if (quantity) {
        const newQuantity = parseInt(quantity) + 1;
        shoppingCart[id] = newQuantity;
      } else {
        shoppingCart[id] = 1;
      }
      const jsonValue = JSON.stringify(shoppingCart);
      AsyncStorage.setItem('shopping-cart', jsonValue);
      console.log(jsonValue);
    };

    // const addToCart = async id => {
    //   let storedCart = await AsyncStorage.getItem('shopping-cart');
    //   storedCart = JSON.parse(storedCart);
    //   console.log(storedCart);
    //   if (storedCart) {
    //     let array = storedCart;
    //     array.push(id);
    //     try {
    //       await AsyncStorage.setItem('shopping-cart', JSON.stringify(array));
    //       ToastAndroid.show(
    //         'Item Added Successfully to cart',
    //         ToastAndroid.SHORT,
    //       );
    //       this.props.navigation.navigate('Home');
    //     } catch (error) {
    //       return error;
    //     }
    //   } else {
    //     const quantity = shoppingCart[id];

    //     try {
    //       await AsyncStorage.setItem(
    //         'shopping-cart',
    //         JSON.stringify(shoppingCart),
    //       );

    //       ToastAndroid.show(
    //         'Item Added Successfully to cart',
    //         ToastAndroid.SHORT,
    //       );
    //       this.props.navigation.navigate('Home');
    //     } catch (error) {
    //       return error;
    //     }
    //   }
    // };
    const food = this.props.route.params.food;

    const {name, price, image, details, id} = food;
    return (
      <SafeAreaView style={detailsContainer}>
        <Statusbar name={name} type="food" />

        {/* details screen  */}

        <View style={detailsScreen}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <View style={SCREEN.screen}>
              <Image
                resizeMode="contain"
                source={image}
                style={{
                  width: '100%',
                  height: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Text style={[TYPOGRAPHY.medium, {fontSize: 22}]}>{name}</Text>
              <Text style={[TYPOGRAPHY.h4, {color: colors.green}]}>
                Customize
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text style={TYPOGRAPHY.h3}>${price}.00</Text>

                <TouchableOpacity
                  // onPress={() => (id ? addToCart(id) : null)}
                  onPress={() => {
                    addToCart(id);
                  }}
                  /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                  // showMessage({
                  //   message: 'Added Successfully',
                  //   description: 'Click here to check cart',
                  //   type: 'success',
                  //   icon: 'success',
                  //   onPress: () => {
                  //     this.props.navigation.navigate('My Cart');
                  //     /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                  //   },
                  // });
                  // }}
                  style={{
                    backgroundColor: '#f5474a',
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: 'row',
                  }}>
                  <Text style={[cartButton, {fontFamily: Fonts.primary}]}>
                    Add{' '}
                  </Text>
                  <Text style={[cartButton, {fontFamily: Fonts.primary}]}>
                    {' '}
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={TYPOGRAPHY.h3}>About Product</Text>
              <Text style={TYPOGRAPHY.primary}>{details}</Text>
            </View>

            <View
              style={[
                SCREEN.screen,

                {
                  // padding:0,
                  backgroundColor: colors.grey,
                  // flex: 0.1,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  paddingBottom: 10,
                },
              ]}>
              <Text
                style={[
                  TYPOGRAPHY.h4,
                  {
                    // fontSize: 20,
                    marginBottom: 10,
                  },
                ]}>
                Similar Products
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={FOOD_LIST}
                renderItem={item => this.renderItem(item)}
              />
            </View>
          </ScrollView>
        </View>

        {/* <ScrollView
          style={[
            SCREEN.screen,
            {
              backgroundColor: colors.grey,
              // flex: 0.1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingBottom: 0,
            },
          ]}>
          <Text
            style={[
              TYPOGRAPHY.primary,
              {
                fontSize: 20,
                marginBottom: 10,
              },
            ]}>
            Similar Products
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FOOD_LIST}
            renderItem={item => this.renderItem(item)}
          />
        </ScrollView> */}
        <FlashMessage position="top" />
      </SafeAreaView>
    );
  }
}

export default FoodDetails;
