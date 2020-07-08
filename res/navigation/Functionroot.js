import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../views/Homescreen';
import FindScreen from '../views/Findscreen';
import MakeupScreen from '../views/Makeupscreen';
import AccountRoot from './Accountroot';

const FunctionNavigator = createBottomTabNavigator();

export default class Functionroot extends Component {
  render() {
    
    return (
        <FunctionNavigator.Navigator initialRouteName="Home">
          <FunctionNavigator.Screen name="Home" component={HomeScreen} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon name={'home'} size={24} color={'#999'} />
              ),
            }}
          />
          <FunctionNavigator.Screen name="Find" component={FindScreen}
            options={{
              tabBarLabel: 'Find',
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon name={'search'} size={24} color={'#999'}  />
              ),
            }}
          />
          <FunctionNavigator.Screen name="Makeup" component={MakeupScreen}
            options={{
              tabBarLabel: 'Makeup',
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon name={'smile-o'} size={24} color={'#999'}  />
              ),
            }} 
          />
          <FunctionNavigator.Screen name="Account" component={AccountRoot}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color, size }) => (
                <IoniconsIcon name={'ios-person'} size={24} color={'#999'}  />
              ),
            }} 
          />
        </FunctionNavigator.Navigator>
    )
  }
}
