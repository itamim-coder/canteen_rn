import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';
import INPUT from '../theme/Input';
import SCREEN from '../theme/Screen';
import BUTTONS from '../theme/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../theme/colors';

export default class Deposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_no: '5424180279791732',
      expiry_date: '04/24',
      ccv: '998',
      amount: '5',
      name: 'Zahid Habib',
      email: 'zahidprimex@gmail.com',
      phone: '01722554488',
      address: 'Motijheel',
      city: 'Dhaka',
      zip: '1200',
      country: 'Cayman Islands',
      state: 'Cayman',
      currency: 'USD',
      save: 'yes',
      date: new Date(),
      open: false,
      //   transactionData: [],
    };
  }
  deposit = async () => {
    const user = await AsyncStorage.getItem('token');
    const parse = JSON.parse(user);

    const token = parse;
    console.log('token', token);
    const data = {
      card_no: this.state.card_no,
      expiry_date: this.state.expiry_date,
      ccv: this.state.ccv,
      amount: this.state.amount,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country,
      state: this.state.state,
      currency: this.state.currency,
      save: this.state.save,
    };

    // console.log(data);
    axios
      .post('https://laqil.com/public/api/deposit-payment', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log('res', res.data.message);
          if (res.data.status == true) {
            alert(res.data.message);
            this.props.navigation.navigate('Profile');
          } else {
            alert(res.data.message);
          }
        },
        err => {
          alert(response.data.message);
          console.log('error', err);
        },
      );
  };
  render() {
    console.log(this.state.date);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <Statusbar name={'Deposit'} />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[SCREEN.screen]}>
            <Text style={[TYPOGRAPHY.h5]}>Card No</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.card_no}
                onChangeText={value => {
                  this.setState({card_no: value});
                }}
                placeholder="Card No"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5, {}]}>Expiry Date</Text>
            <View
              style={[
                INPUT.inputContainer,
                {flexDirection: 'row', marginTop: 0, marginBottom: 35},
              ]}>
              <TextInput
                value={this.state.expiry_date}
                onChangeText={value => {
                  this.setState({expiry_date: value});
                }}
                placeholder="Expiry Data"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>

            <Text style={[TYPOGRAPHY.h5]}>CCV</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.ccv}
                onChangeText={value => {
                  this.setState({ccv: value});
                }}
                placeholder="CCV"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Amount</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.amount}
                onChangeText={value => {
                  this.setState({amount: value});
                }}
                placeholder="Amount"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Name</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.name}
                onChangeText={value => {
                  this.setState({name: value});
                }}
                placeholder="Name"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.email}
                onChangeText={value => {
                  this.setState({email: value});
                }}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.phone}
                onChangeText={value => {
                  this.setState({phone: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Address</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.address}
                onChangeText={value => {
                  this.setState({address: value});
                }}
                placeholder="Address"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>City</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.city}
                onChangeText={value => {
                  this.setState({city: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>ZIP CODE</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.zip}
                onChangeText={value => {
                  this.setState({zip: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Country</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.country}
                onChangeText={value => {
                  this.setState({country: value});
                }}
                placeholder="Country"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>State</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.state}
                onChangeText={value => {
                  this.setState({state: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Currency</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.currency}
                onChangeText={value => {
                  this.setState({currency: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.deposit();
              }}
              // disabled={this.state.disabled}
              style={BUTTONS.btnPrimary}>
              <Text style={BUTTONS.btnFont}>Deposit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
