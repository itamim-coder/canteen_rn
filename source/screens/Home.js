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
import Popular from '../components/Popular';
import HomeTopBar from '../components/HomeTopBar';

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
          style={{width: 40, height: 40}}
          source={image}
        />
        <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{category}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const homeContainer = {
      ...SCREEN.screen,
      paddingBottom: 0,
    };
    return (
      <SafeAreaView style={homeContainer}>
        {/* Home Top Section  */}

        {/* <HomeTopBar /> */}
        <HomeTopBar navigation={this.props.navigation} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Box  */}

          <Seacrh />

          {/* Categories Section  */}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[TYPOGRAPHY.h4, {fontWeight: 'bold'}]}>
              Categories
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AllCategory')}>
              <Text style={[TYPOGRAPHY.h5, {color: colors.red}]}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={CATEGORY_LIST.slice(0, 6)}
            showsHorizontalScrollIndicator={false}
            renderItem={item => this.renderCategory(item)}
          />

          {/* Popular Section  */}
          <Popular navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Home;
