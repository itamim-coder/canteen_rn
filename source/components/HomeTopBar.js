import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import TYPOGRAPHY from '../theme/typography';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class HomeTopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
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
    // console.log(id);
    this.setState({selectedValue: id});
    // let gotid;

    // const getId = await AsyncStorage.getItem('schoolId');

    // if (getId) {
    //   gotid = JSON.parse(getId);
    //   console.log(gotid);
    // } else {
    //   gotid = {};
    // }
    // const jsonValue = JSON.stringify(gotid);
    // // const schoolId = await AsyncStorage.setItem('schoolId', id);

    // AsyncStorage.setItem('schoolId', jsonValue);
    // console.log(getId);
    // const sclstring = JSON.stringify(schoolId);
    // const getId = await AsyncStorage.getItem('schoolId');
    // // const get = JSON.stringify(getId);
    // if (getId != null) {
    //   this.setState({selectedValue: getId});
    // }
    //
    if (id != 0) {
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
      paddingBottom: 10,
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Text style={[TYPOGRAPHY.small]}>Select School</Text> */}
          <Picker
            selectedValue={this.state.selectedValue}
            style={{height: 30, width: 250}}
            // onValueChange={(modeValue, modeIndex) => this.setState({mode: modeValue})}>
            // {this.state.dataSource.map((item, key)=>(
            //         <Picker.Item label={item} value={item} key={key} />)
            //         )}
            onValueChange={(itemValue, itemIndex, id) => {
              this.pickerActivity(itemValue);
              // this.setState({selectedValue: itemValue});
            }}>
            <Picker.Item label="Please select an option..." value="0" />
            {this.state.schoolList.map(item => (
              // <TouchableOpacity>
              // console.log(item.id),
              <Picker.Item label={item.name} value={item.id} />
              // </TouchableOpacity>
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Topup')}>
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
