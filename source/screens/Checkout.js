import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Statusbar from '../components/Statusbar';

import {colors} from '../theme/colors';
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-paper';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'kyd',
      toggleCheckBox: false,
    };
  }
  render() {
    const checkOutContainer = {
      ...SCREEN.screen,
      padding: 0,
    };
    const inputContainer = {
      ...INPUT.inputContainer,
      marginTop: 0,
    };
    const title = {
      fontWeight: 'bold',
      fontSize: 15,
    };
    const checkboxContainer = {
      flexDirection: 'row',

      marginVertical: 10,
      alignItems: 'center',
    };
    const checkbox = {
      alignSelf: 'center',
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <View style={checkOutContainer}>
          <Statusbar name="Checkout" />
          <View>
            <View
              style={{
                padding: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={[TYPOGRAPHY.h4]}>Customer Details</Text>
              <Text style={[TYPOGRAPHY.h4]}>Total $4.00</Text>
            </View>
            <View style={{padding: 20}}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 5}}>
                    <Text
                      style={[
                        TYPOGRAPHY.h5,
                        {color: colors.ash, marginBottom: 5},
                      ]}>
                      Full Name
                    </Text>
                    <View style={inputContainer}>
                      <TextInput
                        placeholder="Enter Full Name"
                        defaultValue="Zahid"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 5}}>
                    <Text
                      style={[
                        TYPOGRAPHY.h5,
                        {color: colors.ash, marginBottom: 5},
                      ]}>
                      Phone Number
                    </Text>
                    <View style={inputContainer}>
                      <TextInput
                        placeholder="Enter Phone Number"
                        defaultValue="+0085324324"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, marginBottom: 5}}>
                    <Text
                      style={[
                        TYPOGRAPHY.h5,
                        {color: colors.ash, marginBottom: 5},
                      ]}>
                      Email Address
                    </Text>
                    <View style={inputContainer}>
                      <TextInput
                        placeholder="Enter Email Address"
                        defaultValue="zahid@powah.com"
                        // editable={false}
                        placeholderTextColor={'grey'}
                        style={[INPUT.input]}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={checkboxContainer}>
                <CheckBox
                  disabled={false}
                  value={this.state.toggleCheckBox}
                  onValueChange={newValue => {
                    this.setState({toggleCheckBox: newValue});
                  }}
                />
                <Text style={TYPOGRAPHY.primary}>Wallet Balance $0.00</Text>
              </View>
              <Text
                style={[TYPOGRAPHY.h5, {color: colors.ash, marginBottom: 5}]}>
                Choose Currency
              </Text>

              <RadioButton.Group
                value={this.state.checked}
                onValueChange={newValue => {
                  this.setState({checked: newValue});
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="kyd" />
                  <Text>KYD</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="usd" />
                  <Text>USD</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Payment')}
          style={[
            BUTTONS.btnPrimary,
            {
              backgroundColor: colors.red,
              marginHorizontal: 20,
              marginVertical: 10,
            },
          ]}>
          <Text style={BUTTONS.btnFont}>Continue To Pay</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
