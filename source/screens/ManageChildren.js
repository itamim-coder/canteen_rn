import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TYPOGRAPHY from '../theme/typography';
import {colors} from '../theme/colors';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import INPUT from '../theme/Input';
import BUTTONS from '../theme/Buttons';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const width = Dimensions.get('window').width - 40;
export default class ManageChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      visible: false,
      name: '',
      spendingLimit: '',
      classValue: 'no',
      schoolValue: 'no',
      children: [],
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
    // blurRadius={1}
  };

  findChildren = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);

    axios
      .get('https://laqil.com/public/api/student-list', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({children: res.data.data});
          console.log(res.data.data);
        },
        err => {
          console.log(err);
        },
      );
  };

  componentDidMount() {
    this.findChildren();
  }
  // handleSubmit = async () => {
  //   const data = {
  //     name: this.state.name,
  //     spendingLimit: this.state.spendingLimit,
  //     classValue: this.state.classValue,
  //     schoolValue: this.state.schoolValue,
  //   };
  //   // console.log(this.state.name, this.state.schoolValue);
  //   const updatedData = [...this.state.allData, data];
  //   this.setState({allData: updatedData});
  //   await AsyncStorage.setItem('children', JSON.stringify(updatedData));
  //   this.setModalVisible(!this.state.modalVisible);
  // };

  // deleteChild = async ({item}) => {
  //   console.log('item', item);
  //   const result = await AsyncStorage.getItem('children');
  //   let childrens = [];
  //   if (result !== null) {
  //     childrens = JSON.parse(result);
  //   }
  //   // console.log('childrens', childrens.name);
  //   const newChildrens = childrens.filter(
  //     children =>
  //       //   childrens.name !== this.state.allData.name,
  //       console.log('childrens', children.name),
  //     //   console.log('alldata', allData.name),
  //   );
  //   console.log('new', newChildrens);
  //   // this.setState{(childrens: newChildrens);
  //   // await AsyncStorage.setItem('children', JSON.stringify(newChildrens));
  //   this.props.navigation.goBack();
  // };
  // handleDelete = () => {
  //   Alert.alert(
  //     'Are You Sure!',
  //     'This action will delete your note permanently!',
  //     [
  //       {
  //         text: 'Delete',
  //         onPress: this.deleteChild,
  //       },
  //       {
  //         text: 'No Thanks',
  //         onPress: () => console.log('no thanks'),
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //     },
  //   );
  // };

  renderChildren = ({item}) => {
    console.log(item);
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('StudentDetails', {id: item.id})
          }>
          <View
            style={{
              backgroundColor: colors.white,
              //   width:,
              padding: 15,
              borderRadius: 10,
              marginTop: 15,
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 20}}>
              <Image
                style={{height: 35, width: 35}}
                source={require('../../assets/images/profile.png')}
              />
            </View>
            <View>
              <Text style={TYPOGRAPHY.h4}>{item.name}</Text>
              <Text style={[TYPOGRAPHY.medium, {color: colors.ash}]}>
                {item.school}
              </Text>
              <Text style={[TYPOGRAPHY.medium, {color: colors.ash}]}>
                {item.class}
              </Text>
            </View>
            {/* <TouchableOpacity onPress={() => this.handleDelete()}>
              <Text>delete</Text>
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
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
    const {modalVisible} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Image
              style={image}
              source={require('../../assets/images/profile.png')}
            />
          </TouchableOpacity>
          <View style={{flex: 2}}>
            <Text
              style={[
                TYPOGRAPHY.h3,
                {
                  textAlign: 'center',
                },
              ]}>
              {/* {name} */}
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <FlatList
              data={this.state.children}
              renderItem={item => this.renderChildren(item)}
            />
          </View>
          <View>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  this.setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Children</Text>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setName(text)}
                        value={this.state.name}
                        onChangeText={value => {
                          this.setState({name: value});
                        }}
                        placeholder="Name"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setName(text)}
                        value={this.state.name}
                        onChangeText={value => {
                          this.setState({name: value});
                        }}
                        placeholder="Name"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                    <View style={INPUT.inputContainer}>
                      <TextInput
                        // onChangeText={text => setName(text)}
                        value={this.state.spendingLimit}
                        onChangeText={value => {
                          this.setState({spendingLimit: value});
                        }}
                        placeholder="Phone"
                        placeholderTextColor={'grey'}
                        style={INPUT.input}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                        School
                      </Text>
                      <Picker
                        selectedValue={this.state.schoolValue}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({schoolValue: itemValue});
                        }}>
                        <Picker.Item label="Select School" value="no" />
                        <Picker.Item
                          label="Caymen Primary"
                          value="cayman-primary"
                        />
                        <Picker.Item
                          label="Caymen Secondary"
                          value="cayman-secondary"
                        />
                      </Picker>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[TYPOGRAPHY.medium, styles.inputTitle]}>
                        Class/Grade
                      </Text>
                      <Picker
                        selectedValue={this.state.classValue}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({classValue: itemValue});
                        }}>
                        <Picker.Item label="Select Class" value="no" />
                        <Picker.Item label="Class 1" value="class-1" />
                        <Picker.Item label="Class 2" value="class-2" />
                        <Picker.Item label="Class 3" value="class-3" />
                      </Picker>
                    </View>

                    <TouchableOpacity
                      style={BUTTONS.btnPrimary}
                      /* style={[styles.button, styles.buttonClose]} */
                      onPress={() => this.handleSubmit()}>
                      <Text style={styles.textStyle}>Submit </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={(BUTTONS.btnPrimary, [styles.button, styles.buttonOpen])}
            /* style={[styles.button, styles.buttonClose]} */
            onPress={() =>
              this.props.navigation.navigate('AddStudent', {
                type: 'Add',
              })
            }>
            <Text style={[BUTTONS.btnFont, {textAlign: 'center'}]}>
              Submit{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    // backgroundColor: colors.black,
  },
  modalView: {
    margin: 20,
    // blurRadius: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.red,
    width: '90%',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: 'center',
  },
});
