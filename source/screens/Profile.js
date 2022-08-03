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
// import Entypo from 'react-native-vector-icons/Entypo';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Profile extends Component {
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
            <Text style={[TYPOGRAPHY.primary, {fontSize: 28}]}>Samantah</Text>
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
              style={{
                paddingVertical: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <FontAwesome name="language" size={24} color="red" />
              <Text
                style={[
                  TYPOGRAPHY.medium,
                  {marginHorizontal: 20, fontSize: 20},
                ]}>
                Change Language
              </Text>
              
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('My Order')}
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
                  {marginHorizontal: 20, fontSize: 20},
                ]}>
                My Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="comment-question"
                  size={24}
                  color="red"
                />
                <Text style={[TYPOGRAPHY.medium, {marginHorizontal: 20,fontSize: 20}]}>FAQs</Text>
              </View>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
                    marginHorizontal: 45,
                    color: colors.darkGrey,
                  },
                ]}>
                Get your question answered
              </Text>
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
                <Text style={[TYPOGRAPHY.medium, {marginHorizontal: 20,fontSize: 20}]}>
                  Terms & Conditions
                </Text>
              </View>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
                    marginHorizontal: 45,
                    color: colors.darkGrey,
                  },
                ]}>
                Know terms of use
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row',marginLeft:3, alignItems: 'center'}}>
                <FontAwesome name="lock" size={24} color="red" />
                <Text style={[TYPOGRAPHY.medium, {marginHorizontal: 25,fontSize: 20}]}>
                  Privacy Policy
                </Text>
              </View>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
                    marginHorizontal: 45,
                    color: colors.darkGrey,
                  },
                ]}>
                Companies privacy policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="logout" size={24} color="red" />
                <Text style={[TYPOGRAPHY.medium, {marginHorizontal: 20,fontSize: 20}]}>Logout</Text>
              </View>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
                    color: colors.darkGrey,
                    marginHorizontal: 45,
                  },
                ]}>
                Sign out from account
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* </View> */}
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
