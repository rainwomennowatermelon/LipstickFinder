import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import HomeScreen from '../views/Homescreen';
import FindScreen from '../views/Findscreen';
import MakeupScreen from '../views/Makeupscreen';
import AccountRoot from './Accountroot';
import {COLORS} from '../style/Colors';

const FunctionNavigator = createBottomTabNavigator();

export default class Functionroot extends Component {
  render() {
    return (
      <FunctionNavigator.Navigator initialRouteName="Home"
                                   tabBarOptions={{
                                     activeTintColor: COLORS.NAVIGATION_ACTIVE,
                                     labelStyle: {fontSize: 12, margin: -5},
                                     style: {backgroundColor: COLORS.NAVIGATION_BACKGROUND},
                                   }}>
        <FunctionNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size}) => (
              <Icon type={'material-community'} name={'home-circle'} size={26} color={focused ? COLORS.NAVIGATION_ACTIVE : COLORS.GREY}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarLabel: 'Find',
            tabBarIcon: ({focused, color, size}) => (
              <Icon type={'font-awesome'} name={'search'} size={26} color={focused ? COLORS.NAVIGATION_ACTIVE : COLORS.GREY}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Makeup"
          component={MakeupScreen}
          options={{
            tabBarLabel: 'Makeup',
            tabBarIcon: ({focused, color, size}) => (
              <Icon type={'antdesign'} name={'smile-circle'} size={22} color={focused ? COLORS.NAVIGATION_ACTIVE : COLORS.GREY}/>
            ),
          }}
        />
        <FunctionNavigator.Screen
          name="Account"
          component={AccountRoot}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({focused, color, size}) => (
              <Icon type={'material'} name={'account-circle'} size={26} color={focused ? COLORS.NAVIGATION_ACTIVE : COLORS.GREY}/>
            ),
          }}/>
      </FunctionNavigator.Navigator>
    );
  }
}
// <Icon type={'font-awesome'} name={'search'} size={24} color={focused ? COLORS.NAVIGATION_ACTIVE : COLORS.GREY}/>
