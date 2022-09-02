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
import {Picker} from '@react-native-picker/picker';
import {connect} from 'react-redux';

export class TransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_no: '038393849838',
      card_exp: '0424',
      card_cvv: '999',
      card_name: 'Zahid Habib',
      card_email: 'zahidprimex@gmail.com',
      card_phone: '01711950033',
      card_address: 'Motijheel',
      card_city: 'Dhaka',
      postal_code: '1200',
      order_type: 'app',
      payment_type: 'card',
      date: new Date(),
      open: false,
      children: [],
      selectedValue: '',
      cart_products: this.props.carts,
      schools_id: '1',
      add_products: [],
    };
  }

  studentlist = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;

    axios
      .get('https://laqil.com/public/api/student-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({children: res.data.data});
          console.log(res.data.data);
        },
        err => {
          console.log(err);
        },
      );
  };
  pickerActivity = async id => {
    this.setState({selectedValue: id});
    // selectedValue={this.state.selectedValue}
  };
  products = this.props.carts;
  componentDidMount() {
    this.studentlist();
    console.log(
      'form',
      this.state.cart_products.map(product => {
        const add = [product.id, product.quantity];
        this.state.add_products.push(add);
      }),
    );
    console.log('products', this.state.add_products);
  }
  payment = async () => {
    const user = await AsyncStorage.getItem('token');
    const parse = JSON.parse(user);
    const token = parse;
    console.log('token', token);
    const data = {
      card_no: this.state.card_no,
      card_exp: this.state.card_exp,
      card_cvv: this.state.card_cvv,

      card_name: this.state.card_name,
      card_email: this.state.card_email,
      card_phone: this.state.card_phone,
      card_address: this.state.card_address,
      card_city: this.state.card_city,
      postal_code: this.state.postal_code,
      student_id: this.state.selectedValue,
      order_type: this.state.order_type,
      payment_type: this.state.payment_type,
      products: this.state.add_products,
      school_id: this.state.schools_id,
    };

    console.log(data);
    axios
      .post('https://laqil.com/public/api/order-store', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log(res);
          if (res.data.status == true) {
            alert(res.data.message);
            // this.props.navigation.navigate('Profile');
          } else {
            // alert(res.data.message);
          }
        },
        err => {
          alert(err.response.data.message);
          console.log(err);
        },
      );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={[]}>
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
                value={this.state.card_exp}
                onChangeText={value => {
                  this.setState({card_exp: value});
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
                value={this.state.card_cvv}
                onChangeText={value => {
                  this.setState({card_cvv: value});
                }}
                placeholder="CCV"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>

            <Text style={[TYPOGRAPHY.h5]}>Name</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.card_name}
                onChangeText={value => {
                  this.setState({card_name: value});
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
                value={this.state.card_email}
                onChangeText={value => {
                  this.setState({card_email: value});
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
                value={this.state.card_phone}
                onChangeText={value => {
                  this.setState({card_phone: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Billing Address</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.card_address}
                onChangeText={value => {
                  this.setState({card_address: value});
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
                value={this.state.card_city}
                onChangeText={value => {
                  this.setState({card_city: value});
                }}
                placeholder="City"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Postal Code</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.postal_code}
                onChangeText={value => {
                  this.setState({postal_code: value});
                }}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Select Child</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // width: width / 2,
              }}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={{height: 30, width: 200}}
                // onValueChange={(modeValue, modeIndex) => this.setState({mode: modeValue})}>
                // {this.state.dataSource.map((item, key)=>(
                //         <Picker.Item label={item} value={item} key={key} />)
                //         )}
                onValueChange={(itemValue, itemIndex, id) => {
                  this.pickerActivity(itemValue);
                  // this.setState({selectedValue: itemValue});
                }}>
                <Picker.Item label="Select a Child" value="0" />
                {this.state.children.map(item => (
                  // <TouchableOpacity>
                  // console.log(item.id),
                  <Picker.Item label={item.name} value={item.id} />
                  // </TouchableOpacity>
                ))}
              </Picker>
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Notes</Text>
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

            {this.props.type === 'Payment' ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.payment();
                  }}
                  // disabled={this.state.disabled}
                  style={BUTTONS.btnPrimary}>
                  <Text style={BUTTONS.btnFont}>Pay with card</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    this.deposit();
                  }}
                  // disabled={this.state.disabled}
                  style={BUTTONS.btnPrimary}>
                  <Text style={BUTTONS.btnFont}>Deposit</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
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
export default connect(mapStateToProps)(TransactionForm);
