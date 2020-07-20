import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, Image } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';

import Accounteditscreen from '../views/Accountscreen/Accounteditscreen.js';
import Accountviewscreen from '../views/Accountscreen/Accountviewscreen.js';
import Changepwdscreen from '../views/Accountscreen/Changepwdscreen.js';
import Accountaboutscreen from '../views/Accountscreen/Accountaboutscreen.js';
import Icon from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView
      style={{ flex: 1, height: '100%'}}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <Image
          source={require('../images/logo.png')}
          style={{ width: '75%'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          marginTop: -20,
          height: 500,
          backgroundColor: '#6991c7',
        }}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate("Login")}
          activeTintColor='black'
          activeBackgroundColor='transparent'
          inactiveTintColor='white'
          inactiveBackgroundColor='transparent'
          labelStyle={{color: '#F5F5F5', fontSize: 15, marginLeft: 8,}}
        />
      </View>
    </SafeAreaView>
  );
}


export default class Accountroot extends Component {
  render() {
    return (

        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerContentOptions={{
            activeTintColor: 'black',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
              fontSize: 18,
            },
          }}
        >

          <Drawer.Screen
            name="Likes"
            component={Accountviewscreen}
            options={{drawerIcon: ({focused}) =>
              <Icon
                size={25}
                name={'file-text'}
                style={{color: focused?'black':'white',marginLeft: 5 }}>
              </Icon>}}
          />
          <Drawer.Screen
            name="Profile"
            component={Accounteditscreen}
            options={{drawerIcon: ({focused}) =>
              <Icon
                size={23}
                name={'user'}
                style={{color: focused?'black':'white',marginLeft: 5 }}>
              </Icon>}}
          />
          <Drawer.Screen
            name="Password"
            component={Changepwdscreen}
            options={{drawerIcon: ({focused}) =>
              <Icon
                size={23}
                name={'settings'}
                style={{color: focused?'black':'white',marginLeft: 5 }}>
              </Icon>}}
          />
          <Drawer.Screen
            name="About us"
            component={Accountaboutscreen}
            options={{drawerIcon: ({focused}) =>
              <Icon
                size={23}
                name={'help-circle'}
                style={{color: focused?'black':'white',marginLeft: 5 }}>
              </Icon>}}
          />


        </Drawer.Navigator>

    )
  }
}
