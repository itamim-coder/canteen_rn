import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TYPOGRAPHY from '../theme/typography';
import {colors} from '../theme/colors';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
const width = Dimensions.get('window').width - 40;
export default class ManageChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
    };
  }

  findChildren = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);

    axios
      .get('https://laqil.com/public/api/student-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({children: res.data.data});
          console.log(res.data.data);
        },
        err => {
          console.log(err);
        },
      );
  };

  componentDidMount() {
    this.findChildren();
  }

  renderChildren = ({item}) => {
    console.log(item);
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('StudentDetails', {id: item.id})
          }>
          <View
            style={{
              backgroundColor: colors.white,
              //   width:,
              padding: 15,
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 20}}>
              {item.profile_picture === null ? (
                <>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 50,
                      // backgroundColor: colors.red,
                    }}
                    source={require('../../assets/images/profile.png')}
                  />
                </>
              ) : (
                <>
                  <Image
                    style={{height: 35, width: 35}}
                    // source={require('../../assets/images/profile.png')}
                    source={{uri: item.profile_picture}}
                  />
                </>
              )}
            </View>
            <View>
              <Text style={TYPOGRAPHY.h4}>{item.name}</Text>
              <Text style={[TYPOGRAPHY.medium, {color: colors.ash}]}>
                {item.school}
              </Text>
              <Text style={[TYPOGRAPHY.medium, {color: colors.ash}]}>
                {item.class}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  render() {
    const image = {
      height: 40,
      width: 40,
    };

    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              style={image}
              source={require('../../assets/images/profile.png')}
            />
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text
              style={[
                TYPOGRAPHY.h3,
                {
                  textAlign: 'center',
                },
              ]}
            />
          </View>
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <FlatList
              data={this.state.children}
              renderItem={item => this.renderChildren(item)}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[
              BUTTONS.btnPrimary,
              {width: width, marginBottom: 10, flexDirection: 'row'},
            ]}
            onPress={() =>
              this.props.navigation.navigate('AddStudent', {
                type: 'Add',
              })
            }>
            <AntDesign name="adduser" size={24} color="white" />
            <Text style={[BUTTONS.btnFont, {textAlign: 'center'}]}>
              Add Student{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
