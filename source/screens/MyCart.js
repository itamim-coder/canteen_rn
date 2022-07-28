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
import STYLES from '../theme/styles';

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
    <SafeAreaView
      style={[STYLES.screen, {padding: 0, backgroundColor: colors.black}]}>
      <Statusbar name="My Cart" />

      {/* full screen  */}

      <View
        style={[
          STYLES.screen,
          {
            backgroundColor: colors.grey,
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            paddingVertical: 0,
          },
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginTop: 20, flex: 1}}>
          {/* product card */}

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
                <Text style={STYLES.primary}>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 17}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 17}}>{count}</Text>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 17}}>+</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={STYLES.primary}>${count * 10}</Text>
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
                <Text style={STYLES.primary}>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 17}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 17}}>{count}</Text>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 17}}>+</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={STYLES.primary}>${count * 10}</Text>
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
                <Text style={STYLES.primary}>Chinese Noodles</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <TouchableOpacity onPress={decrement}>
                    <Text style={{fontSize: 17}}>-</Text>
                  </TouchableOpacity>
                  <Text style={{fontSize: 17}}>{count}</Text>
                  <TouchableOpacity onPress={increament}>
                    <Text style={{fontSize: 17}}>+</Text>
                  </TouchableOpacity>
                </View>
                <View />
              </View>

              <View>
                <Text style={STYLES.primary}>${count * 10}</Text>
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

          {/* Total calculation */}

          <View style={{marginTop: 40}}>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={STYLES.h5}>Item Total</Text>
              <Text style={STYLES.h5}>$200</Text>
            </View>
            <View
              style={{
                backgroundColor: colors.white,
                padding: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={STYLES.h5}>Delivery Charge</Text>
              <Text style={STYLES.h5}>$200</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* checkout calculation  */}

      <View
        style={{
          flex: 0.2,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={[STYLES.h3, {color: colors.white}]}>${count * 10}</Text>
        <TouchableOpacity
          style={[STYLES.btnPrimary, {paddingHorizontal: 30, marginBottom: 18}]}
          onPress={() => navigation.navigate('Checkout')}>
          <Text style={[STYLES.btnFont]}>Checkout</Text>
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
