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
  render() {
    return (
      <SafeAreaView style={[SCREEN.screen, {padding: 0}]}>
        <Statusbar name="Checkout" />
        <View>
          <View
            style={{
              padding: 20,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={(TYPOGRAPHY.medium, {fontSize: 20})}>
              Customer Details
            </Text>
            <Text style={(TYPOGRAPHY.medium, {fontSize: 20})}>Total $4.00</Text>
          </View>
          <View style={{padding: 20}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, marginBottom: 5}}>
                  <Text style={TYPOGRAPHY.primary}>Full Name</Text>
                  <View style={[INPUT.inputContainer, {marginTop: 0}]}>
                    <TextInput
                      // onChangeText={text => setName(text)}
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
                  <Text style={TYPOGRAPHY.primary}>Phone Number</Text>
                  <View style={[INPUT.inputContainer, {marginTop: 0}]}>
                    <TextInput
                      // onChangeText={text => setName(text)}
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
                  <Text style={TYPOGRAPHY.primary}>Email Address</Text>
                  <View style={[INPUT.inputContainer, {marginTop: 0}]}>
                    <TextInput
                      // onChangeText={text => setPhone(text)}
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
            <View style={styles.checkboxContainer}>
              <CheckBox
                disabled={false}
                // value={toggleCheckBox}
                // onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={TYPOGRAPHY.primary}>Wallet Balance $0.00</Text>
            </View>
            <Text style={TYPOGRAPHY.h5}>Choose Currency</Text>
            <RadioButton.Group
            // onValueChange={newValue => setChecked(newValue)}
            // value={checked}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="kyd" />
                <Text>KYD</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="usd" />
                <Text>USD</Text>
              </View>
            </RadioButton.Group>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Payment')}
              style={[BUTTONS.btnPrimary, {backgroundColor: colors.green}]}>
              <Text style={BUTTONS.btnFont}>Continue To Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',

    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
