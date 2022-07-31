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

                marginBottom: 5,
              }}>
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                Change Language
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('My Order')}
              style={{
                paddingVertical: 20,
                marginBottom: 5,
              }}>
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 20,

                marginBottom: 5,
              }}>
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>FAQs</Text>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
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
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                Terms & Conditions
              </Text>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
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
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                Privacy Policy
              </Text>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
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
              {/* <Icon name="rocket" size={30} color="#900" /> */}
              <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>Logout</Text>
              <Text
                style={[
                  TYPOGRAPHY.primary,
                  {
                    fontSize: 15,
                    color: colors.darkGrey,
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
