import React, {Component} from 'react';
import {
  ImageBackground,
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
import {BottomSheet} from 'react-native-btr';

import {RadioButton} from 'react-native-paper';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';
import INPUT from '../theme/Input';
import Button from '../components/Button';

export default class Topup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: 'kyd',
    };
  }
  // const [visible, setVisible] = useState(false);
  // const [checked, setChecked] = React.useState('kyd');

  render() {
    const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      this.setState({visible: !this.state.visible});
    };
    return (
      <SafeAreaView style={styles.topupConatiner}>
        <View style={styles.addMoneyBox}>
          <View
            style={{
              shadowColor: '#000',
              borderTopLeftRadius: 0.5,
              borderTopRightRadius: 0.5,
              shadowOffset: {
                height: 32,
                width: 22,
              },
              shadowRadius: 44,
              shadowOpacity: 1.5,
              elevation: 0.9,
            }}>
            <ImageBackground
              style={styles.bgimg}
              resizeMode="cover"
              imageStyle={{borderRadius: 6}}
              source={require('../../assets/images/wallet_bg.png')}>
              <Text style={[TYPOGRAPHY.h1, styles.bgtxt]}>Wallet</Text>
              <Text style={[TYPOGRAPHY.primary, styles.balancetxt]}>
                Total Balance{'\n'}$1000
              </Text>
            </ImageBackground>
            <TouchableOpacity
              onPress={toggleBottomNavigationView}
              style={{
                padding: 20,
              }}>
              <Text style={[BUTTONS.btnFont, styles.addtxt]}>Add Money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addMoney}>
            <BottomSheet
              visible={this.state.visible}
              //setting the visibility state of the bottom shee
              onBackButtonPress={toggleBottomNavigationView}
              //Toggling the visibility state on the click of the back botton
              onBackdropPress={toggleBottomNavigationView}
              //Toggling the visibility state on the clicking out side of the sheet
            >
              {/*Bottom Sheet inner View*/}
              <SafeAreaView style={styles.bottomNavigationView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={[
                      TYPOGRAPHY.h3,
                      {
                        textAlign: 'center',
                        margin: 5,
                        fontSize: 22,
                        color: colors.pink,
                      },
                    ]}>
                    Wallet Topup
                  </Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                    }}>
                    <Text style={TYPOGRAPHY.primary}>
                      Wallet Balance will reflect in CI dollars. Enter topup
                      amount and choose currency. If you are paying in USD,
                      conversion rate is .80.
                      {'\n'}
                      Click continue, you'll be presented with our checkout
                      form.
                    </Text>
                    <Text style={[TYPOGRAPHY.medium, {marginTop: 10}]}>
                      Account No
                    </Text>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setEmail(text)}
                        // placeholder="Email"
                        editable={false}
                        defaultValue="0030"
                        placeholderTextColor={'grey'}
                        style={styles.input}
                      />
                    </View>
                    <Text style={TYPOGRAPHY.medium}>Name of Acoount</Text>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setEmail(text)}
                        editable={false}
                        defaultValue="Zahid"
                        placeholderTextColor={'grey'}
                        style={styles.input}
                      />
                    </View>
                    <Text style={TYPOGRAPHY.medium}>Enter Amount In KYD</Text>
                    <View style={TYPOGRAPHY.inputContainer}>
                      <TextInput
                        // onChangeText={text => setEmail(text)}
                        placeholder="i e: 1234 56"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                    <Text style={TYPOGRAPHY.medium}>Enter Amount In USD</Text>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setPassword(text)}

                        placeholder="i e: 1234 56"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                    <Text style={TYPOGRAPHY.medium}>Choose Currency</Text>
                    <RadioButton.Group
                      onValueChange={newValue => {
                        this.setState({checked: newValue});
                      }}
                      value={this.state.checked}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value="kyd" />
                        <Text>KYD</Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value="usd" />
                        <Text>USD</Text>
                      </View>
                    </RadioButton.Group>
                    <Button
                      type="continue"
                      navigation={this.props.navigation}
                      page="AddtoWallet"
                    />
                  </ScrollView>
                </View>
              </SafeAreaView>
            </BottomSheet>
          </View>
        </View>

        <View
          style={{
            // backgroundColor: "#ebeef2",
            backgroundColor: colors.grey,
            flex: 1,
            borderTopLeftRadius: 55,
            borderTopRightRadius: 55,
          }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{margin: 20}}>
            <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
              Wallet History
            </Text>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h4]}>Order DT56565</Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  Date 12 Jun
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {color: colors.red}]}>
                  $-21.50
                </Text>
                <Text style={[TYPOGRAPHY.medium, {color: colors.light}]}>
                  3 Items
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topupConatiner: {
    flex: 1,
    backgroundColor: colors.black,
  },
  addMoneyBox: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bgimg: {
    justifyContent: 'center',
    height: 200,
  },
  bgtxt: {
    color: 'white',
    fontSize: 35,
    margin: 15,
  },
  balancetxt: {
    color: '#D8D8D8',
    fontSize: 20,
    marginLeft: 15,
  },
  addMoney: {
    // padding: 15,
  },
  addtxt: {
    textAlign: 'center',
    fontSize: 17,
    color: colors.pink,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 660,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    color: colors.darkGrey,
    borderWidth: 1,
    borderColor: colors.light,
    flex: 1,
    fontSize: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  historytxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
