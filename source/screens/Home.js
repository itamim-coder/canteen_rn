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

const Home = () => {
  const navigation = useNavigation();

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
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{name}</Text>
            <View
              style={{
                padding: 10,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 125, height: 125}}
                source={image}
              />
            </View>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              Price: ${price}
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderCategory = ({item}) => {
    const {image, category} = item;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.white,
          marginHorizontal: 5,
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

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
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
        <View style={styles.search}>
          <View style={styles.searchWrapper}>
            <TextInput placeholder="Search Food" style={styles.searchInput} />
          </View>
        </View>

        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Categories</Text>
        <FlatList
          horizontal
          data={CATEGORY_LIST}
          // numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
        />

        <View style={styles.popularBox}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Popular Near You
          </Text>
          <FlatList
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-evenly',
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
    paddingVertical: 10,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  popularBox: {
    paddingVertical: 20,
    // backgroundColor: colors.red,
  },
  search: {
    marginVertical: 20,
    // fontFamily: 'Monserrat-regular',
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
    marginTop: 5,
  },
  searchInput: {
    color: '#b4b4b4',
    // paddingRight: '80%',
  },
});
