import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <TouchableOpacity>
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
      <Text>Home</Text>
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
    margin: 15,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
});
