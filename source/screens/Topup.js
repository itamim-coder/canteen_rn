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
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import {BottomSheet} from 'react-native-btr';
import STYLES from '../theme/styles';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';

const Topup = () => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = React.useState('kyd');

  const navigation = useNavigation();
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };
  return (
    <SafeAreaView style={styles.topupConatiner}>
      <View style={styles.addMoneyBox}>
        <View
          style={{
            // backgroundColor: colors.red,
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
            <Text style={styles.bgtxt}>Wallet</Text>
            <Text style={styles.balancetxt}>Total Balance{'\n'}$1000</Text>
          </ImageBackground>
          <TouchableOpacity
            onPress={toggleBottomNavigationView}
            style={{
              padding: 20,
            }}>
            <Text style={styles.addtxt}>Add Money</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addMoney}>
          <BottomSheet
            visible={visible}
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
                  // justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    margin: 5,
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.pink,
                  }}>
                  Wallet Topup
                </Text>
                <ScrollView
                  style={{
                    marginLeft: 15,
                    marginRight: 15,

                    color: colors.pink,
                  }}>
                  <Text>
                    Wallet Balance will reflect in CI dollars. Enter topup
                    amount and choose currency. If you are paying in USD,
                    conversion rate is .80.
                    {'\n'}
                    Click continue, you'll be presented with our checkout form.
                  </Text>
                  <Text style={[styles.title, {marginTop: 10}]}>
                    Account No
                  </Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      // onChangeText={text => setEmail(text)}
                      // placeholder="Email"
                      editable={false}
                      defaultValue="0030"
                      placeholderTextColor={'grey'}
                      style={styles.input}
                    />
                  </View>
                  <Text style={styles.title}>Name of Acoount</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      // onChangeText={text => setEmail(text)}
                      editable={false}
                      defaultValue="Zahid"
                      placeholderTextColor={'grey'}
                      style={styles.input}
                    />
                  </View>
                  <Text style={styles.title}>Enter Amount In KYD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      // onChangeText={text => setEmail(text)}
                      placeholder="i e: 1234 56"
                      placeholderTextColor={'grey'}
                      style={styles.input}
                    />
                  </View>
                  <Text style={styles.title}>Enter Amount In USD</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      // onChangeText={text => setPassword(text)}

                      placeholder="i e: 1234 56"
                      placeholderTextColor={'grey'}
                      style={styles.input}
                    />
                  </View>
                  <Text style={styles.title}>Choose Currency</Text>
                  <RadioButton.Group
                    onValueChange={newValue => setChecked(newValue)}
                    value={checked}>
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
                    //   onPress={handleSignin}
                    onPress={() => navigation.navigate('AddtoWallet')}
                    style={STYLES.btnPrimary}>
                    <Text
                      style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                      Continue
                    </Text>
                  </TouchableOpacity>
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
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: 30}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Wallet History</Text>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View>
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
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
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
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
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
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
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
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
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
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
              <Text style={[styles.historytxt, {fontSize: 19}]}>
                Order DT56565
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                Date 12 Jun
              </Text>
            </View>
            <View>
              <Text
                style={[styles.historytxt, {fontSize: 19, color: colors.red}]}>
                $-21.50
              </Text>
              <Text style={[styles.historytxt, {color: colors.light}]}>
                3 Items
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Topup;

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
    // borderRadius: 200,
  },
  bgtxt: {
    color: 'white',
    fontSize: 35,
    margin: 15,
    // marginTop: -100,
    // lineHeight: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  balancetxt: {
    // color: colors.dar,
    color: '#D8D8D8',
    fontSize: 20,
    marginLeft: 15,
    // marginTop: -110,
    // lineHeight: 24,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
  addMoney: {
    // padding: 15,
  },
  addtxt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.pink,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 630,

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
