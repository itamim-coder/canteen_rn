import {
  FlatList,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Statusbar from '../components/Statusbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {colors} from '../theme/colors';
import TYPOGRAPHY from '../theme/typography';
import SCREEN from '../theme/Screen';

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.route.params.id,
      order_Details: [],
      schoolList: [],
      selectedSchool: '',
      school: null,
      date: null,
      time: null,
      indicator: true,
    };
  }

  orderDetails = async () => {
    const user = await AsyncStorage.getItem('userInfo');
    const parse = JSON.parse(user);

    const token = parse.token;

    console.log('token', token);
    this.setState({indicator: true});
    axios
      .get(`https://laqil.com/public/api/order-details/${this.state.id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(
        res => {
          console.log(res.data.data.data.date.slice(5, 10));
          console.log(res.data.data.data.date.slice(11, 16));
          this.setState({order_Details: res.data?.data.data});
          this.setState({date: res.data.data.data.date.slice(5, 10)});
          this.setState({time: res.data.data.data.date.slice(11, 16)});
          //   console.log(res.data);
          this.setState({indicator: false});
        },
        err => {
          console.log(err);
        },
      );
  };
  schoolList = () => {
    fetch('https://laqil.com/public/api/school-list')
      .then(res => res.json())
      .then(res => {
        if (res.status == true) {
          this.setState({schoolList: res.data});
        }
      });
  };

  componentDidMount() {
    this.orderDetails();
    this.schoolList();
  }

  renderOrderDetails = ({item}) => {
    const {picture, description, price, school_id} = item.products;
    // this.setState({school: item.products.school_id});
    console.log(item.products.school_id);

    return (
      <View>
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
          }}>
          <Text style={[TYPOGRAPHY.h4Bold, {fontSize: 14}]}>{description}</Text>
          <Text style={[TYPOGRAPHY.h4Bold, {fontSize: 14}]}>
            ${item.qty * price}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {student, payment_amount, date} = this.state.order_Details;
    console.log(this.state.order_Details);
    console.log(this.state.selectedSchool);

    return (
      <SafeAreaView style={{flex: 1}}>
        <Statusbar name={'Order Details'} />
        {this.state.indicator === true ? (
          <ActivityIndicator
            color={colors.red}
            size={'large'}
            style={{flex: 1}}
          />
        ) : (
          <>
            <View style={[SCREEN.screen]}>
              <ScrollView>
                <View
                  style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <View>
                    <Text style={[TYPOGRAPHY.h4]}>Order For</Text>
                    <Text style={[TYPOGRAPHY.h4]}>{student}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: colors.red,
                    }}
                  />
                  <View>
                    <Text style={[TYPOGRAPHY.h6Bold]}>School</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={[TYPOGRAPHY.h4]}>Ordered items</Text>
                  <Text style={[TYPOGRAPHY.h5, {color: colors.ash}]}>
                    {this.state.date} , {this.state.time}
                  </Text>
                </View>
                <FlatList
                  data={this.state.order_Details.ordered_product}
                  renderItem={item => this.renderOrderDetails(item)}
                />
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderBottomStartRadius: 10,
                    borderBottomEndRadius: 10,
                  }}>
                  <View
                    style={{
                      borderWidth: 0.7,
                      borderStyle: 'dashed',
                      borderColor: colors.light,
                    }}
                  />
                  <View
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[TYPOGRAPHY.h4, {fontSize: 14}]}>
                      Item Total
                    </Text>
                    <Text style={[TYPOGRAPHY.h4, {fontSize: 14}]}>
                      ${payment_amount}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}
      </SafeAreaView>
    );
  }
}
