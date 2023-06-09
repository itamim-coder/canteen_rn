import React, {Component} from 'react';
import {
  ActivityIndicator,
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
import {connect} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import {MapDispatchToProps} from 'react-redux';
import store from '../../redux';
import FloatCart from '../components/FloatCart';
import CounterButton from '../components/CounterButton';

export class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route?.params?.id,
      // quantity: this.props.route?.params?.quantity,
      name: this.props.route?.params?.id,
      price: this.props.route?.params?.id,
      description: this.props.route.params.description,
      foodDetails: {},
      cart: '',
      visible: false,
      cartProducts: [],
      quantity: 1,
    };
    console.log('foodetails', this.state.foodDetails);
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

  componentDidMount() {
    // console.log(this.state.id);
    this.setState({visible: true});
    fetch(`https://laqil.com/public/api/product-details/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data);
        // this.setState({foods: res});
        if (res.status == true) {
          this.setState({foodDetails: res.data});
          // return this.state.foods;
          this.setState({visible: false});
        }
      });
  }

  // renderItem = ({item}) => {
  //   const sliderCard = {
  //     backgroundColor: colors.white,
  //     marginRight: 10,
  //     // marginTop: 40,
  //     borderRadius: 10,
  //     padding: 10,
  //   };
  //   const foodName = {
  //     ...TYPOGRAPHY.h6,
  //     // padding: 10,
  //   };
  //   const priceText = {
  //     ...TYPOGRAPHY.h5,
  //     // padding: 10,
  //   };
  //   const {description, picture, price} = item;
  //   console.log(item.picture);
  //   return (
  //     <View>
  //       <TouchableOpacity
  //         style={sliderCard}
  //         onPress={() =>
  //           this.props.navigation.navigate('FoodDetails', {
  //             id: item.id,
  //             picture: item.picture,
  //             name: item.description,
  //             price: item.price,
  //             quantity: 0,
  //             similar_foods: this.state.schoolFoods,
  //           })
  //         }>
  //         <Text style={foodName}>{description}</Text>
  //         <View
  //           style={{
  //             flexDirection: 'column',
  //             justifyContent: 'space-between',
  //             padding: 20,
  //           }}>
  //           <Image
  //             resizeMode="cover"
  //             style={{width: 100, height: 80}}
  //             source={{uri: `${item.picture}`}}
  //           />
  //         </View>
  //         <Text style={[TYPOGRAPHY.h6, {color: colors.green}]}>Customize</Text>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //           }}>
  //           <Text style={[TYPOGRAPHY.h3, {fontWeight: 'bold'}]}>
  //             ${price}.00
  //           </Text>
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: colors.red,
  //               paddingHorizontal: 10,
  //               paddingVertical: 5,
  //               borderRadius: 10,
  //             }}>
  //             <Text
  //               style={{color: colors.white, fontWeight: 'bold', fontSize: 15}}>
  //               +
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
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

    const add = added => {
      console.log(added);
      const cartProduct = {
        id: added.id,
        description: added.description,
        price: added.price,
        picture: added.picture,
        quantity: this.state.quantity,
        quantityPrice: added.price * this.state.quantity,
      };
      this.props.addToCart({cartProduct});
    };
    const similar_foods = this.props.route.params.similar_foods;
    console.log('school', similar_foods);

    const {ingredients, pack_details, price, picture, description, id} =
      this.state?.foodDetails;
    const added = this.state.foodDetails;
    // console.log('added', this.state.foodDetails);

    return (
      <SafeAreaView style={detailsContainer}>
        <Statusbar name={description} type="food" />

        {/* details screen  */}
        {this.state.visible ? (
          <View style={{flex: 1}}>
            <ActivityIndicator
              size={'large'}
              color={colors.red}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </View>
        ) : (
          <View style={detailsScreen}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              <View style={SCREEN.screen}>
                <Image
                  resizeMode="contain"
                  source={{uri: picture}}
                  style={{
                    width: '100%',
                    height: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Text style={[TYPOGRAPHY.h4, {fontSize: 20}]}>
                  {description}
                </Text>
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
                  <Text style={TYPOGRAPHY.h4Bold}>${price}.00</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        // paddingVertical: 8,

                        borderRadius: 5,
                        backgroundColor: colors.gray,
                        marginRight: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.decrement()}
                        style={{
                          padding: 8,
                          // backgroundColor: colors.red,
                          borderRadius: 5,
                          marginRight: 2,
                        }}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          padding: 8,
                          // backgroundColor: colors.red,
                          borderRadius: 5,
                          marginRight: 2,
                        }}>
                        {this.state.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.increment()}
                        style={{
                          padding: 8,
                          // backgroundColor: colors.red,
                          borderRadius: 5,
                        }}>
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          add(added);
                        }}
                        style={{
                          backgroundColor: '#f5474a',
                          paddingVertical: 5,
                          paddingHorizontal: 15,
                          borderRadius: 5,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={[
                            cartButton,
                            {fontFamily: Fonts.primary, marginRight: 15},
                          ]}>
                          Add
                        </Text>
                        <Text style={[cartButton, {fontFamily: Fonts.primary}]}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Text style={TYPOGRAPHY.h4}>Ingredients</Text>
                <Text style={TYPOGRAPHY.primary}>{ingredients}</Text>
                <View style={{marginTop: 5}}>
                  <Text style={TYPOGRAPHY.h4}>Pack Details</Text>
                  <Text style={TYPOGRAPHY.primary}>{pack_details}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

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
            data={similar_foods}
            renderItem={item => this.renderItem(item)}
          />
        </ScrollView> */}

        <FloatCart navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    carts: state.cart.carts,
  };
};

const mapDispatchToProps = dispatch => {
  // console.log(cartProduct);
  return {
    addToCart: data => {
      dispatch(addToCart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
