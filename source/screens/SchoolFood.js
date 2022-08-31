import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import SCREEN from '../theme/Screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';
import {colors} from '../theme/colors';
import FloatCart from '../components/FloatCart';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
const width = Dimensions.get('screen').width / 2 - 25;

export class SchoolFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route?.params?.id,

      schoolFoods: [],
      //   visible: false,
      //   message: '',
      quantity: 1,
    };
    console.log(this.props.route.params.id);
  }

  componentDidMount() {
    this.setState({visible: true});
    fetch(`https://laqil.com/public/api/product-list?school=${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);

        // this.setState({foods: res});
        if (res.status == true) {
          this.setState({schoolFoods: res.data});
          // return this.state.foods;
          //   this.setState({visible: false});
        } else if (res.data == null) {
          alert(res.message);
          this.setState({message: res.message});
        }
      });
  }
  add = item => {
    const cartProduct = {
      id: item.id,
      description: item.description,
      price: item.price,
      picture: item.picture,
      quantity: this.state.quantity,
      quantityPrice: item.price * this.state.quantity,
    };
    this.props.addToCart({cartProduct});
  };

  renderItem = ({item}) => {
    const {description, picture, price} = item;
    console.log(this.props.add_item, '===', item.id);
    const cartItems = this.props.add_item;
    // this.props.add_item.map(item => console.log('map', item.id));
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {
              id: item.id,
              picture: item.picture,
              name: item.description,
              price: item.price,
              quantity: 0,
            })
          }>
          <View
            style={{
              backgroundColor: colors.white,

              // backgroundColor: colors.light,
              width,
              marginHorizontal: 2,
              borderRadius: 10,
              marginBottom: 20,
              padding: 15,
              // marginHorizontal: 35,
              // padding: 20,
              // width: '100%',

              // borderRadius: 10,
              // margin: 5,
              // marginBottom: 15,
            }}>
            <Text style={[TYPOGRAPHY.medium, {fontSize: 12}]}>
              {description}
            </Text>
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                // backgroundColor: colors.red
              }}>
              <Image
                resizeMode="contain"
                style={{width: 120, height: 125, alignItems: 'center'}}
                source={{uri: `${item.picture}`}}
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
              <Text style={[TYPOGRAPHY.h4Bold, {fontWeight: 'bold'}]}>
                ${price}.00
              </Text>
              {/* {cartItems.map(cartItem => {
                console.log('cartitem', cartItem.id);
                console.log('item', item.id);
                cartItem.id === item.id ? (
                  <TouchableOpacity
                    // onPress={() => this.add(item)}
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
                      1
                    </Text>
                  </TouchableOpacity>
                ) : ( */}
              <TouchableOpacity
                onPress={() => this.add(item)}
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
              {/* );
              })} */}
            </View>
          </View>
        </TouchableOpacity>
        <View />
      </SafeAreaView>
    );
  };
  render() {
    console.log(this.state.id);
    const popularBox = {
      //   paddingVertical: 20,
      // backgroundColor: colors.red,
      // marginBottom:10,
      ...SCREEN.screen,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={'Foods'} />
        <View style={popularBox}>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            contentContainerStyle={{
              // marginTop: 10,
              paddingBottom: 50,
            }}
            data={this.state.schoolFoods}
            numColumns={2}
            renderItem={item => this.renderItem(item)}
          />
        </View>
        <FloatCart navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    carts: state.cart.carts,
    add_item: state.cart,
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
export default connect(mapStateToProps, mapDispatchToProps)(SchoolFood);
