import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../components/Statusbar';
import STYLES from '../theme/styles';
import {colors} from '../theme/colors';
import CheckBox from '@react-native-community/checkbox';
import {RadioButton} from 'react-native-paper';

const Checkout = ({navigation}) => {
  const [checked, setChecked] = React.useState('kyd');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Statusbar name="Checkout" />
      <View>
        <View style={{padding:20,justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Customer Details
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total $4.00</Text>
        </View>
        <View style={{margin: 3, padding: 20}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 3}}>
                <Text style={styles.title}>Full Name</Text>
                <View style={STYLES.inputContainer}>
                  <TextInput
                    onChangeText={text => setName(text)}
                    placeholder="Enter Full Name"
                    defaultValue="Zahid"
                    placeholderTextColor={'grey'}
                    style={STYLES.input}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.title}>Phone Number</Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                // onChangeText={text => setName(text)}
                placeholder="Enter Phone Number"
                defaultValue="+0085324324"
                placeholderTextColor={'grey'}
                style={STYLES.input}
                keyboardType="numeric"
              />
            </View>
            <Text style={styles.title}>Email Address</Text>
            <View style={STYLES.inputContainer}>
              <TextInput
                // onChangeText={text => setPhone(text)}
                placeholder="Enter Email Address"
                defaultValue="zahid@powah.com"
                // editable={false}
                placeholderTextColor={'grey'}
                style={[STYLES.input]}
              />
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text>Wallet Balance $0.00</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={[STYLES.btnPrimary,{backgroundColor:colors.darkOrange}]}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Continue To Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
