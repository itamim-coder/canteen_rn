/* eslint-disable react-native/no-inline-styles */
import {
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
import {FOOD_LIST} from '../data/food-list';
import {colors} from '../theme/colors';
import {CATEGORY_LIST} from '../data/category-list';

import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import {Fonts} from '../theme/Fonts';
import Seacrh from '../components/Seacrh';

export class Home extends Component {
  // render Category item

  renderCategory = ({item}) => {
    const {image, category} = item;
    const categoryCard = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      marginRight: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
    };
    return (
      <TouchableOpacity style={categoryCard}>
        <Image
          resizeMode="contain"
          style={{width: 50, height: 50}}
          source={image}
        />
        <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{category}</Text>
      </TouchableOpacity>
    );
  };

  renderItem = ({item}) => {
    const {name, image, price} = item;
    const popularCard = {
      backgroundColor: colors.white,
      padding: 10,
      borderRadius: 10,
    };
    const priceText = {
      ...TYPOGRAPHY.h5,
      fontWeight: 'bold',
      color: colors.ash,
    };
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {food: item})
          }>
          <View style={popularCard}>
            <Text style={TYPOGRAPHY.h5}>{name}</Text>
            <View
              style={{
                padding: 16,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 125, height: 125}}
                source={image}
              />
            </View>
            <Text style={priceText}>${price}.00</Text>
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
    const topBar = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
    };
    const popularBox = {
      paddingVertical: 20,
    };
    const homeContainer = {
      ...SCREEN.screen,
      paddingBottom: 0,
    };
    return (
      <SafeAreaView style={homeContainer}>
        {/* Home Top Section  */}

        {/* <HomeTopBar /> */}
        <View style={topBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              style={image}
              source={require('../../assets/images/profile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Topup')}>
            <Image
              style={image}
              source={require('../../assets/images/ic_wallet.png')}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Box  */}

          <Seacrh />

          {/* Categories Section  */}

          <Text style={TYPOGRAPHY.h3}>Categories</Text>
          <FlatList
            horizontal
            data={CATEGORY_LIST}
            showsHorizontalScrollIndicator={false}
            renderItem={item => this.renderCategory(item)}
          />

          {/* Popular Section  */}

          <View style={popularBox}>
            <Text style={TYPOGRAPHY.h3}>Popular Near You</Text>
            <FlatList
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginTop: 10,
              }}
              data={FOOD_LIST}
              numColumns={2}
              renderItem={item => this.renderItem(item)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;
