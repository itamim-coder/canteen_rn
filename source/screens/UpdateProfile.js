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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';
import Statusbar from '../components/Statusbar';
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
      notify_low_balance: 0,
      notify_promotions: 0,
      notify_orders: 0,
      low_balance_point: '',
      notes: '',
      is_locked: '1',
      status: '1',
      prev: '',
      response: null,
      fetch_email: '',
      disabled: false,
      indicator: false,
    };
    console.log('bala', this.state.notify_low_balance);
    console.log('promo', this.state.notify_promotions);
    console.log('order', this.state.notify_orders);
  }
  componentDidMount() {
    this.getProfile();
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
          console.log(res.data);
          this.setState({userData: res.data?.data});

          this.setState({notify_low_balance: res.data.data.notify_low_balance});
          this.setState({low_balance_point: res.data.data.low_balance_point});
          this.setState({notify_orders: res.data.data.notify_orders});
          this.setState({notify_promotions: res.data.data.notify_promotions});
          console.log(this.state.notify_low_balance);
        },
        err => {
          console.log(err);
        },
      );
  };

  updateProfile = async ({email}) => {
    this.setState({email: email});
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);
    const token = parse.token;
    console.log(token);
    this.setState({indicator: true});
    this.setState({disabled: true});
    setTimeout(() => {
      this.setState({indicator: false});
      this.setState({disabled: false});
    }, 1500);

    const data = {
      name: (this.state.name && this.state.name) || this.state.userData.name,
      phone:
        (this.state.phone && this.state.phone) || this.state.userData.phone,

      email: this.state.email,
      is_locked: this.state.is_locked,
      status: this.state.status,
      // display_name: this.state.display_name,

      notify_low_balance: this.state.notify_low_balance,

      notify_promotions: this.state.notify_promotions,
      notify_orders: this.state.notify_orders,
      low_balance_point: this.state.low_balance_point,
      // response: null,
      notes:
        (this.state.notes && this.state.notes) || this.state.userData.notes,
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
            this.props.navigation.navigate('Home');
          }
        },
        err => {
          console.log(err);
        },
      );
  };

  openGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        alert('User Cancelled');
      } else if (response.error) {
        alert(response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        console.log(options);
        // this.setState({response: response});
      }
    });
  };

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
    // this.setState({fetch_email: this.state.userData.email});
    console.log('response', this.state.userData.low_balance_point);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar />
        <View style={[SCREEN.screen, {backgroundColor: colors.white}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={[TYPOGRAPHY.primary, {fontSize: 28}]}>
                  Profile
                </Text>
              </View>

              <TouchableOpacity onPress={() => this.openGallery()}>
                {this.state.response === null ? (
                  <>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        // backgroundColor: colors.red,
                      }}
                      source={require('../../assets/images/profile.png')}
                    />
                  </>
                ) : (
                  <>
                    {this.state.response?.assets &&
                      this.state.response?.assets.map(({uri}) => (
                        <View key={uri}>
                          <Image
                            resizeMode="contain"
                            resizeMethod="scale"
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 50,
                              // backgroundColor: colors.red,
                            }}
                            source={{uri}}
                          />
                        </View>
                      ))}
                  </>
                )}
              </TouchableOpacity>
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
                        this.setState({
                          name: value ? value : this.state.userData.name,
                        });
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
                    <Picker.Item label="NO" value={0} />
                    <Picker.Item label="YES" value={1} />
                  </Picker>
                </View>
                <View style={{flex: 1, margin: 3}}>
                  <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                    Low Balance Point
                  </Text>
                  <View style={INPUT.inputContainer}>
                    <TextInput
                      onChangeText={value => {
                        this.setState({low_balance_point: value});
                      }}
                      // onChangeText={text => setName(text)}
                      // defaultValue="3820"
                      // defaultValue={this.state.userData.low_balance_point}
                      defaultValue={this.state.low_balance_point}
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
                    <Picker.Item label="NO" value={0} />
                    <Picker.Item label="YES" value={1} />
                  </Picker>
                </View>
                <View style={{flex: 1, margin: 3}}>
                  <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                    Notify Orders
                  </Text>
                  <Picker
                    // defaultValue={this.state.userData.notify_orders}
                    selectedValue={this.state.notify_orders}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({notify_orders: itemValue});
                    }}>
                    <Picker.Item label="NO" value={0} />
                    <Picker.Item label="YES" value={1} />
                  </Picker>
                </View>
              </View>
              <View style={{paddingBottom: 50}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Order Notes
                </Text>

                <KeyboardAvoidingView style={[INPUT.inputContainer]}>
                  <TextInput
                    defaultValue={this.state.userData.notes}
                    onChangeText={value => {
                      this.setState({
                        notes: value,
                      });
                    }}
                    multiline={true}
                    numberOfLines={3}
                    // editable={false}
                    placeholderTextColor={'grey'}
                    style={[INPUT.input, {color: colors.black}]}
                  />
                </KeyboardAvoidingView>
              </View>
            </View>
          </ScrollView>
          {this.state.indicator === true ? (
            (console.log(this.state.indicator),
            (
              <View>
                <TouchableOpacity
                  disabled={this.state.disabled}
                  style={BUTTONS.btnPrimary}>
                  <ActivityIndicator color={colors.white} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => this.updateProfile({email, phone, name, notes})}
                style={BUTTONS.btnPrimary}>
                <Text style={BUTTONS.btnFont}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 15,
  },
});
