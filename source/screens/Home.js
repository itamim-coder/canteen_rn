/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {spacing} from '../theme/spacing';
import {FOOD_LIST} from '../data/food-list';
import {colors} from '../theme/colors';

const Home = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    const {name, image, price} = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoodDetails', {food: item})}>
          <View
            style={{
              backgroundColor: colors.white,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{name}</Text>
            <Image
              resizeMode="contain"
              style={{width: 125, height: 125}}
              source={image}
            />
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              Price: ${price}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{padding: 20}}>
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

      <View style={styles.popularBox}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Popular Near You</Text>
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
    // margin: 15,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  popularBox: {
    marginTop: 25,
  },
});
