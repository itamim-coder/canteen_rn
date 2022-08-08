import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import TYPOGRAPHY from '../theme/typography';
import {FOOD_LIST} from '../data/food-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../theme/colors';
import Button from './Button';
import {BottomSheet} from 'react-native-btr';
const width = Dimensions.get('screen').width / 2 - 30;
export class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      foods: [],
    };
  }
  componentDidMount() {
    // this.setState({visible: true});
    fetch('../data/food-list.js')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // if (res.status == true) {
        //   // this.setState({category: res.data});
        //   // console.log(this.state.category);
        //   // this.setState({visible: false});
        // }
      });
  }

  renderItem = ({item}) => {
    const {name, image, price} = item;
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {food: item})
          }>
          <View
            style={{
              backgroundColor: colors.white,
              height: 235,
              // backgroundColor: colors.light,
              width,
              marginHorizontal: 2,
              borderRadius: 10,
              marginBottom: 20,
              padding: 15,
              // marginHorizontal: 35,
              // padding: 20,
              // width: '100%',

              // borderRadius: 10,
              // margin: 5,
              // marginBottom: 15,
            }}>
            <Text style={TYPOGRAPHY.h6}>{name}</Text>
            <View
              style={{
                padding: 5,
                // backgroundColor: colors.red
              }}>
              <Image
                resizeMode="contain"
                style={{width: 120, height: 125, alignItems: 'center'}}
                source={image}
              />
            </View>
            <Text style={[TYPOGRAPHY.h6, {color: colors.green}]}>
              Customize
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[TYPOGRAPHY.h3, {fontWeight: 'bold'}]}>
                ${price}.00
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.red,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View />
      </SafeAreaView>
    );
  };
  render() {
    const popularBox = {
      paddingVertical: 20,
      // backgroundColor: colors.red,
      // marginBottom:10,
    };
    return (
      <SafeAreaView style={popularBox}>
        <Text style={[TYPOGRAPHY.h3, {fontWeight: 'bold', marginBottom: 20}]}>
          Popular Near You
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          contentContainerStyle={{
            // marginTop: 10,
            paddingBottom: 50,
          }}
          data={FOOD_LIST}
          numColumns={2}
          renderItem={item => this.renderItem(item)}
        />
      </SafeAreaView>
    );
  }
}

export default Popular;
