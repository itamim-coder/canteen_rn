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
import {reset} from '../../redux/cartSlice';
import {RadioButton} from 'react-native-paper';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
      schools_id: '',
      add_products: [],
      isChildVisible: false,
      selectChild: null,
    };
  }
  toggleChild = () => {
    this.setState({checked: this.state.selectChild});
    this.setState({isChildVisible: !this.state.isChildVisible});
  };

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
  clearCart = () => {
    this.props.reset();
  };
  childActivity = async id => {
    this.setState({selectChild: id});
    this.setState({isChildVisible: !this.state.isChildVisible});
    // selectedValue={this.state.selectedValue}
  };
  products = this.props.carts;
  async componentDidMount() {
    this.studentlist();

    this.state.cart_products.map(product => {
      const add = [product.id, product.quantity];
      this.state.add_products.push(add);
    }),
      console.log('products', this.state.add_products);
  }
  payment = async () => {
    const user = await AsyncStorage.getItem('token');
    const parse = JSON.parse(user);
    const token = parse;
    console.log('token', token);
    const school = await AsyncStorage.getItem('selected_school');
    const school_id = JSON.parse(school);
    console.log('school cart', school_id);
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
      student_id: this.state.selectChild,
      order_type: this.state.order_type,
      payment_type: this.state.payment_type,
      products: this.state.add_products,
      school_id: school_id,
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
            this.clearCart();

            alert(res.data.message);
            // this.props.navigation.navigate('TabNabigator');
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

            {/* --------select child---------- */}
            <View style={{flex: 1, marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Select Child</Text>

              <TouchableOpacity
                onPress={() => {
                  this.toggleChild();
                }}>
                {this.state.checked == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Select Child
                    </Text>
                    <AntDesign name="caretdown" size={16} color="gray" />
                  </View>
                ) : (
                  this.state.children.map(
                    item =>
                      item.id === this.state.checked && (
                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              borderWidth: 2,
                              borderColor: colors.gray,
                              borderRadius: 5,
                              paddingHorizontal: 15,
                              paddingVertical: 10,
                              alignItems: 'center',
                            },
                          ]}>
                          <Text style={[TYPOGRAPHY.h5]}>{item.name}</Text>
                          <AntDesign name="caretdown" size={16} color="black" />
                        </View>
                      ),
                  )
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isChildVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select Child
                  </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {this.state.children.map(item => (
                    // <TouchableOpacity>
                    // console.log(item.id),

                    <RadioButton.Group
                      value={this.state.checked}
                      onValueChange={newValue => {
                        this.setState({checked: newValue});
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton color={colors.red} value={item.id} />
                        <Text
                          style={[
                            TYPOGRAPHY.primary,
                            {fontSize: 18, paddingRight: 15},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    </RadioButton.Group>
                  ))}
                </ScrollView>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleChild()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.childActivity(this.state.checked)}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* --------end child---------- */}

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
const mapDispatchToProps = dispatch => {
  // console.log(cartProduct);
  return {
    reset: () => {
      dispatch(reset());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
