import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import TYPOGRAPHY from '../theme/typography';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('screen').width;
export class HomeTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '0',
      selectedSchool: '',
      schoolList: [],
      // selectedId: '',
    };
    // console.log(this.state.selectedValue);
  }
  componentDidMount() {
    fetch('https://laqil.com/public/api/school-list')
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.setState({schoolList: res.data});
        }
      });
  }
  pickerActivity = async id => {
    if (id != 0) {
      AsyncStorage.setItem('selected_school', JSON.stringify(id));
      const school = await AsyncStorage.getItem('selected_school');
      const parse = JSON.parse(school);
      // this.setState({selectedValue: parse});
      this.setState({selectedSchool: parse});
      console.log('school', parse);

      this.props.navigation.navigate('SchoolFood', {id: id});
    }

    // selectedValue={this.state.selectedValue}
  };

  render() {
    const image = {
      height: 40,
      width: 40,
    };
    const topBar = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // paddingBottom: 10,
      // width: width,
    };
    return (
      <View style={topBar}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Image
            style={image}
            source={require('../../assets/images/profile.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: width / 2,
          }}>
          <Picker
            selectedValue={this.state.selectedSchool}
            style={{height: 30, width: 200}}
            onValueChange={(itemValue, itemIndex, id) => {
              this.pickerActivity(itemValue);
              this.setState({selectedValue: 0});
            }}>
            <Picker.Item label="Select a school" value="0" />
            {this.state.schoolList.map(item => (
              // <TouchableOpacity>
              // console.log(item.id),

              <Picker.Item label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Transaction')}>
          <Image
            style={image}
            source={require('../../assets/images/ic_wallet.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeTopBar;
