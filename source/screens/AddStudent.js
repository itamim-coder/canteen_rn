import {
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

export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      gender: '',
      email: '',
      password: '',
      password_confirmation: '',
      parent_id: '',
      school_id: '',
      code: '',
      class: '',
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
      health_conditions: '',
      active: '',
      addData: [],
    };
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
      school_id: this.state.school_id,
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
    };

    console.log(data);
    axios
      .post('https://laqil.com/public/api/student-store', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log(res.data);
          alert(res.data.message);
        },
        err => {
          console.log(err);
        },
      );
  };

  //   componentDidMount() {
  //     this.addChild();
  //   }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar />
        <ScrollView>
          <View style={{padding: 15}}>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.name}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({name: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Name"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({phone: value, emailerror: ''});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Phone"
                placeholderTextColor={'grey'}
                style={INPUT.input}
                keyboardType={'numeric'}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.gender}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({gender: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Gender"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({password: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Password"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.password_confirmation}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({password_confirmation: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Password Confirmation"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.parent_id}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({parent_id: value});
                }}
                placeholder="Parent_id"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.school_id}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({school_id: value});
                }}
                placeholder="School_id"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.code}
                onChangeText={value => {
                  this.setState({code: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Code"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.class}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({class: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Class"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.teacher}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({teacher: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Teacher"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.daily_spending_limit}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({daily_spending_limit: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Daily Spending Limit"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.homeroom}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({homeroom: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Home Room"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.dad_cell}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_cell: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Cell"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.dad_work_phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_work_phone: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Work Phone"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.dad_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.dad_work_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({dad_work_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Dad Work Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.mom_cell}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_cell: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Cell"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.mom_work_phone}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_work_phone: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Work Phone"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.mom_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.mom_work_email}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({mom_work_email: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Mom Work Email"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.notes}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({notes: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Notes"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.health_conditions}
                onChangeText={value => {
                  this.setState({health_conditions: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Health Condition"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
            <View style={INPUT.inputContainer}>
              <TextInput
                value={this.state.active}
                // onFocus={this.setState({error: ''})}
                onChangeText={value => {
                  this.setState({active: value});
                }}
                // onChangeText={text => setEmail(text)}
                placeholder="Active"
                placeholderTextColor={'grey'}
                style={INPUT.input}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          // onPress={handleSignin}

          onPress={() => {
            this.addChild();
          }}
          disabled={this.state.disabled}
          style={BUTTONS.btnPrimary}>
          <Text style={BUTTONS.btnFont}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
