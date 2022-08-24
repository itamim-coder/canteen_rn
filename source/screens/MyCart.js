import React, {Component} from 'react';
import {
  ActivityIndicator,
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
import {connect} from 'react-redux';
import {reset, selectCart} from './../../redux/cartSlice';
import {deleteFromCart} from './../../redux/cartSlice';
import {increment} from '../../redux/counterSlice';
// import {createConfigItem, parse} from '@babel/core';

export class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      products: [],
      total: null,
      cart: [],
      indicator: false,
      amount: '',
      // count: initialValue || 0,
    };
  }
  findProducts = async () => {
    const storedCart = await AsyncStorage.getItem('shopping-cart');
    console.log('find', storedCart);
    if (storedCart !== null) {
      const result = JSON.parse(storedCart);
      console.log('find2', result);
      this.setState({cart: result});
    }
  };

  async componentDidMount() {
    await this.findProducts();
    // const store = await getStoredCart();
    // console.log('store', store);
    // fetch('https://laqil.com/public/api/product-list')
    //   .then(res => res.json())
    //   .then(res => {
    //     // this.setState({products: res});
    //     // this.setState({foods: res});
    //     if (res.status == true) {
    //       this.setState({products: res.data});
    //       // return this.state.foods;
    //       // this.setState({visible: false});
    //     }
    //     // console.log(this.state.products);
    //     const {products} = this.state;
    //     const savedCart = [];
    //     console.log(products);
    //     for (const id in store) {
    //       // console.log(id);
    //       const addedProduct = products.find(product => product.id == id);
    //       if (addedProduct) {
    //         const quantity = store[id];
    //         addedProduct.quantity = quantity;
    //         savedCart.push(addedProduct);
    //       }
    //     }
    //     this.setState({cart: savedCart});
    //   });
  }

  renderCart = ({item}) => {
    // console.log(item);
    // console.log(this.state.cart.id);
    const dltFromCart = id => {
      // this.setState({indicator: true});
      console.log(id);
      this.props.deleteFromCart({id: id});
    };
    console.log('new', item);
    // console.log(this.state.count);
    const increment = item => {
      // console.log(item);
      const updateCart = {
        ...item,
        // item[quantity] = item.quantity + 1;
        // item.quantity: item.quantity + 1,
        // total: parse(item.amount * item.quantity),
      };
      console.log(updateCart);
    };
    return (
      <View>
        {this.state.indicator ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.white,
              // marginVertical: 5,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Image
              style={{width: '30%', height: 90}}
              source={{uri: item.picture}}
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
                    onPress={() =>
                      this.setState({count: this.state.count - 1})
                    }>
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
                    {item.quantity}
                    {/* {this.state.count + item.quantity} */}
                  </Text>
                  <TouchableOpacity
                    onPress={
                      () => increment({item})
                      // this.setState({count: this.state.count + 1})
                    }>
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
                      // marginHorizontal: 20,
                      alignItems: 'center',
                      fontWeight: 'bold',
                    },
                  ]}>
                  {/* ${item.quantity * item.price} */}
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
        )}
      </View>
    );
  };

  render() {
    // console.log(this.props.data);
    const cartContainer = {
      ...SCREEN.screen,
      padding: 0,
      // backgroundColor: colors.black,
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
    const clearCart = () => {
      this.props.reset();
    };
    // const {carts} = this.props.carts;
    console.log('cartssss', this.props.carts);

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
              data={this.props.carts}
              renderItem={item => this.renderCart(item)}
            />
            <View>
              <TouchableOpacity
                onPress={() => {
                  clearCart();
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
                  <Text style={TYPOGRAPHY.h5}>{this.props.length}</Text>
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
const mapStateToProps = state => {
  return {
    carts: state.cart,
    length: state.cart.length,
  };
};

const mapDispatchToProps = dispatch => {
  // console.log(cartProduct);
  return {
    deleteFromCart: id => {
      dispatch(deleteFromCart(id));
    },
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
