import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {createDrawerNavigator, DrawerItem, DrawerItemList} from '@react-navigation/drawer';

import Accounteditscreen from '../views/Accountscreen/Accounteditscreen.js';
import Accountviewscreen from '../views/Accountscreen/Accountviewscreen.js';
import Changepwdscreen from '../views/Accountscreen/Changepwdscreen.js';
import Accountaboutscreen from '../views/Accountscreen/Accountaboutscreen.js';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS} from '../style/Colors';

const Drawer = createDrawerNavigator();
const ICON_SIZE = 23;

function CustomDrawerContent(props) {
  return (
    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={{width: '75%'}} resizeMode="contain"/>
      </View>
      <View style={styles.logoutDrawer}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('Login')}
          activeTintColor={COLORS.ACCOUNT_NAV_TEXT_ACTIVE}
          activeBackgroundColor={COLORS.ACCOUNT_NAV_BG_ACTIVE}
          inactiveTintColor={COLORS.ACCOUNT_NAV_TEXT_INACTIVE}
          inactiveBackgroundColor={COLORS.ACCOUNT_NAV_BG_INACTIVE}
          labelStyle={styles.drawerLabel}
          icon={({focused}) =>
            <Icon size={ICON_SIZE} name={'log-out'} style={[styles.icon, {color: focused ? COLORS.ACCOUNT_NAV_TEXT_ACTIVE : COLORS.ACCOUNT_NAV_TEXT_INACTIVE}]}/>
          }/>
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
          activeTintColor: COLORS.ACCOUNT_NAV_TEXT_ACTIVE,
          activeBackgroundColor: COLORS.ACCOUNT_NAV_BG_ACTIVE,
          inactiveTintColor: COLORS.ACCOUNT_NAV_TEXT_INACTIVE,
          inactiveBackgroundColor: COLORS.ACCOUNT_NAV_BG_INACTIVE,
          labelStyle: styles.drawerLabel,
        }}>
        <Drawer.Screen
          name="Likes"
          component={Accountviewscreen}
          options={{
            drawerIcon: ({focused}) =>
              <Icon size={ICON_SIZE} name={'heart'} style={[styles.icon, {color: focused ? COLORS.ACCOUNT_NAV_TEXT_ACTIVE : COLORS.ACCOUNT_NAV_TEXT_INACTIVE}]}/>,
          }}/>
        <Drawer.Screen
          name="Profile"
          component={Accounteditscreen}
          options={{
            drawerIcon: ({focused}) =>
              <Icon size={ICON_SIZE} name={'user'} style={[styles.icon, {color: focused ? COLORS.ACCOUNT_NAV_TEXT_ACTIVE : COLORS.ACCOUNT_NAV_TEXT_INACTIVE}]}/>,
          }}/>
        <Drawer.Screen
          name="Password"
          component={Changepwdscreen}
          options={{
            drawerIcon: ({focused}) =>
              <Icon size={ICON_SIZE} name={'settings'} style={[styles.icon, {color: focused ? COLORS.ACCOUNT_NAV_TEXT_ACTIVE : COLORS.ACCOUNT_NAV_TEXT_INACTIVE}]}/>,
          }}/>
        <Drawer.Screen
          name="About us"
          component={Accountaboutscreen}
          options={{
            drawerIcon: ({focused}) =>
              <Icon size={ICON_SIZE} name={'help-circle'} style={[styles.icon, {color: focused ? COLORS.ACCOUNT_NAV_TEXT_ACTIVE : COLORS.ACCOUNT_NAV_TEXT_INACTIVE}]}/>,
          }}/>
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  logoutDrawer: {
    marginTop: -20,
    backgroundColor: COLORS.NAVIGATION_BACKGROUND,
  },
  drawerLabel: {
    fontSize: 18,
  },
});
