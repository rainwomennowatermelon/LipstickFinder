import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import HomeScreen from '../views/Homescreen';
import FindScreen from '../views/Findscreen';
import MakeupScreen from '../views/Makeupscreen';
import AccountRoot from './Accountroot';

const FunctionNavigator = createBottomTabNavigator();

export default class Functionroot extends Component {
  render() {
    return (
      <FunctionNavigator.Navigator initialRouteName="Home">
        <FunctionNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon type={'material-community'} name={'home-circle'} size={26} color={'#999'}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarLabel: 'Find',
            tabBarIcon: ({color, size}) => (
              <Icon type={'font-awesome'} name={'search'} size={24} color={'#999'}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Makeup"
          component={MakeupScreen}
          options={{
            tabBarLabel: 'Makeup',
            tabBarIcon: ({color, size}) => (
              <Icon type={'simple-line-icon'} name={'emotsmile'} size={22} color={'#999'}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Account"
          component={AccountRoot}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Icon type={'material'} name={'account-circle'} size={26} color={'#999'}/>
            ),
          }}/>
      </FunctionNavigator.Navigator>
    );
  }
}
