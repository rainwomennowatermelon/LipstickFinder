import React, { Component } from 'react';
import { Button, View, Text, SafeAreaView, Image } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';

import Accounteditscreen from '../views/Accountscreen/Accounteditscreen.js';
import Lipstickinforoot from '../navigation/Lipstickinforoot.js';
import Changepwdscreen from '../views/Accountscreen/Changepwdscreen.js';
import Accountaboutscreen from '../views/Accountscreen/Accountaboutscreen.js';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView
      style={{ flex: 1, height: '100%', backgroundColor: '#FFFFFF' }}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent: "space-around",
        }}
      >
        <Image
          source={require('../images/logo.png')}
          style={{ width: '70%'}}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginTop: -20, marginLeft: 10 }}>
        <DrawerItemList {...props} />
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
            activeTintColor: '#CA7476',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: '#101010',
            inactiveBackgroundColor: 'transparent',
            backgroundColor: '#D9D8D8',
            labelStyle: {
              fontSize: 15,
              marginLeft: 0,
            },
          }}
        >

          <Drawer.Screen name="Likes" component={Lipstickinforoot} />
          <Drawer.Screen name="Settings" component={Accounteditscreen} />
          <Drawer.Screen name="Password" component={Changepwdscreen} />
          <Drawer.Screen name="About us" component={Accountaboutscreen} />
          <Drawer.Screen name="Privacy policy" component={Accounteditscreen} />

        </Drawer.Navigator>

    )
  }
}
