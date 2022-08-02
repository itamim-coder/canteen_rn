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

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'no',
    };
  }
  render() {
    return (
      <SafeAreaView style={SCREEN.screen}>
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
                    // onChangeText={text => setName(text)}
                    placeholder="Enter Full Name"
                    defaultValue="Zahid"
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
                    defaultValue="3820"
                    placeholderTextColor={'grey'}
                    editable={false}
                    style={[
                      INPUT.input,
                      {color: colors.grey, backgroundColor: colors.light},
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
                // onChangeText={text => setName(text)}
                placeholder="Enter Phone Number"
                defaultValue="+0085324324"
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
                defaultValue="zahid@powah.com"
                editable={false}
                placeholderTextColor={'grey'}
                style={[
                  INPUT.input,
                  {color: colors.grey, backgroundColor: colors.light},
                ]}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 3}}>
                <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                  Notify Low Balance
                </Text>
                <Picker
                  selectedValue={this.state.selectedValue}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedValue: itemValue});
                  }}>
                  <Picker.Item label="NO" value="no" />
                  <Picker.Item label="YES" value="yes" />
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
                  selectedValue={this.state.selectedValue}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedValue: itemValue});
                  }}>
                  <Picker.Item label="NO" value="no" />
                  <Picker.Item label="YES" value="yes" />
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
                  <Picker.Item label="NO" value="no" />
                  <Picker.Item label="YES" value="yes" />
                </Picker>
              </View>
            </View>

            <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
              Order Notes
            </Text>

            <KeyboardAvoidingView style={INPUT.inputContainer}>
              <TextInput
                // onChangeText={text => setPhone(text)}
                //   placeholder="Enter Email Address"
                // defaultValue="zahid@powah.com"
                multiline={true}
                numberOfLines={3}
                // editable={false}
                placeholderTextColor={'grey'}
                style={[INPUT.input, {color: colors.black}]}
              />
            </KeyboardAvoidingView>

            <TouchableOpacity style={BUTTONS.btnPrimary}>
              <Text style={BUTTONS.btnFont}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 15,
  },
});
