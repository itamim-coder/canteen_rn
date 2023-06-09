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
  ActivityIndicator,
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
import Statusbar from '../components/Statusbar';
const width = Dimensions.get('window').width - 40;
export default class ManageChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      indicator: false,
      navUnmount: null,
    };
  }

  findChildren = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);
    this.setState({indicator: true});

    setTimeout(() => {
      this.setState({indicator: false});
    }, 1500);

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
    const navUnmount = this.props.navigation.addListener('focus', () => {
      this.findChildren();
    });

    this.setState({
      navUnmount: navUnmount,
    });
  }
  componentWillUnmount() {
    this.state.navUnmount?.();
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
        <Statusbar name={'Manage Children'} />
        {this.state.indicator === true ? (
          <ActivityIndicator
            color={colors.red}
            size={'large'}
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
          />
        ) : (
          <>
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
          </>
        )}
      </SafeAreaView>
    );
  }
}
