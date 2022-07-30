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
import React, {useState} from 'react';
import {colors} from '../theme/colors';
// import STYLES from '../theme/styles';
import {Picker} from '@react-native-picker/picker';

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedValue, setSelectedValue] = useState('no');
  return (
    <SafeAreaView style={STYLES.screen}>
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
            <Text style={[STYLES.primary, {fontSize: 28}]}>Profile</Text>
          </View>
          <Image
            style={{width: 80, height: 80}}
            source={require('../../assets/images/profile.png')}
          />
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Full Name</Text>
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
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Account</Text>
              <View style={STYLES.inputContainer}>
                <TextInput
                  onChangeText={text => setName(text)}
                  defaultValue="3820"
                  placeholderTextColor={'grey'}
                  editable={false}
                  style={[
                    STYLES.input,
                    {color: colors.grey, backgroundColor: colors.light},
                  ]}
                />
              </View>
            </View>
          </View>
          <Text style={[STYLES.medium, styles.inputTitle]}>Phone Number</Text>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder="Enter Phone Number"
              defaultValue="+0085324324"
              placeholderTextColor={'grey'}
              style={STYLES.input}
              keyboardType="numeric"
            />
          </View>
          <Text style={[STYLES.medium, styles.inputTitle]}>Email Address</Text>
          <View style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setPhone(text)}
              placeholder="Enter Email Address"
              defaultValue="zahid@powah.com"
              editable={false}
              placeholderTextColor={'grey'}
              style={[
                STYLES.input,
                {color: colors.grey, backgroundColor: colors.light},
              ]}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Notify Low Balance</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="NO" value="no" />
                <Picker.Item label="YES" value="yes" />
              </Picker>
            </View>
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Low Balance Point</Text>
              <View style={STYLES.inputContainer}>
                <TextInput
                  onChangeText={text => setName(text)}
                  // defaultValue="3820"
                  placeholderTextColor={'grey'}
                  // editable={false}
                  style={[STYLES.input, {color: colors.black}]}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Notify Promotions</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="NO" value="no" />
                <Picker.Item label="YES" value="yes" />
              </Picker>
            </View>
            <View style={{flex: 1, margin: 3}}>
            <Text style={[STYLES.medium, styles.inputTitle]}>Notify Orders</Text>
              <Picker
                selectedValue={selectedValue}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="NO" value="java" />
                <Picker.Item label="YES" value="js" />
              </Picker>
            </View>
          </View>

          <Text style={[STYLES.medium, styles.inputTitle]}>Order Notes</Text>

          <KeyboardAvoidingView style={STYLES.inputContainer}>
            <TextInput
              onChangeText={text => setPhone(text)}
              //   placeholder="Enter Email Address"
              // defaultValue="zahid@powah.com"
              multiline={true}
              numberOfLines={3}
              // editable={false}
              placeholderTextColor={'grey'}
              style={[STYLES.input, {color: colors.black}]}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity style={STYLES.btnPrimary}>
            <Text style={STYLES.btnFont}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  inputTitle: {
    marginTop: 15,
  },
});
