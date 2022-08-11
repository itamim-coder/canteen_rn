import React, {Component} from 'react';
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
import {colors} from '../theme/colors';

import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FOOD_LIST} from '../data/food-list';
import {getStoredCart} from '../../Function/Cart';

export class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      products: [],
      total: null,
      cart: [],
    };
  }
  async componentDidMount() {
    const store = await getStoredCart();
    fetch('https://laqil.com/public/api/product-list')
      .then(res => res.json())
      .then(res => {
        // this.setState({products: res});
        // this.setState({foods: res});
        if (res.status == true) {
          this.setState({products: res.data});
          // return this.state.foods;
          // this.setState({visible: false});
        }
        // console.log(this.state.products);
        const {products} = this.state;
        const savedCart = [];
        console.log(products);
        for (const id in store) {
          // console.log(id);
          const addedProduct = products.find(product => product.id == id);
          if (addedProduct) {
            const quantity = store[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
            // console.log(savedCart);
          }
          // this.setState({cart: addedProduct});
          // console.log(this.state.quantity);
        }
        this.setState({cart: savedCart});

        // console.log(this.state.cart[0].quantity);
      });

    // let json = JSON.parse(store)
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.cart !== this.state.cart) {
  //     console.log('pokemons state has changed.');
  //     this.setState({cart: this.state.cart});
  //   }
  //   console.log('prevstate', prevState.cart);
  //   console.log('prevprops', prevProps);
  // }

  // componentWillUpdate(newProps, newState) {
  //   console.log('new p', newProps);
  //   console.log('new s', newState);
  // }

  renderCart = ({item}) => {
    // console.log(item.quantity);
    // console.log(this.state.cart.id);
    const dltFromCart = async id => {
      // console.log(id);
      const storedCart = await AsyncStorage.getItem('shopping-cart');
      console.log('before', storedCart);
      if (storedCart) {
        const shoppingCart = JSON.parse(storedCart);
        if (id in shoppingCart) {
          // console.log('exist');
          delete shoppingCart[id];
          const jsonValue = JSON.stringify(shoppingCart);
          AsyncStorage.setItem('shopping-cart', jsonValue);
          // this.setState({cart: ...shoppingCart});
        }
        console.log('after', shoppingCart);
        // this.setState({cart: shoppingCart});
      }
    };
    console.log(item.quantity);
    console.log(this.state.count);
  
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.white,
            marginVertical: 5,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: `${item.picture}`}}
          />
          <View>
            <View>
              <Text style={[TYPOGRAPHY.h3, {fontSize: 15}]}>
                {item.description}
                {/* {data.productName} */}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginHorizontal:50,
              }}>
              <Text style={{color: colors.green, fontSize: 15}}>Custom</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  backgroundColor: colors.darkOrange,
                  borderRadius: 5,
                  paddingVertical: 5,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({count: this.state.count - 1})}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: colors.white,
                      paddingHorizontal: 10,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 17,
                    color: colors.white,
                    paddingHorizontal: 10,
                  }}>
                  {this.state.count + item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({count: this.state.count + 1})}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: colors.white,
                      paddingHorizontal: 10,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    marginHorizontal: 20,
                    alignItems: 'center',
                    fontWeight: 'bold',
                  },
                ]}>
                ${item.quantity * item.price}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dltFromCart(item.id);
                }}>
                <Text>X</Text>
              </TouchableOpacity>

              <View />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    // console.log(this.props.data);
    const cartContainer = {
      ...SCREEN.screen,
      padding: 0,
      backgroundColor: colors.black,
    };

    const cartDetails = {
      ...SCREEN.screen,

      backgroundColor: colors.grey,
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      paddingVertical: 0,
    };

    const productCard = {
      flexDirection: 'row',
      backgroundColor: colors.white,
      marginVertical: 5,
      borderRadius: 6,
      alignItems: 'center',
      // justifyContent: 'space-between',
    };

    const calculationCard = {
      backgroundColor: colors.white,
      padding: 10,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    };

    const checkOutButton = {
      ...BUTTONS.btnPrimary,
      paddingHorizontal: 30,
      marginBottom: 18,
    };
    this.clearCart = () => {
      AsyncStorage.removeItem('shopping-cart');
      this.setState({cart: []});
    };

    return (
      <SafeAreaView style={cartContainer}>
        <Statusbar name="My Cart" />

        {/* full screen  */}

        <View style={cartDetails}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20, flex: 1}}>
            {/* product card */}
            <FlatList
              data={this.state.cart}
              renderItem={item => this.renderCart(item)}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.clearCart();
                }}>
                <Text>Clear Cart</Text>
              </TouchableOpacity>
            </View>
            {/* Total calculation */}
            <View style={{marginTop: 40}}>
              <View style={calculationCard}>
                <View>
                  <Text style={TYPOGRAPHY.h5}>Item Total</Text>
                  <Text style={TYPOGRAPHY.h5}>Delivery Fee</Text>
                </View>

                <View>
                  <Text style={TYPOGRAPHY.h5}>$200</Text>
                  <Text style={TYPOGRAPHY.h5}>$200</Text>
                </View>
              </View>
            </View>
            <View style={[calculationCard, {paddingVertical: 20}]}>
              <Text
                style={[
                  TYPOGRAPHY.h5,
                  {fontWeight: 'bold', color: colors.red},
                ]}>
                Amount To Pay
              </Text>
              <Text style={TYPOGRAPHY.h5}>$200</Text>
            </View>
          </ScrollView>
          <View>
            <Button
              name="checkout button"
              style={{flex: 1}}
              // style={{marginTop:10}}
              navigation={this.props.navigation}
              type="checkout"
            />
          </View>
        </View>

        <FlashMessage position="top" />
      </SafeAreaView>
    );
  }
}

export default MyCart;
