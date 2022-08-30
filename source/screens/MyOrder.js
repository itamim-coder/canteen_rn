import {FlatList, Text, TouchableOpacity, View} from 'react-native';
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
      transactionData: [],
    };
  }
  transactionlist = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = '1|ZE85ycMus7eRT0dk9h2IJZIp1RBSNgd1n9KYxMHZ';
    console.log('token', token);

    axios
      .get('https://laqil.com/public/api/transaction-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({transactionData: res.data?.data});
          //   console.log(res.data);
        },
        err => {
          console.log(err);
        },
      );
  };

  componentDidMount() {
    this.transactionlist();
  }

  renderTransaction = ({item}) => {
    console.log('item', item);
    // const {amount, type, transaction_id} = item;
    return (
      <SafeAreaView>
        <View>
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
                  Order DT5432
                </Text>
                <AntDesign name="right" size={15} color="black" />
              </View>
              <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                01 JAN 2000
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
                  3 Items
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
                    {/* $ {amount} */}
                    $12.50
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
                  In Transit
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  render() {
    // console.log(this.state.transactionData);

    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={"My Orders"}/>
        <View style={[SCREEN.screen]}>
          {/* <View
            style={{
              marginBottom: 15,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[TYPOGRAPHY.h3]}>My Orders</Text>
          </View> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.transactionData}
            renderItem={item => this.renderTransaction(item)}
          />
          {/* <View>
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
                  <Text style={[TYPOGRAPHY.h4Bold]}>ID : 123456</Text>
                  <AntDesign name="right" size={15} color="black" />
                </View>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  01 JAN 2000
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Octicons name="dot-fill" size={20} color="red" />
                  <Text
                    style={[
                      TYPOGRAPHY.h5,
                      {paddingLeft: 10, color: colors.light},
                    ]}>
                    $ {amount}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: colors.lightgreen,
                    paddingHorizontal: 20,
                    paddingVertical: 2,
                    borderRadius: 5,
                  }}>
                  <Text style={[TYPOGRAPHY.h5, {color: colors.green}]}>
                    Debit
                  </Text>
                </View>
              </View>
            </View>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}
