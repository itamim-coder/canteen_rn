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
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {spacing} from '../theme/spacing';
import {FOOD_LIST} from '../data/food-list';
import {colors} from '../theme/colors';
import {CATEGORY_LIST} from '../data/category-list';
import AntDesign from 'react-native-vector-icons/AntDesign';
import STYLES from '../theme/styles';
const Home = () => {
  const navigation = useNavigation();

  // render Category item

  const renderCategory = ({item}) => {
    const {image, category} = item;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          // marginHorizontal: 5,
          marginRight: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <Image
          resizeMode="contain"
          style={{width: 50, height: 50}}
          source={image}
        />
        <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{category}</Text>
      </TouchableOpacity>
    );
  };

  // render popular item

  const renderItem = ({item}) => {
    const {name, image, price} = item;
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetails', {food: item})}>
          <View
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={STYLES.h5}>{name}</Text>
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
            <Text
              style={[STYLES.primary, {fontWeight: 'bold', color: colors.ash}]}>
              ${price}.00
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={[STYLES.screen, {paddingBottom: 0}]}>
      {/* Home Top Section  */}

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.image}
            source={require('../../assets/images/profile.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Topup')}>
          <Image
            style={styles.image}
            source={require('../../assets/images/ic_wallet.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Box  */}

        <View style={styles.search}>
          <View style={styles.searchWrapper}>
            <AntDesign
              name="search1"
              size={18}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput placeholder="Search Food" style={styles.searchInput} />
          </View>
        </View>

        {/* Categories Section  */}

        <Text style={STYLES.h3}>Categories</Text>
        <FlatList
          horizontal
          data={CATEGORY_LIST}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
        />

        {/* Popular Section  */}

        <View style={styles.popularBox}>
          <Text style={STYLES.h3}>Popular Near You</Text>
          <FlatList
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginTop: 10,
            }}
            data={FOOD_LIST}
            numColumns={2}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  search: {
    marginVertical: 20,
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 0.3,
  },
  searchWrapper: {
    flexDirection: 'row',
  },
  searchIcon: {
    color: '#b0b0b0',
    marginRight: 10,
    marginTop: 14,
  },
  searchInput: {
    color: '#b4b4b4',
    fontFamily: 'Poopins-Regular',
  },
  popularBox: {
    paddingVertical: 20,
  },
});
