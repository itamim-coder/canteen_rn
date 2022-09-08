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
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, RadioButton} from 'react-native-paper';
import {multiline} from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
const width = Dimensions.get('screen').width;
import Modal from 'react-native-modal';
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
      class: '1',
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
      health_conditions: null,
      active: null,
      addData: [],
      selectedValue: 'male',
      selectedSchool: '',
      schoolList: [],
      id: this.props.route.params.id,
      type: this.props.route.params.type,
      response: null,
      upload_picture: null,
      disabled: false,
      indicator: false,
      isGenderVisible: false,
      isClassVisible: false,
      isHealthVisible: false,
      isStatusVisible: false,
      isModalVisible: false,
      checked: null,
      // id: '',
    };
    console.log(this.props.route.params);
  }
  toggleModal = () => {
    // this.setState({checked: this.state.id});
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  toggleGender = () => {
    this.setState({isGenderVisible: !this.state.isGenderVisible});
  };
  genderActivity = value => {
    this.setState({isGenderVisible: !this.state.isGenderVisible});
    this.setState({gender: value});
  };
  toggleClass = () => {
    this.setState({isClassVisible: !this.state.isClassVisible});
  };
  classActivity = value => {
    this.setState({isClassVisible: !this.state.isClassVisible});
    this.setState({class: value});
  };
  toggleHealth = () => {
    this.setState({isHealthVisible: !this.state.isHealthVisible});
  };
  healthActivity = value => {
    this.setState({isHealthVisible: !this.state.isHealthVisible});
    this.setState({health_conditions: value});
  };
  toggleStatus = () => {
    this.setState({isStatusVisible: !this.state.isStatusVisible});
  };
  statusActivity = value => {
    this.setState({isStatusVisible: !this.state.isStatusVisible});
    this.setState({active: value});
  };

  addChild = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log(token);
    this.setState({indicator: true});
    this.setState({disabled: true});
    setTimeout(() => {
      this.setState({indicator: false});
      this.setState({disabled: false});
    }, 1500);
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      parent_id: this.state.parent_id,
      school_id: this.state.checked,
      code: this.state.code,
      class: this.state.class,
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
      profile_picture: this.state.upload_picture,
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
            this.props.navigation.navigate('ManageChildren');
          }
        },
        err => {
          alert(err.response.data.message);
        },
      );
  };
  // updateStudent = async () => {
  //   const user = await AsyncStorage.getItem('userInfo');
  //   const parse = JSON.parse(user);

  //   const token = parse.token;
  //   console.log(token);
  //   this.setState({indicator: true});
  //   this.setState({disabled: true});
  //   setTimeout(() => {
  //     this.setState({indicator: false});
  //     this.setState({disabled: false});
  //   }, 1500);
  //   const data = {
  //     name: this.state.name,
  //     phone: this.state.phone,
  //     gender: this.state.gender,
  //     email: this.state.email,
  //     password: this.state.password,
  //     password_confirmation: this.state.password_confirmation,
  //     parent_id: this.state.parent_id,
  //     school_id: this.state.selectedSchool,
  //     code: this.state.code,
  //     class: this.state.selectedClass,
  //     teacher: this.state.teacher,
  //     daily_spending_limit: this.state.daily_spending_limit,
  //     homeroom: this.state.homeroom,
  //     dad_cell: this.state.dad_cell,
  //     dad_email: this.state.dad_email,
  //     dad_work_email: this.state.dad_work_email,
  //     dad_work_phone: this.state.dad_work_phone,
  //     mom_cell: this.state.mom_cell,
  //     mom_work_phone: this.state.mom_work_phone,
  //     mom_email: this.state.mom_email,
  //     mom_work_email: this.state.mom_work_email,
  //     notes: this.state.notes,
  //     health_conditions: this.state.health_conditions,
  //     active: this.state.active,
  //   };

  //   console.log(data);
  //   axios
  //     .post(
  //       `https://laqil.com/public/api/student-update/${this.state.id}`,
  //       data,
  //       {
  //         headers: {Authorization: `Bearer ${token}`},
  //       },
  //     )
  //     .then(
  //       res => {
  //         console.log(res.data);
  //         if (res.data.status == true) {
  //           alert(res.data.message);
  //           this.props.navigation.navigate('Profile');
  //         }
  //       },
  //       err => {
  //         alert(err.response.data.message);
  //       },
  //     );
  // };
  componentDidMount() {
    this.setState({gender: null});
    this.setState({class: null});
    this.setState({school: null});
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
  openGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        alert('User Cancelled');
      } else if (response.error) {
        alert(response.error);
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        // console.log(response.asset);
        this.setState({response: response});
        this.setState({upload_picture: response.assets[0].fileName});
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <Statusbar name={'Add Student'} />
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
                <TouchableOpacity onPress={() => this.openGallery()}>
                  {this.state.response === null ? (
                    <>
                      <Image
                        resizeMode="contain"
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 50,
                          // backgroundColor: colors.red,
                        }}
                        source={require('../../assets/images/profile.png')}
                      />
                    </>
                  ) : (
                    <>
                      {this.state.response?.assets &&
                        this.state.response?.assets.map(({uri}) => (
                          // this.setState({profile_picture: uri}),
                          <View key={uri}>
                            <Image
                              resizeMode="contain"
                              resizeMethod="scale"
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 50,
                                // backgroundColor: colors.red,
                              }}
                              source={{uri}}
                            />
                          </View>
                        ))}
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Full Name</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.name}
                onChangeText={value => {
                  this.setState({name: value});
                }}
                placeholder="Full Name"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Student Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.phone}
                onChangeText={value => {
                  this.setState({phone: value, emailerror: ''});
                }}
                placeholder="Student Phone"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
                keyboardType={'numeric'}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Student Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.email}
                onChangeText={value => {
                  this.setState({email: value});
                }}
                placeholder="Student Email"
                autoCapitalize="none"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            {/* <View style={{flex: 1, marginTop: 0, marginBottom: 35}}>
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
            </View> */}

            {/* --------------Gender---------------- */}

            <View style={{marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Select Gender</Text>
              <TouchableOpacity
                onPress={() => {
                  this.toggleGender();
                }}>
                {this.state.gender == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Gender
                    </Text>
                    <AntDesign name="caretdown" size={16} color="gray" />
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5]}>
                      {this.state.gender.toUpperCase()}
                    </Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isGenderVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select Gender
                  </Text>
                </View>

                <ScrollView>
                  <RadioButton.Group
                    color={colors.red}
                    value={this.state.gender}
                    onValueChange={newValue => {
                      this.setState({gender: newValue});
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value={'male'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Male
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value={'female'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Female
                      </Text>
                    </View>
                  </RadioButton.Group>
                </ScrollView>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleGender()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.genderActivity(this.state.gender)}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            {/* -------------Gender End-------------- */}

            <Text style={[TYPOGRAPHY.h5]}>Password</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.password}
                onChangeText={value => {
                  this.setState({password: value});
                }}
                placeholder="Password"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
                secureTextEntry
              />
            </View>

            <Text style={[TYPOGRAPHY.h5]}>Password Confirmation</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.password_confirmation}
                onChangeText={value => {
                  this.setState({password_confirmation: value});
                }}
                placeholder="Password Confirmation"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
                secureTextEntry
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

            {/* -----------Class---------- */}

            <View style={{flex: 1, marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Select Class</Text>
              {/* <Picker
                  selectedValue={this.state.selectedClass}
                  style={{height: 50, width: width / 2 - 20}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedClass: itemValue});
                  }}>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                </Picker> */}

              <TouchableOpacity
                onPress={() => {
                  this.toggleClass();
                }}>
                {this.state.class == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Select Class
                    </Text>
                    <AntDesign name="caretdown" size={15} color="gray" />
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5]}>
                      Class {this.state.class}
                    </Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isClassVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select Class
                  </Text>
                </View>

                <ScrollView>
                  <RadioButton.Group
                    color={colors.red}
                    value={this.state.class}
                    onValueChange={newValue => {
                      this.setState({class: newValue});
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value={'1'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        One
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton value={'2'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Two
                      </Text>
                    </View>
                  </RadioButton.Group>
                </ScrollView>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleClass()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.classActivity(this.state.class)}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* --------------------class end -------------- */}

            {/* ----------School Start------------ */}
            <View style={{flex: 1, marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Select School</Text>

              <TouchableOpacity
                onPress={() => {
                  this.toggleModal();
                }}>
                {this.state.checked == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Select School
                    </Text>
                    <AntDesign name="caretdown" size={16} color="gray" />
                  </View>
                ) : (
                  this.state.schoolList.map(
                    item =>
                      item.id === this.state.checked && (
                        <View
                          style={[
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              borderWidth: 2,
                              borderColor: colors.gray,
                              borderRadius: 5,
                              paddingHorizontal: 15,
                              paddingVertical: 10,
                              alignItems: 'center',
                            },
                          ]}>
                          <Text style={[TYPOGRAPHY.h5]}>{item.name}</Text>
                          <AntDesign name="caretdown" size={16} color="black" />
                        </View>
                      ),
                  )
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select A School
                  </Text>
                </View>

                <View>
                  {this.state.schoolList.map(item => (
                    // <TouchableOpacity>
                    // console.log(item.id),

                    <RadioButton.Group
                      color={colors.red}
                      value={this.state.checked}
                      onValueChange={newValue => {
                        this.setState({checked: newValue});
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton value={item.id} />
                        <Text
                          style={[
                            TYPOGRAPHY.primary,
                            {fontSize: 18, paddingRight: 15},
                          ]}>
                          {item.name}
                        </Text>
                      </View>
                    </RadioButton.Group>
                  ))}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* ----------School End------------ */}

            <Text style={[TYPOGRAPHY.h5]}>Teacher</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.teacher}
                onChangeText={value => {
                  this.setState({teacher: value});
                }}
                placeholder="Teacher"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Daily Spending Limit</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.daily_spending_limit}
                onChangeText={value => {
                  this.setState({daily_spending_limit: value});
                }}
                placeholder="Daily Spending Limit"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Home Room</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.homeroom}
                onChangeText={value => {
                  this.setState({homeroom: value});
                }}
                placeholder="Home Room"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Cell</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_cell}
                onChangeText={value => {
                  this.setState({dad_cell: value});
                }}
                placeholder="Dad Cell"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Work Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_work_phone}
                onChangeText={value => {
                  this.setState({dad_work_phone: value});
                }}
                placeholder="Dad Work Phone"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_email}
                onChangeText={value => {
                  this.setState({dad_email: value});
                }}
                placeholder="Dad Email"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Dad Work Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.dad_work_email}
                onChangeText={value => {
                  this.setState({dad_work_email: value});
                }}
                placeholder="Dad Work Email"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Cell</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_cell}
                onChangeText={value => {
                  this.setState({mom_cell: value});
                }}
                placeholder="Mom Cell"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Work Phone</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_work_phone}
                onChangeText={value => {
                  this.setState({mom_work_phone: value});
                }}
                placeholder="Mom Work Phone"
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>
            <Text style={[TYPOGRAPHY.h5]}>Mom Email</Text>
            <View
              style={[INPUT.inputContainer, {marginTop: 0, marginBottom: 35}]}>
              <TextInput
                value={this.state.mom_email}
                onChangeText={value => {
                  this.setState({mom_email: value});
                }}
                placeholder="Mom Email"
                placeholderTextColor={colors.darkGrey}
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
                placeholderTextColor={colors.darkGrey}
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
                placeholderTextColor={colors.darkGrey}
                style={[INPUT.input, TYPOGRAPHY.h5]}
              />
            </View>

            {/* -----------Health Condition---------- */}

            <View style={{flex: 1, marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Health Condition</Text>

              <TouchableOpacity
                onPress={() => {
                  this.toggleHealth();
                }}>
                {this.state.health_conditions == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Select Health Condition
                    </Text>
                    <AntDesign name="caretdown" size={15} color="gray" />
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5]}>
                      {this.state.health_conditions.toUpperCase()}
                    </Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isHealthVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select Condition
                  </Text>
                </View>

                <ScrollView>
                  <RadioButton.Group
                    value={this.state.health_conditions}
                    onValueChange={newValue => {
                      this.setState({health_conditions: newValue});
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton color={colors.red} value={'good'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Good
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton color={colors.red} value={'bad'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Bad
                      </Text>
                    </View>
                  </RadioButton.Group>
                </ScrollView>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleHealth()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.healthActivity(this.state.health_conditions)
                  }
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* --------------------Health end -------------- */}

            {/* -----------Active Status---------- */}

            <View style={{flex: 1, marginBottom: 35}}>
              <Text style={[TYPOGRAPHY.h5]}>Status</Text>

              <TouchableOpacity
                onPress={() => {
                  this.toggleStatus();
                }}>
                {this.state.active == null ? (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5, {color: colors.darkGrey}]}>
                      Select Status
                    </Text>
                    <AntDesign name="caretdown" size={15} color="gray" />
                  </View>
                ) : (
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderWidth: 2,
                        borderColor: colors.gray,
                        borderRadius: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text style={[TYPOGRAPHY.h5]}>
                      {this.state.active.toUpperCase()}
                    </Text>
                    <AntDesign name="caretdown" size={16} color="black" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Modal isVisible={this.state.isStatusVisible}>
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: colors.white,
                  padding: 20,
                  borderTopStartRadius: 10,
                  borderTopEndRadius: 10,
                }}>
                <View>
                  <Text style={[TYPOGRAPHY.medium, {fontSize: 20}]}>
                    Select Status
                  </Text>
                </View>

                <ScrollView>
                  <RadioButton.Group
                    value={this.state.active}
                    onValueChange={newValue => {
                      this.setState({active: newValue});
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton color={colors.red} value={'active'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Active
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton color={colors.red} value={'deactivate'} />
                      <Text
                        style={[
                          TYPOGRAPHY.primary,
                          {fontSize: 18, paddingRight: 15},
                        ]}>
                        Deactivate
                      </Text>
                    </View>
                  </RadioButton.Group>
                </ScrollView>
              </View>
              <View
                style={{
                  backgroundColor: colors.red,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  borderBottomStartRadius: 10,
                  borderBottomEndRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.toggleStatus()}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    borderBottomStartRadius: 10,
                    // borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      CANCEL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderRightWidth: 1.5,
                    borderRightColor: colors.white,
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.statusActivity(this.state.active)}
                  style={{
                    backgroundColor: colors.red,
                    flex: 1,
                    // borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View>
                    <Text
                      style={[
                        TYPOGRAPHY.h4,
                        {
                          textAlign: 'center',
                          fontSize: 16,
                          color: colors.white,
                          paddingVertical: 10,
                        },
                      ]}>
                      OK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            {/* --------------------Status end -------------- */}

            <TouchableOpacity
              onPress={() => {
                this.addChild();
              }}
              disabled={this.state.disabled}
              style={BUTTONS.btnPrimary}>
              {this.state.indicator === true ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={BUTTONS.btnFont}>Add Student</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
