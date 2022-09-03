/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import {colors} from '../theme/colors';

import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import {Fonts} from '../theme/Fonts';
import Search from '../components/Search';
import Popular from '../components/Popular';
import HomeTopBar from '../components/HomeTopBar';
import FloatCart from '../components/FloatCart';
import LatestFood from '../components/LatestFood';
import SchoolFood from './SchoolFood';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width / 2 - 20;
const width2 = Dimensions.get('screen').width;
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
export class Home extends Component {
  // render Category item
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      latest_visible: false,
      category: [],
      selectedValue: '0',
      selectedSchool: '' || 0,
      schoolList: [],
      foods: [],
      navUnmount: null,
      id: '',
      isModalVisible: false,
    };
    console.log('foods', this.state.foods);
  }
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  category = () => {
    this.setState({visible: true});
    fetch('https://laqil.com/public/api/category-list')
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.setState({category: res.data});

          this.setState({visible: false});
        }
      });
  };

  schoolList = () => {
    fetch('https://laqil.com/public/api/school-list')
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.setState({schoolList: res.data});
        }
      });
  };

  async componentDidMount() {
    this.category();
    this.schoolList();

    const school = await AsyncStorage.getItem('selected_school');
    const parse = JSON.parse(school);
    console.log('mount', parse);
    // this.setState({selectedValue: parse});
    this.setState({selectedSchool: parse});
    this.pickerActivity(parse);
  }

  pickerActivity = async id => {
    this.setState({latest_visible: true});
    this.setState({id: id});
    console.log(`https://laqil.com/public/api/product-list?school=${id}`);
    if (id != 0) {
      await AsyncStorage.setItem('selected_school', JSON.stringify(id));
      const school = await AsyncStorage.getItem('selected_school');
      const parse = JSON.parse(school);
      // this.setState({selectedValue: parse});
      this.setState({selectedSchool: parse});
      console.log('school', parse);
      // this.setState({visible: true});
      fetch(
        `https://laqil.com/public/api/product-list?school=${this.state.selectedSchool}`,
      )
        .then(res => res.json())
        .then(res => {
          console.log('school', res.data.status);

          // this.setState({foods: res});
          if (res.status == true) {
            this.setState({foods: res.data});
            // return this.state.foods;
            this.setState({latest_visible: false});
          } else if (res.data == null) {
            // alert(res.message);
            this.setState({message: res.message});
          }
        });
    }

    // selectedValue={this.state.selectedValue}
  };

  renderCategory = ({item}) => {
    // console.log(item);
    const {photo, name} = item;
    const categoryCard = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,

      padding: 5,
      width: width,

      borderRadius: 10,
      marginTop: 10,
    };
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FilterCategory', {
              id: item.id,
              category_name: item.name,
            })
          }
          style={categoryCard}>
          <Image
            resizeMode="contain"
            style={{width: 60, height: 60, borderRadius: 10}}
            source={{uri: `${item.photo}`}}
          />
          <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderItem = ({item}) => {
    // console.log('remder', item);
    const {description, picture, price} = item;
    // console.log(this.props.add_item, '===', item.id);
    const cartItems = this.props.add_item;
    // this.props.add_item.map(item => console.log('map', item.id));
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {
              id: item.id,
              picture: item.picture,
              name: item.description,
              price: item.price,
              quantity: 0,
            })
          }>
          <View
            style={{
              backgroundColor: colors.white,

              // backgroundColor: colors.light,
              width: width - 5,
              marginHorizontal: 2,
              borderRadius: 10,
              marginBottom: 20,
              padding: 15,
              // marginHorizontal: 35,
              // padding: 20,
              // width: '100%',

              // borderRadius: 10,
              // margin: 5,
              // marginBottom: 15,
            }}>
            <Text style={[TYPOGRAPHY.medium, {fontSize: 12}]}>
              {description}
            </Text>
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                // backgroundColor: colors.red
              }}>
              <Image
                resizeMode="contain"
                style={{width: 120, height: 125, alignItems: 'center'}}
                source={{uri: `${item.picture}`}}
              />
            </View>
            <Text style={[TYPOGRAPHY.h6, {color: colors.green}]}>
              Customize
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[TYPOGRAPHY.h4Bold, {fontWeight: 'bold'}]}>
                ${price}.00
              </Text>
              {/* {cartItems.map(cartItem => {
                console.log('cartitem', cartItem.id);
                console.log('item', item.id);
                cartItem.id === item.id ? (
                  <TouchableOpacity
                    // onPress={() => this.add(item)}
                    style={{
                      backgroundColor: colors.red,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      1
                    </Text>
                  </TouchableOpacity>
                ) : ( */}
              <TouchableOpacity
                onPress={() => this.add(item)}
                style={{
                  backgroundColor: colors.red,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
              {/* );
              })} */}
            </View>
          </View>
        </TouchableOpacity>
        <View />
      </SafeAreaView>
    );
  };

  render() {
    const homeContainer = {
      ...SCREEN.screen,
      paddingBottom: 0,
    };
    const image = {
      height: 40,
      width: 40,
    };
    const topBar = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // paddingBottom: 10,
      // width: width,
    };
    const popularBox = {
      paddingVertical: 20,
      // backgroundColor: colors.red,
      // marginBottom:10,
    };
    console.log('sss', this.state.selectedSchool);
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* Home Top Section  */}

        <View style={homeContainer}>
          {/* <HomeTopBar /> */}
          {/* <HomeTopBar navigation={this.props.navigation} /> */}
          <View style={topBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Image
                style={image}
                source={require('../../assets/images/profile.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width2 / 2,
              }}>
              <Picker
                selectedValue={this.state.selectedSchool}
                style={{height: 30, width: 200}}
                onValueChange={(itemValue, itemIndex, id) => {
                  this.pickerActivity(itemValue);
                  this.setState({selectedSchool: 0});
                }}>
                <Picker.Item label="Select a school" value="0" />
                {this.state.schoolList.map(item => (
                  // <TouchableOpacity>
                  // console.log(item.id),

                  <Picker.Item label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
            {/* <View>
              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}>
                <Text>Select A School</Text>
              </TouchableOpacity>
            </View>
            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={{flex: 0.2, backgroundColor: colors.white, padding: 20}}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select A School
                  </Text>
                </View>

                <View>
                  {this.state.schoolList.map(item => (
                    // <TouchableOpacity>
                    // console.log(item.id),

                    <RadioButton.Group
                      value={this.state.checked}
                      onValueChange={newValue => {
                        this.setState({checked: newValue});
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value={item.id} />
                        <Text
                          style={[
                            TYPOGRAPHY.primary,
                            {fontSize: 18, paddingRight: 15},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    </RadioButton.Group>
                  ))}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  // paddingHorizontal: 20,
                  // paddingVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleModal();
                  }}>
                  <View
                    style={{
                      flex: 1,
                      // paddingRight: width - 30,
                      borderRightWidth: 1,
                      borderRightColor: colors.white,
                    }}>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {color: colors.white, textAlign: 'center'},
                      ]}>
                      Close
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                //  style={{paddingRight: width}}
                >
                  <Text
                    style={[
                      TYPOGRAPHY.h4,
                      {color: colors.white, textAlign: 'center'},
                    ]}>
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Transaction')}>
              <Image
                style={image}
                source={require('../../assets/images/ic_wallet.png')}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search Box  */}

            <Search />

            {/* Categories Section  */}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[TYPOGRAPHY.h4, {fontWeight: 'bold'}]}>
                Categories
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AllCategory', {
                    category: this.state.category,
                  })
                }>
                <Text style={[TYPOGRAPHY.h5, {color: colors.red}]}>
                  See More
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.visible ? (
              <ActivityIndicator color={colors.red} />
            ) : (
              <FlatList
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                data={this.state?.category.slice(0, 6)}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderCategory}
              />
            )}

            {/* Popular Section  */}
            <View style={popularBox}>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text
                  style={[
                    TYPOGRAPHY.h3,
                    {fontWeight: 'bold', marginBottom: 20},
                  ]}>
                  Latest Foods
                </Text>
                {this.state.selectedSchool !== 0 && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('AllLatestFoods', {
                          latest_foods: this.state.foods,
                        })
                      }>
                      <Text style={[TYPOGRAPHY.h5, {color: colors.red}]}>
                        See More
                      </Text>
                    </TouchableOpacity>
                  ) &&
                  this.state.selectedSchool !== null && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('AllLatestFoods', {
                          latest_foods: this.state.foods,
                        })
                      }>
                      <Text style={[TYPOGRAPHY.h5, {color: colors.red}]}>
                        See More
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>

              {(this.state.selectedSchool === 0 && (
                <View>
                  <Text
                    style={[
                      TYPOGRAPHY.h4Bold,
                      {textAlign: 'center', color: colors.red},
                    ]}>
                    Please Select A School
                  </Text>
                </View>
              )) ||
                (this.state.selectedSchool === null && (
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4Bold,
                        {textAlign: 'center', color: colors.red},
                      ]}>
                      Please Select A School
                    </Text>
                  </View>
                )) || (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                    }}
                    contentContainerStyle={{
                      // marginTop: 10,
                      paddingBottom: 50,
                    }}
                    data={this.state.foods}
                    numColumns={2}
                    renderItem={item => this.renderItem(item)}
                  />
                )}
            </View>
          </ScrollView>
        </View>
        <FloatCart navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

export default Home;
