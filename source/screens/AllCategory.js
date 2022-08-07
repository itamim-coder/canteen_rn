import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import SCREEN from '../theme/Screen';
import TYPOGRAPHY from '../theme/typography';
import {CATEGORY_LIST} from '../data/category-list';
import {colors} from '../theme/colors';

export default class AllCategory extends Component {
  renderCategory = ({item}) => {
    const {image, category} = item;
    const categoryCard = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      //   marginRight: 10,
      //   paddingHorizontal: 15,
      padding: 5,
      borderRadius: 10,
      marginTop: 10,
    };
    return (
      <TouchableOpacity style={categoryCard}>
        <Image
          resizeMode="contain"
          style={{width: 40, height: 40}}
          source={image}
        />
        <Text style={[{marginLeft: 25}, TYPOGRAPHY.h5]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar />
        <View style={SCREEN.screen}>
          <Text style={TYPOGRAPHY.h3}>Categories</Text>
          <FlatList
            //   horizontal
            showsVerticalScrollIndicator={false}
            data={CATEGORY_LIST}
            renderItem={item => this.renderCategory(item)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
