import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


import Accounteditscreen from '../screens/Accounteditscreen';
import Accountviewscreen from '../screens/Accountviewscreen';

const AccountNavigator = createStackNavigator();

export default class Accountroot extends Component {
  render() {
    return (
        <AccountNavigator.Navigator initialRouteName="View">
          <AccountNavigator.Screen name="View" component={Accountviewscreen} />
          <AccountNavigator.Screen name="Edit" component={Accounteditscreen} />
        </AccountNavigator.Navigator>
    )
  }
}
