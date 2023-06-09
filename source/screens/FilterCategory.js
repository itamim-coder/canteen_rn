import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TYPOGRAPHY from '../theme/typography';
import {colors} from '../theme/colors';
import SCREEN from '../theme/Screen';
import Statusbar from '../components/Statusbar';
const width = Dimensions.get('screen').width / 2 - 30;

export default class FilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route?.params?.id,
      filterFoods: null,
      visible: false,
      message: '',
    };
    console.log(this.props.route.params.category_name);
  }

  componentDidMount() {
    this.setState({visible: true});
    fetch(`https://laqil.com/public/api/product-list?cat=${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        console.log('message', res.message);

        // this.setState({foods: res});
        if (res.status == true) {
          this.setState({filterFoods: res.data});
          // return this.state.foods;
          this.setState({visible: false});
        } else if (res.data == null) {
          console.log('message', res.message);
          this.setState({message: res.message});
        }
      });
  }
  renderItem = ({item}) => {
    const {description, picture, price} = item;
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FoodDetails', {id: item.id})
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
            <Text style={TYPOGRAPHY.h6}>{}</Text>
            <View
              style={{
                padding: 5,
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
    // console.log(this.state.id);
    const popularBox = {
      //   paddingVertical: 20,
      // backgroundColor: colors.red,
      // marginBottom:10,
      ...SCREEN.screen,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={this.props.route.params.category_name} />
        {this.state.filterFoods !== null ? (
          <View style={popularBox}>
            <Text
              style={[TYPOGRAPHY.h3, {fontWeight: 'bold', marginBottom: 20}]}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              contentContainerStyle={{
                // marginTop: 10,
                paddingBottom: 50,
              }}
              data={this.state.filterFoods}
              numColumns={2}
              renderItem={item => this.renderItem(item)}
            />
          </View>
        ) : (
          <View>
            <Text
              style={[
                TYPOGRAPHY.h4Bold,
                {textAlign: 'center', color: colors.red},
              ]}>
              Product List Empty
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
