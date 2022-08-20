import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'react-native-axios/lib/core/Axios';
import TYPOGRAPHY from '../theme/typography';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../theme/colors';
import {Fonts} from '../theme/Fonts';
const width = Dimensions.get('screen').width;
export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      gender: 'male',
      email: '',
      password: '',
      password_confirmation: '',
      parent_id: '',
      school_id: '',
      code: '',
      selectedClass: '1',
      teacher: '',
      daily_spending_limit: '',
      homeroom: '',
      dad_cell: '',
      dad_email: '',
      dad_work_email: '',
      dad_work_phone: '',
      mom_cell: '',
      mom_work_phone: '',
      mom_email: '',
      mom_work_email: '',
      notes: '',
      health_conditions: 'good',
      active: 'active',
      addData: [],

      selectedValue: 'male',
      selectedSchool: '',
      schoolList: [],
      id: this.props.route.params.id,
      type: this.props.route.params.type,
    };
    console.log(this.props.route.params);
  }

  addChild = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log(token);
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      parent_id: this.state.parent_id,
      school_id: this.state.selectedSchool,
      code: this.state.code,
      class: this.state.selectedClass,
      teacher: this.state.teacher,
      daily_spending_limit: this.state.daily_spending_limit,
      homeroom: this.state.homeroom,
      dad_cell: this.state.dad_cell,
      dad_email: this.state.dad_email,
      dad_work_email: this.state.dad_work_email,
      dad_work_phone: this.state.dad_work_phone,
      mom_cell: this.state.mom_cell,
      mom_work_phone: this.state.mom_work_phone,
      mom_email: this.state.mom_email,
      mom_work_email: this.state.mom_work_email,
      notes: this.state.notes,
      health_conditions: this.state.health_conditions,
      active: this.state.active,
    };

    console.log(data);
    axios
      .post('https://laqil.com/public/api/student-store', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log(res.data);
          if (res.data.status == true) {
            alert(res.data.message);
          }
        },
        err => {
          alert(err.response.data.message);
        },
      );
  };
  updateStudent = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log(token);
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      parent_id: this.state.parent_id,
      school_id: this.state.selectedSchool,
      code: this.state.code,
      class: this.state.selectedClass,
      teacher: this.state.teacher,
      daily_spending_limit: this.state.daily_spending_limit,
      homeroom: this.state.homeroom,
      dad_cell: this.state.dad_cell,
      dad_email: this.state.dad_email,
      dad_work_email: this.state.dad_work_email,
      dad_work_phone: this.state.dad_work_phone,
      mom_cell: this.state.mom_cell,
      mom_work_phone: this.state.mom_work_phone,
      mom_email: this.state.mom_email,
      mom_work_email: this.state.mom_work_email,
      notes: this.state.notes,
      health_conditions: this.state.health_conditions,
      active: this.state.active,
    };

    console.log(data);
    axios
      .post(
        `https://laqil.com/public/api/student-update/${this.state.id}`,
        data,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(
        res => {
          console.log(res.data);
          if (res.data.status == true) {
            alert(res.data.message);
            this.props.navigation.navigate('Profile');
          }
        },
        err => {
          alert(err.response.data.message);
        },
      );
  };
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
    this.setState({selectedSchool: id});
  };

  //   componentDidMount() {
  //     this.addChild();
  //   }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <Statusbar />
        <ScrollView>
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={[TYPOGRAPHY.h3]}>{this.state.type} Student</Text>
              </View>
              <View>
                <Image
                  resizeMode="contain"
                  style={{width: 80, height: 80}}
                  source={require('../../assets/images/profile.png')}
                />
              </View>
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Full Name</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.name}
                // style={[TYPOGRAPHY.h5]}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({name: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Full Name"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Phone Number</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({phone: value, emailerror: ''});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Phone"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
                keyboardType={'numeric'}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={[TYPOGRAPHY.h5]}>Gender</Text>
              <Picker
                selectedValue={this.state.gender}
                style={{height: 50, width: width - 20}}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({gender: itemValue});
                }}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Password</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.password}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({password: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Password"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Password Confirmation</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.password_confirmation}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({password_confirmation: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Password Confirmation"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>

            {/* <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.parent_id}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({parent_id: value});
                }}
                placeholder="School_id"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View> */}
            {/* <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.code}
                onChangeText={value => {
                  this.setState({code: value});
                }}

                placeholder="Code"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View> */}
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[TYPOGRAPHY.h5]}>Class</Text>
                <Picker
                  selectedValue={this.state.selectedClass}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedClass: itemValue});
                  }}>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                </Picker>
              </View>
              <View style={{flex: 1}}>
                <Text style={[TYPOGRAPHY.h5]}>Select School</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Picker
                    selectedValue={this.state.selectedSchool}
                    style={{height: 50, width: width / 2}}
                    // onValueChange={(modeValue, modeIndex) => this.setState({mode: modeValue})}>
                    // {this.state.dataSource.map((item, key)=>(
                    //         <Picker.Item label={item} value={item} key={key} />)
                    //         )}
                    onValueChange={(itemValue, itemIndex, id) => {
                      // this.pickerActivity(itemValue);
                      this.setState({selectedSchool: itemValue});
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
              </View>
            </View>

            <Text style={[TYPOGRAPHY.h5]}>Teacher</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.teacher}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({teacher: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Teacher"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Daily Spending Limit</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.daily_spending_limit}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({daily_spending_limit: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Daily Spending Limit"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Home Room</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.homeroom}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({homeroom: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Home Room"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Cell</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_cell}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_cell: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Cell"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Work Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_work_phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_work_phone: value});
                }}
                placeholder="Dad Work Phone"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Work Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_work_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_work_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Work Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Cell</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_cell}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_cell: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Cell"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Work Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_work_phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_work_phone: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Work Phone"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Work Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_work_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_work_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Work Email"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Notes</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.notes}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({notes: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={[TYPOGRAPHY.h5]}>Health Condition</Text>
                <Picker
                  selectedValue={this.state.health_conditions}
                  style={{height: 50, width: 150}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({health_conditions: itemValue});
                  }}>
                  <Picker.Item label="Good" value="good" />
                  <Picker.Item label="Bad" value="bad" />
                </Picker>
              </View>
              <View>
                <View style={{flex: 1}}>
                  <Text style={[TYPOGRAPHY.h5]}>Health Condition</Text>
                  <Picker
                    selectedValue={this.state.active}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({active: itemValue});
                    }}>
                    <Picker.Item label="Active" value="active" />
                    <Picker.Item label="Deactivate" value="deactivate" />
                  </Picker>
                </View>
              </View>
            </View>
            {this.state.type == 'Add' ? (
              <TouchableOpacity
                // onPress={handleSignin}

                onPress={() => {
                  this.addChild();
                }}
                disabled={this.state.disabled}
                style={BUTTONS.btnPrimary}>
                <Text style={BUTTONS.btnFont}>Add Student</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.updateStudent();
                }}
                disabled={this.state.disabled}
                style={BUTTONS.btnPrimary}>
                <Text style={BUTTONS.btnFont}>Update Student</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
