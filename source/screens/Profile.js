import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
import TYPOGRAPHY from '../theme/typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  handlelogout = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    console.log(user);
    AsyncStorage.removeItem('userInfo');

    this.props.navigation.navigate('Login');
  };

  getUser = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);
    const name = parse.data.name;

    this.setState({name: name});

    console.log('token', parse.data.name);
  };
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
            padding: 20,
          }}>
          <View>
            <Text style={[TYPOGRAPHY.primary, {fontSize: 28}]}>
              {this.state.name}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UpdateProfile')}>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 18,
                    color: colors.red,
                    paddingTop: 15,
                  },
                ]}>
                View Profile
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            resizeMode="contain"
            style={styles.profileImg}
            source={require('../../assets/images/profile.png')}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
          }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ManageChildren');
              }}
              style={{
                paddingVertical: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <MaterialCommunityIcons
                name="human-male-child"
                size={24}
                color="red"
              />

              <Text
                style={[
                  TYPOGRAPHY.medium,
                  {marginHorizontal: 20, fontSize: 18},
                ]}>
                Manage Children
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyOrder')}
              style={{
                paddingVertical: 20,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo name="archive" size={24} color="red" />
              <Text
                style={[
                  TYPOGRAPHY.medium,
                  {marginHorizontal: 20, fontSize: 18},
                ]}>
                My Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Transaction')}
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo name="credit-card" size={24} color="red" />
                <Text
                  style={[
                    TYPOGRAPHY.medium,
                    {marginHorizontal: 20, fontSize: 18},
                  ]}>
                  Transaction
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="clipboard-list"
                  size={24}
                  color="red"
                />
                <Text
                  style={[
                    TYPOGRAPHY.medium,
                    {marginHorizontal: 20, fontSize: 18},
                  ]}>
                  Terms & Conditions
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 3,
                  alignItems: 'center',
                }}>
                <FontAwesome name="lock" size={24} color="red" />
                <Text
                  style={[
                    TYPOGRAPHY.medium,
                    {marginHorizontal: 25, fontSize: 18},
                  ]}>
                  Privacy Policy
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlelogout()}
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text
                  style={[
                    TYPOGRAPHY.medium,
                    {marginHorizontal: 20, fontSize: 18},
                  ]}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  profileImg: {
    width: 80,
    height: 80,
  },
});
