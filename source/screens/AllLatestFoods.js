import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import SCREEN from '../theme/Screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';
import {colors} from '../theme/colors';
import FloatCart from '../components/FloatCart';
const width = Dimensions.get('screen').width / 2 - 25;

export default class AllLatestFoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   schoolFoods: [],
      //   visible: false,
      //   message: '',
    };
  }

  //   componentDidMount() {
  //     this.setState({visible: true});
  //     fetch('https://laqil.com/public/api/product-list?school=1')
  //       .then(res => res.json())
  //       .then(res => {
  //         console.log(res);

  //         // this.setState({foods: res});
  //         if (res.status == true) {
  //           this.setState({schoolFoods: res.data});
  //           // return this.state.foods;
  //           //   this.setState({visible: false});
  //         } else if (res.data == null) {
  //           alert(res.message);
  //           this.setState({message: res.message});
  //         }
  //       });
  //   }

  renderItem = ({item}) => {
    const {description, picture, price} = item;
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {
              id: item.id,
              picture: item.picture,
              name: item.description,
              price: item.price,
              quantity: 0,
            })
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
            }}>
            <Text style={[TYPOGRAPHY.medium, {fontSize: 12}]}>
              {description}
            </Text>
            <View
              style={{
                padding: 5,
                alignItems: 'center',
                // backgroundColor: colors.red
              }}>
              <Image
                resizeMode="contain"
                style={{width: 120, height: 125, alignItems: 'center'}}
                source={{uri: `${item.picture}`}}
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
              <Text style={[TYPOGRAPHY.h4Bold]}>${price}.00</Text>
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
    console.log(this.state.id);
    const popularBox = {
      //   paddingVertical: 20,
      // backgroundColor: colors.red,
      // marginBottom:10,
      ...SCREEN.screen,
    };
    const latest_foods = this.props.route.params.latest_foods;
    // console.log(latest_food);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={'Latest Foods'} />
        <View style={popularBox}>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            contentContainerStyle={{
              // marginTop: 10,
              paddingBottom: 50,
            }}
            data={latest_foods}
            numColumns={2}
            renderItem={item => this.renderItem(item)}
          />
        </View>
        <FloatCart navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}
