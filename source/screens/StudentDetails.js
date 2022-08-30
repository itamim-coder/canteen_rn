import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Statusbar from '../components/Statusbar';
import TYPOGRAPHY from '../theme/typography';
import SCREEN from '../theme/Screen';
import BUTTONS from '../theme/Buttons';
import Button from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../theme/colors';

export default class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route?.params?.id,
      studentDetails: {},
    };
    console.log(this.props.route.params.id);
  }

  handleDlt = async id => {
    console.log('id', id);
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);

    axios
      .post(
        `https://laqil.com/public/api/student-delete/${id}`,
        this.state.studentDetails,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(
        res => {
          //   this.setState({children: res.data.data});
          console.log(res);
          this.props.navigation.navigate('Profile');
        },
        err => {
          console.log(err);
        },
      );
  };
  confirmDlt = id => {
    Alert.alert('Remove Student', 'Are you sure you want to remove?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: () => this.handleDlt(id),
      },
    ]);
  };
  studentDetails = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;
    console.log('token', token);

    axios
      .get(`https://laqil.com/public/api/student-details/${this.state.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          this.setState({studentDetails: res.data.data});
        },
        err => {
          console.log(err);
        },
      );

    // if (result !== null) {()
    //   this.setState({allData: JSON.parse(result)});
    // }
  };
  componentDidMount() {
    this.studentDetails();
  }

  render() {
    // console.log('Student', this.props.route.params.item);
    const {
      id,
      name,
      email,
      school,

      gender,
      parent,
      teacher,
      health_conditions,
      dob,
      dad_cell,
      dad_email,
      dad_work_phone,
      dad_work_email,
      mom_cell,
      mom_email,
      mom_work_phone,
      mom_work_email,
    } = this.state.studentDetails;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        {/* <Text>StudentDetails</Text> */}
        <Statusbar />
        <ScrollView>
          <View style={[SCREEN.screen]}>
            <View
              style={{
                // justifyContent: 'space-between',
                // flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View>
                <Image
                  style={{height: 100, width: 100}}
                  source={require('../../assets/images/profile.png')}
                />
              </View>
            </View>
            <View>
              <Text style={[TYPOGRAPHY.h3, {textAlign: 'center'}]}>
                Student Details
              </Text>
              <View>
                <Text style={[TYPOGRAPHY.medium]}>Name : {name}</Text>
                <Text style={[TYPOGRAPHY.medium]}>email : {email}</Text>
                <Text style={[TYPOGRAPHY.medium]}>School : {school}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Class : {this.state.studentDetails.class}
                </Text>
                <Text style={[TYPOGRAPHY.medium]}>Gender : {gender}</Text>
                <Text style={[TYPOGRAPHY.medium]}>Date of Birth : {dob}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Health Condition : {health_conditions}
                </Text>
                <Text style={[TYPOGRAPHY.medium]}>Parent : {parent}</Text>
                <Text style={[TYPOGRAPHY.medium]}>Teacher : {teacher}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {textAlign: 'center'}]}>
                  Father Details
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.medium]}>Dad Cell : {dad_cell}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Dad Working Phone : {dad_work_phone}
                </Text>
                <Text style={[TYPOGRAPHY.medium]}>Dad Email : {dad_email}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Dad Working Email : {dad_work_email}
                </Text>
              </View>
            </View>

            <View>
              <View>
                <Text style={[TYPOGRAPHY.h3, {textAlign: 'center'}]}>
                  Mother Details
                </Text>
              </View>
              <View>
                <Text style={[TYPOGRAPHY.medium]}>Mom Cell : {mom_cell}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Mom Working Phone : {mom_work_phone}
                </Text>
                <Text style={[TYPOGRAPHY.medium]}>Mom Email : {mom_email}</Text>
                <Text style={[TYPOGRAPHY.medium]}>
                  Mom Working Email : {mom_work_email}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              SCREEN.screen,
              {
                // padding: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('AddStudent', {
                id: id,
                type: 'Update',
              })
            }
            style={[BUTTONS.btnPrimary, {paddingHorizontal: 40}]}>
            <Text style={[BUTTONS.btnFont]}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.confirmDlt(id)}
            style={[BUTTONS.btnPrimary, {paddingHorizontal: 40}]}>
            <Text style={[BUTTONS.btnFont]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
