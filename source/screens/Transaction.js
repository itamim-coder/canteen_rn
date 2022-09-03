import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
import {Fonts} from '../theme/Fonts';

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: [],
    };
  }

  transactionlist = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);

    axios
      .get('https://laqil.com/public/api/transaction-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({transactionData: res.data?.data});
          console.log(res.data);
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
    console.log('trans', item);

    const {amount, type, created_at, transaction_id} = item;
    return (
      <SafeAreaView>
        <View
          style={{
            // backgroundColor: "#ebeef2",
            backgroundColor: colors.grey,
            flex: 1,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 10,

                borderRadius: 10,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 8,
                  }}>
                  <Text style={[TYPOGRAPHY.h6Bold]}>
                    ID : {item.transaction_id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[TYPOGRAPHY.h6, {color: colors.light}]}>
                    {created_at.slice(0, 10)}, {created_at.slice(11, 19)}
                  </Text>
                  {type == 'Credit' ? (
                    <Text style={[TYPOGRAPHY.medium, {color: colors.green}]}>
                      +${item.amount}
                    </Text>
                  ) : (
                    <Text style={[TYPOGRAPHY.medium, {color: colors.red}]}>
                      -${item.amount}
                    </Text>
                  )}
                </View>
              </View>
              <View />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  render() {
    const bgimg = {
      justifyContent: 'center',
      height: 200,
    };
    const bgtxt = {
      ...TYPOGRAPHY.medium,
      color: 'white',
      fontSize: 25,
      margin: 15,
    };
    const balancetxt = {
      color: '#D8D8D8',
      fontSize: 15,
      marginLeft: 15,
    };
    const addMoneyBox = {
      padding: 20,
      backgroundColor: 'white',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    };

    const addTxt = {
      ...TYPOGRAPHY.h5,
      textAlign: 'center',
      fontSize: 17,
      color: colors.red,
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name="Transaction" />

        <View style={[SCREEN.screen]}>
          <View style={{}}>
            <ImageBackground
              style={bgimg}
              resizeMode="cover"
              imageStyle={{borderTopLeftRadius: 16, borderTopRightRadius: 16}}
              source={require('../../assets/images/wallet_bg.png')}>
              <Text style={bgtxt}>YumCayMan Wallet</Text>
              <View style={{marginVertical: 8}}>
                <Text style={[TYPOGRAPHY.primary, balancetxt]}>
                  Total Balance
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 20,
                    fontFamily: Fonts.primaryMedium,
                    color: colors.white,
                  }}>
                  $1000
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  fontSize: 12,
                  fontFamily: Fonts.primary,
                  color: colors.darkGrey,
                }}>
                YumCayMan money can be use for ordering food.
              </Text>
            </ImageBackground>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Deposit')}
            style={{
              padding: 20,
              backgroundColor: colors.white,
              shadowColor: '#000',
              borderBottomLeftRadius: 10,

              borderBottomRightRadius: 10,

              elevation: 4,
            }}>
            <Text style={addTxt}>+ Add Money</Text>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 10,
              marginBottom: 20,

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[TYPOGRAPHY.h3]}>Recent Transaction</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.transactionData}
            renderItem={item => this.renderTransaction(item)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
