import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {colors} from '../theme/colors';
import {FOOD_LIST} from '../data/food-list';
import {useNavigation} from '@react-navigation/native';
import Statusbar from '../components/Statusbar';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import BUTTONS from '../theme/Buttons';

export  class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDetails: {},
    };
  }

  // componentDidMount() {
  //   const {id} =
  // }
  renderItem = ({item}) => {
    const sliderCard = {
      backgroundColor: colors.white,
      marginRight: 10,
      // marginTop: 40,
      borderRadius: 10,
    };
    const foodName = {
      ...TYPOGRAPHY.h5,
      padding: 10,
    };
    const priceText = {
      ...TYPOGRAPHY.h5,
      padding: 10,
    };
    const {name, image, price} = item;
    return (
      <View>
        <TouchableOpacity
          style={sliderCard}
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {food: item})
          }>
          <Text style={foodName}>{name}</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Image
              resizeMode="cover"
              style={{width: 100, height: 80}}
              source={image}
            />
          </View>
          <Text style={priceText}>Price: ${price}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const detailsContainer = {flex: 1, backgroundColor: colors.white};
    const detailsScreen = {
      ...SCREEN.screen,
      paddingTop: 0,
      paddingBottom: 0,
      flex: 1.8,
    };
    const cartButton = {
      ...BUTTONS.btnFont,
      fontSize: 13,
      color: colors.white,
    };
    const food = this.props.route.params.food;

    const {name, price, image, details} = food;
    return (
      <SafeAreaView style={detailsContainer}>
        <Statusbar name={name} />

        {/* details screen  */}

        <View style={detailsScreen}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Image
              resizeMode="contain"
              source={image}
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <Text style={TYPOGRAPHY.h2}>{name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text style={TYPOGRAPHY.h3}>${price}</Text>
              <TouchableOpacity
                onPress={() => {
                  /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
                  showMessage({
                    message: 'Added Successfully',
                    description: 'Click here to check cart',
                    type: 'success',
                    icon: 'success',

                    onPress: () => {
                      this.props.navigation.navigate('My Cart');
                      /* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
                    },
                  });
                }}
                style={{
                  backgroundColor: '#f5474a',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={cartButton}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
            <Text style={TYPOGRAPHY.primary}>{details}</Text>
            <Text style={TYPOGRAPHY.primary}>{details}</Text>
            <Text style={TYPOGRAPHY.primary}>{details}</Text>
          </ScrollView>
        </View>

        <ScrollView
          style={[
            SCREEN.screen,
            {
              backgroundColor: colors.grey,
              // flex: 0.1,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingBottom: 0,
            },
          ]}>
          <Text
            style={[
              TYPOGRAPHY.primary,
              {
                fontSize: 20,
                marginBottom: 10,
              },
            ]}>
            Similar Products
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FOOD_LIST}
            renderItem={item => this.renderItem(item)}
          />
        </ScrollView>
        <FlashMessage position="top" />
      </SafeAreaView>
    );
  }
}

export default FoodDetails
