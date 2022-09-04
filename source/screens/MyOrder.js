import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';
import SCREEN from '../theme/Screen';
import {colors} from '../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      indicator: true,
    };
  }
  orderlist = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;

    console.log('token', token);
    this.setState({indicator: true});
    axios
      .get('https://laqil.com/public/api/order-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          // console.log(res.data.data);
          this.setState({orderData: res.data?.data});
          //   console.log(res.data);
          this.setState({indicator: false});
        },
        err => {
          console.log(err);
          this.setState({indicator: false});
        },
      );
  };

  componentDidMount() {
    this.orderlist();
  }

  renderOrderList = ({item}) => {
    const total = item.data.ordered_product.reduce((total, obj) => {
      return total + obj.qty;
    }, 0);
    console.log(item.data);

    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('OrderDetails', {
              id: item.data.order_no,
            })
          }>
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <View style={{padding: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[TYPOGRAPHY.h4Bold, {fontSize: 15}]}>
                  {/* ID : {transaction_id} */}
                  Order {item.data.order_no}
                </Text>
                <AntDesign name="right" size={15} color="black" />
              </View>
              <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                {item.data.date.slice(0, 10)}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 0.7,
                borderStyle: 'dashed',
                borderColor: colors.light,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                //   paddingTop: 10,
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    TYPOGRAPHY.h6Bold,
                    // {paddingLeft: 10, color: colors.light},
                  ]}>
                  {total} Items
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Octicons name="dot-fill" size={18} color="red" />
                  <Text
                    style={[
                      TYPOGRAPHY.h6Bold,
                      {paddingLeft: 10, color: colors.light},
                    ]}>
                    ${item.data.payment_amount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.lightgreen,
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 5,
                }}>
                <Text style={[TYPOGRAPHY.h6Bold, {color: colors.green}]}>
                  {/* {type} */}
                  {item.data.payment_status.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  render() {
    // console.log(this.state.transactionData);

    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={'My Orders'} />
        {this.state.indicator === true ? (
          <ActivityIndicator
            color={colors.red}
            size={'large'}
            style={{flex: 1}}
          />
        ) : (
          <>
            <View style={[SCREEN.screen]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.orderData}
                renderItem={item => this.renderOrderList(item)}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }
}
