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

export class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route?.params?.id,
      quantity: this.props.route?.params?.quantity,
      name: this.props.route?.params?.id,
      price: this.props.route?.params?.id,
      description: this.props.route.params.description,
      foodDetails: {},
      cart: '',
      visible: false,
      cartProducts: [],
    };
    // console.log('cart', this.state.cartProduct);
  }

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
   

    // const addToCart = async added => {
    //   console.log(added);
    //   // const cartProducts = {
    //   //   id: added.id,
    //   //   description: added.description,
    //   //   price: added.price,
    //   //   img: added.barcode,
    //   // };
    //   let shoppingCart;

    //   //get shopping cart
    //   const storedCart = await AsyncStorage.getItem('shopping-cart');
    //   if (storedCart) {
    //     shoppingCart = JSON.parse(storedCart);
    //   } else {
    //     shoppingCart = [];
    //   }

    //   // add quantity
    //   // console.log(shoppingCart);
    //   const quantity = shoppingCart[id];
    //   // const product = shoppingCart[this.state.item];
    //   // console.log(shoppingCart[id]);
    //   if (quantity) {
    //     const newQuantity = quantity + 1;

    //     shoppingCart[id] = newQuantity;
    //   } else {
    //     shoppingCart[id] = 1;
    //     shoppingCart[id] = {cartProducts};

    //     // shoppingCart[product] = this.state.foodDetails;
    //     // shoppingCart[id].push = added;
    //   }
    //   // console.log(this.state?.foodDetails);
    //   console.log('shopping cart', shoppingCart);
    //   const jsonValue = JSON.stringify(shoppingCart);
    //   AsyncStorage.setItem('shopping-cart', jsonValue);
    //   // console.log(shoppingCart);
    // };

    // const addToCart = async added => {
    //   const storedCart = await AsyncStorage.getItem('shopping-cart');
    //   console.log('store', storedCart);
    //   if (storedCart !== null) {
    //     const result = JSON.parse(storedCart);
    //     console.log('Update', result);
    //     this.setState({cartProducts: result});
    //   }
    //   const cartProduct = {
    //     id: added.id,
    //     description: added.description,
    //     price: added.price,
    //     picture: added.picture,
    //   };
    //   console.log('cart', cartProduct);
    //   const updateCarts = [...this.state.cartProducts, cartProduct];
    //   console.log('New', updateCarts);
    //   this.setState({cartProducts: updateCarts});
    //   const jsonUpdate = JSON.stringify(updateCarts);

    //   await AsyncStorage.setItem('shopping-cart', jsonUpdate);
    //   // let shoppingCart;
    //   // const storedCart = await AsyncStorage.getItem('shopping-cart');
    //   // console.log('storedCart', storedCart);
    //   // if (storedCart) {
    //   //   shoppingCart = JSON.parse(storedCart);
    //   //   console.log('shopping', shoppingCart);
    //   // } else {
    //   //   shoppingCart = [...storedCart, {...cartProducts}];
    //   //   console.log('else', shoppingCart);
    //   //   const jsonValue = JSON.stringify(shoppingCart);
    //   //   AsyncStorage.setItem('shopping-cart', jsonValue);
    //   // }
    // };
    // const dispatch = useDispatch();

    const add = added => {
      const cartProduct = {
        id: added.id,
        description: added.description,
        price: added.price,
        picture: added.picture,
        quantity: 1,
        // quantityPrice: price * quantity,
      };
      this.props.addToCart({cartProduct});
      // console.log('cart', added.id);
    };
    const food = this.props.route.params.food;

    const {ingredients, pack_details, price, picture, description, id} =
      this.state?.foodDetails;
    const added = this.state.foodDetails;
    console.log('added', this.state.foodDetails);

    // this.setState({cartProducts: cartProduct});
    // console.log('render', cartProduct);
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
                    height: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Text style={[TYPOGRAPHY.medium, {fontSize: 22}]}>
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
                  <Text style={TYPOGRAPHY.h3}>${price}.00</Text>

                  <TouchableOpacity
                    // onPress={() => (id ? addToCart(id) : null)}
                    onPress={() => {
                      add(added);
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
                <Text style={TYPOGRAPHY.primary}>{ingredients}</Text>
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
                  // data={this.state.foods}
                  renderItem={item => this.renderItem(item)}
                />
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
      data={FOOD_LIST}
      renderItem={item => this.renderItem(item)}
    />
  </ScrollView> */}
        <FlashMessage position="top" />
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
