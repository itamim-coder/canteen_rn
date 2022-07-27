import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme/colors';
import {useNavigation} from '@react-navigation/native';
import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';

const MyCart = () => {
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const increament = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.black}}>
      <Statusbar name="My Cart" />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.grey,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          paddingHorizontal: 20,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20, flex: 1}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                marginVertical: 5,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/images/items/items1.png')}
              />
              <View style={{margin: 20}}>
                <Text>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: colors.red,
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 20}}>+</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 20}}>{count}</Text>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 20}}>-</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={{}}>${count * 10}</Text>
              </View>
              <View>
                {/* <TouchableOpacity
                  onPress={() => {
                  
                    showMessage({
                      message: 'Order Cancel',

                      type: 'danger',
                      icon: 'danger',
                    });
                  }}>
                  <Text style={{paddingBottom: 70, fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                marginVertical: 5,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/images/items/items1.png')}
              />
              <View style={{margin: 20}}>
                <Text>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: colors.red,
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 20}}>+</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 20}}>{count}</Text>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 20}}>-</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={{}}>${count * 10}</Text>
              </View>
              <View>
                {/* <TouchableOpacity
                  onPress={() => {
                  
                    showMessage({
                      message: 'Order Cancel',
                      type: 'danger',
                      icon: 'danger',
                    });
                  }}>
                  <Text style={{paddingBottom: 70, fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                marginVertical: 5,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Image
                style={{width: 100, height: 100}}
                source={require('../../assets/images/items/items1.png')}
              />
              <View style={{margin: 20}}>
                <Text>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: colors.red,
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 20}}>+</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 20}}>{count}</Text>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 20}}>-</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={{}}>${count * 10}</Text>
              </View>
              <View>
                {/* <TouchableOpacity
                  onPress={() => {
                   
                    showMessage({
                      message: 'Order Cancel',

                      type: 'danger',
                      icon: 'danger',
                    });
                  }}>
                  <Text style={{paddingBottom: 70, fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <View style={{marginTop: 40}}>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Item Total</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>$200</Text>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Delivery Charge
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>$200</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 0.2,
          margin: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: colors.white, fontSize: 25}}>${count * 10}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
          <Text
            style={{
              color: colors.white,
              backgroundColor: colors.red,
              padding: 20,
              fontWeight: 'bold',
              fontSize: 15,
              paddingHorizontal: 50,
            }}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </SafeAreaView>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  statusbar: {
    padding: 20,
    backgroundColor: colors.white,
  },
});
