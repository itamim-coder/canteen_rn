/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
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
import React, {Component} from 'react';

import {colors} from '../theme/colors';

import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import {Fonts} from '../theme/Fonts';
import Search from '../components/Search';
import Popular from '../components/Popular';
import HomeTopBar from '../components/HomeTopBar';
import FloatCart from '../components/FloatCart';

export class Home extends Component {
  // render Category item
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      category: [],
    };
  }

  componentDidMount() {
    this.setState({visible: true});
    fetch('https://laqil.com/public/api/category-list')
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.setState({category: res.data});

          this.setState({visible: false});
        }
      });
  }

  renderCategory = ({item}) => {
    // console.log(item);
    const {photo, name} = item;
    const categoryCard = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      marginRight: 10,
      paddingRight: 15,
      padding: 5,
      // paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
    };
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('FilterCategory', {id: item.id})
          }
          style={categoryCard}>
          <Image
            resizeMode="cover"
            style={{width: 60, height: 60, borderRadius: 10}}
            source={{uri: `${item.photo}`}}
          />
          <Text style={{marginLeft: 15, fontWeight: 'bold'}}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const homeContainer = {
      ...SCREEN.screen,
      paddingBottom: 0,
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* Home Top Section  */}

        <View style={homeContainer}>
          {/* <HomeTopBar /> */}
          <HomeTopBar navigation={this.props.navigation} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search Box  */}

            <Search />

            {/* Categories Section  */}

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[TYPOGRAPHY.h4, {fontWeight: 'bold'}]}>
                Categories
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('AllCategory', {
                    category: this.state.category,
                  })
                }>
                <Text style={[TYPOGRAPHY.h5, {color: colors.red}]}>
                  See More
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.visible ? (
              <ActivityIndicator color={colors.red} />
            ) : (
              <FlatList
                horizontal
                data={this.state?.category.slice(0, 6)}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderCategory}
              />
            )}

            {/* Popular Section  */}
            <Popular />
          </ScrollView>
        </View>
        <FloatCart navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

export default Home;
