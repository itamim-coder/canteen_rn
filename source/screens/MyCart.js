import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../theme/colors';

import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';
import Button from '../components/Button';

export class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const cartContainer = {
      ...SCREEN.screen,
      padding: 0,
      backgroundColor: colors.black,
    };

    const cartDetails = {
      ...SCREEN.screen,

      backgroundColor: colors.grey,
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      paddingVertical: 0,
    };

    const productCard = {
      flexDirection: 'row',
      backgroundColor: colors.white,
      marginVertical: 5,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'space-around',
    };

    const calculationCard = {
      backgroundColor: colors.white,
      padding: 30,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    };

    const checkOutButton = {
      ...BUTTONS.btnPrimary,
      paddingHorizontal: 30,
      marginBottom: 18,
    };
    return (
      <SafeAreaView style={cartContainer}>
        <Statusbar name="My Cart" />

        {/* full screen  */}

        <View style={cartDetails}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20, flex: 1}}>
            {/* product card */}

            <View>
              <View style={productCard}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/images/items/items1.png')}
                />
                <View style={{margin: 20}}>
                  <Text style={TYPOGRAPHY.primary}>Chinese Noodles</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 5,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({count: this.state.count - 1})
                      }>
                      <Text style={{fontSize: 17}}>-</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 17}}>{this.state.count}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({count: this.state.count + 1})
                      }>
                      <Text style={{fontSize: 17}}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <View />
                </View>

                <View>
                  <Text style={TYPOGRAPHY.primary}>
                    ${this.state.count * 10}
                  </Text>
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
              <View style={calculationCard}>
                <Text style={TYPOGRAPHY.h5}>Item Total</Text>
                <Text style={TYPOGRAPHY.h5}>$200</Text>
              </View>
              <View style={calculationCard}>
                <Text style={TYPOGRAPHY.h5}>Delivery Charge</Text>
                <Text style={TYPOGRAPHY.h5}>$200</Text>
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
          <Text style={[TYPOGRAPHY.h3, {color: colors.white}]}>
            ${this.state.count * 10}
          </Text>

          {/* <TouchableOpacity
            style={checkOutButton}
            onPress={() => this.props.navigation.navigate('Checkout')}>
            <Text style={[BUTTONS.btnFont]}>Checkout</Text>
          </TouchableOpacity> */}
          <Button
            // name="checkout button"
            navigation={this.props.navigation}
            type="checkout"
          />
        </View>
        <FlashMessage position="top" />
      </SafeAreaView>
    );
  }
}

export default MyCart;
