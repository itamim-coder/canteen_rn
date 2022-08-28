import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../theme/colors';
// import STYLES from '../theme/styles';
import {Picker} from '@react-native-picker/picker';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0',
      name: '',
      phone: '',
      email: '',
      display_name: '',
      userData: {},
      notify_low_balance: '',
      notify_promotions: '',
      notify_orders: '',
      low_balance_point: '',
      notes: '',
      is_locked: '1',
      status: '1',
      prev: '',
    };
  }
  getProfile = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', user);

    axios
      .get('https://laqil.com/public/api/profile', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({userData: res.data?.data});

          this.setState({notify_low_balance: res.data.data.notify_low_balance});
          console.log(this.state.notify_low_balance);
        },
        err => {
          console.log(err);
        },
      );
  };
  updateProfile = async ({email}) => {
    console.log('item', email);
    this.setState({email: email});
   
    console.log(this.state.phone);
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log(token);
    const data = {
      name: this.state.name,
      phone: this.state.phone,

      email: this.state.email,
      is_locked: this.state.is_locked,
      status: this.state.status,
      // display_name: this.state.display_name,

      // notify_low_balance: this.status.notify_low_balance,
      // notify_promotions: this.state.notify_promotions,
      // notify_orders: this.state.notify_orders,
      // low_balance_point: this.state.low_balance_point,
      notes: this.state.notes,
    };

    console.log(data);
    axios
      .post('https://laqil.com/public/api/update-profile', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log(res);
          if (res.data.status == true) {
            alert(res.data.message);
            this.props.navigation.navigate('Profile');
          }
        },
        err => {
          console.log(err);
        },
      );
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const {
      name,
      balance,
      email,
      phone,
      notify_low_balance,
      notify_promotions,
      notify_orders,
      low_balance_point,
      notes,
    } = this.state.userData;
    // this.setState({email: this.state.userData.email});
    return (
      <SafeAreaView style={[SCREEN.screen, {backgroundColor: colors.white}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              //   padding: 20,
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={[TYPOGRAPHY.primary, {fontSize: 28}]}>Profile</Text>
            </View>
            <Image
              style={{width: 80, height: 80}}
              source={require('../../assets/images/profile.png')}
            />
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Full Name
                </Text>
                <View style={INPUT.inputContainer}>
                  <TextInput
                    onChangeText={value => {
                      this.setState({name: value});
                    }}
                    placeholder="Enter Full Name"
                    defaultValue={this.state.userData.name}
                    placeholderTextColor={'grey'}
                    style={INPUT.input}
                  />
                </View>
              </View>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Account
                </Text>
                <View style={INPUT.inputContainer}>
                  <TextInput
                    // onChangeText={text => setName(text)}
                    defaultValue={this.state.userData.balance}
                    placeholderTextColor={'gray'}
                    editable={false}
                    style={[
                      INPUT.input,
                      {color: colors.gray, backgroundColor: colors.gray},
                    ]}
                  />
                </View>
              </View>
            </View>
            <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
              Phone Number
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                onChangeText={value => {
                  this.setState({phone: value});
                }}
                placeholder="Enter Phone Number"
                defaultValue={this.state.userData.phone}
                placeholderTextColor={'grey'}
                style={INPUT.input}
                keyboardType="numeric"
              />
            </View>
            <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
              Email Address
            </Text>
            <View style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setPhone(text)}
                placeholder="Enter Email Address"
                defaultValue={this.state.userData.email}
                editable={false}
                placeholderTextColor={'grey'}
                style={[
                  INPUT.input,
                  {color: colors.grey, backgroundColor: colors.gray},
                ]}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Notify Low Balance
                </Text>
                <Picker
                  // defaultSelectedValue={this.state.userData.notify_low_balance}
                  // defaultValue={this.state.userData.notify_low_balance}
                  selectedValue={this.state.notify_low_balance}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log('item', this.state.notify_low_balance);
                    this.setState({notify_low_balance: itemValue});
                  }}>
                  <Picker.Item label="NO" value="0" />
                  <Picker.Item label="YES" value="1" />
                </Picker>
              </View>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Low Balance Point
                </Text>
                <View style={INPUT.inputContainer}>
                  <TextInput
                    // onChangeText={text => setName(text)}
                    // defaultValue="3820"
                    defaultValue={this.state.userData.low_balance_point}
                    placeholderTextColor={'grey'}
                    // editable={false}
                    style={[INPUT.input, {color: colors.black}]}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Notify Promotions
                </Text>
                <Picker
                  // selectedValue={this.state.initialOption}
                  selectedValue={this.state.notify_promotions}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({notify_promotions: itemValue});
                  }}>
                  <Picker.Item label="NO" value="0" />
                  <Picker.Item label="YES" value="1" />
                </Picker>
              </View>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Notify Orders
                </Text>
                <Picker
                  selectedValue={this.state.selectedValue}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedValue: itemValue});
                  }}>
                  <Picker.Item label="NO" value="0" />
                  <Picker.Item label="YES" value="1" />
                </Picker>
              </View>
            </View>

            <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
              Order Notes
            </Text>

            <KeyboardAvoidingView style={INPUT.inputContainer}>
              <TextInput
                defaultValue={this.state.userData.notes}
                multiline={true}
                numberOfLines={3}
                // editable={false}
                placeholderTextColor={'grey'}
                style={[INPUT.input, {color: colors.black}]}
              />
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.updateProfile({email, phone, name, notes})}
          style={BUTTONS.btnPrimary}>
          <Text style={BUTTONS.btnFont}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 15,
  },
});
