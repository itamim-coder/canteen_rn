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
  Alert,
} from 'react-native';
import {colors} from '../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';

import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getStoredCart} from '../../Function/Cart';
import {connect} from 'react-redux';
import {addToCart, reset, selectCart} from './../../redux/cartSlice';
import {deleteFromCart} from './../../redux/cartSlice';

export class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      products: [],
      total: null,
      cart: [],
      indicator: false,
      newQuantity: '',
      // quantity: '',
      // count: initialValue || 0,
    };
  }

  dltFromCart = id => {
    // this.setState({indicator: true});

    this.props.deleteFromCart({id: id});
  };
  confirmDlt = id => {
    Alert.alert('Remove item', 'Are you sure you want to remove this item?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: () => this.dltFromCart(id),
      },
    ]);
  };
  renderCart = ({item}) => {
    const {quantity} = item;
    console.log('quan', quantity);

    return (
      <View>
        {this.state.indicator ? (
          <ActivityIndicator />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: colors.white,
              marginVertical: 5,
              borderRadius: 6,
              alignItems: 'center',
              flex: 1,
              // justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, backgroundColor: colors.red}}>
              <Image
                resizeMode="cover"
                style={{width: '100%', height: 90}}
                source={{uri: item.picture}}
              />
            </View>
            <View
              style={{
                flex: 3,
                marginLeft: 10,
                // backgroundColor: colors.red,
                justifyContent: 'space-between',
              }}>
              <View style={{marginBottom: 15}}>
                <Text style={[TYPOGRAPHY.h4Bold, {fontSize: 14}]}>
                  {item.description}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    // backgroundColor: colors.red,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {/* <Text style={{color: colors.green, fontSize: 14}}>
                    Custom
                  </Text> */}
                  <Text
                    style={[
                      TYPOGRAPHY.primary,
                      {
                        backgroundColor: colors.lightgreen,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 5,
                        color: colors.green,
                        fontWeight: 'bold',
                      },
                    ]}>
                    Qty: {quantity} x Price: {item.price}
                  </Text>

                  <Text
                    style={[
                      TYPOGRAPHY.primary,
                      {
                        backgroundColor: colors.lightgreen,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 5,
                        color: colors.green,
                        fontWeight: 'bold',
                        fontWeight: 'bold',
                      },
                    ]}>
                    ${item.quantityPrice}
                  </Text>

                  <View />
                </View>
              </View>
            </View>
            <View
              style={{
                marginBottom: 65,
                padding: 3,
                borderRadius: 50,
                // borderWidth: 1,
                backgroundColor: colors.red,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.confirmDlt(item.id);
                }}>
                <Text style={{color: colors.white}}>X</Text>
              </TouchableOpacity>
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
    const confirmClearCart = () => {
      Alert.alert('Clear cart', 'Are you sure you want to clear this Cart?', [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Clear',
          onPress: () => clearCart(),
        },
      ]);
    };

    return (
      <SafeAreaView style={cartContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{flex: 0.1}}>
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text
              style={[
                TYPOGRAPHY.h4Bold,
                {
                  textAlign: 'center',
                },
              ]}>
              Cart({this.props.length})
            </Text>
          </View>
          {this.props.length !== 0 && (
            <TouchableOpacity
              onPress={() => {
                confirmClearCart();
              }}>
              <View
                style={{
                  backgroundColor: '#FFD8DA',
                  paddingHorizontal: 5,
                  paddingVertical: 4,
                  borderRadius: 5,
                }}>
                <Text style={[TYPOGRAPHY.h6Bold, {color: colors.red}]}>
                  Clear Cart
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

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

            {/* Total calculation */}
            {(this.props.length !== 0 && (
              <>
                <View style={{marginTop: 40}}>
                  <View style={calculationCard}>
                    <View>
                      <Text style={TYPOGRAPHY.h5}>Item Total</Text>
                      <Text style={TYPOGRAPHY.h5}>Delivery Fee</Text>
                    </View>

                    <View>
                      <Text style={TYPOGRAPHY.h5}>
                        ${this.props.totalAmount}
                      </Text>
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
              </>
            )) || (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    // textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                    No Item Found!!!
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
          {this.props.length !== 0 && (
            <View>
              <Button
                name="checkout button"
                style={{flex: 1}}
                // style={{marginTop:10}}
                navigation={this.props.navigation}
                type="checkout"
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {
    // carts: state.cart.carts,
    carts: state.cart,
    length: state.cart.length,
    totalAmount: state.cart.reduce((acc, item) => acc + item.quantityPrice, 0),
  };
};

const mapDispatchToProps = dispatch => {
  // console.log(cartProduct);
  return {
    addToCart: data => {
      dispatch(addToCart(data));
    },
    deleteFromCart: id => {
      dispatch(deleteFromCart(id));
    },
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
