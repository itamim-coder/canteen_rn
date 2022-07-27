import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
// import {Icon} from 'react-native-vector-icons/Icon';

const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   margin: 15,
          alignItems: 'center',
          marginTop: 30,
          padding: 20,
        }}>
        <View>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>Samantah</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.red,
                paddingTop: 15,
              }}>
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
          //   marginTop:50,
        }}>
        <ScrollView>
          <TouchableOpacity
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Change Language
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate('My Order')}
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>FAQs</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.darkGrey,
              }}>
              Get your question answered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Terms & Conditions
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.darkGrey,
              }}>
              Know terms of use
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Privacy Policy
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.darkGrey,
              }}>
              Companies privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 25,

              marginBottom: 5,
            }}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Logout</Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.darkGrey,
              }}>
              Sign out from account
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImg: {
    width: 80,
    height: 80,
  },
});
