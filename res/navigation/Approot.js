import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../views/Loginscreen';
import RegisterScreen from '../views/Registerscreen';
import FunctionRoot from './Functionroot';
import QuestionaireScreen from '../views/Questionairescreen';

import { styles } from '../style/Styles';

export function AppRoot(){
	return (
      <NavigationContainer>
        <AppNavigator.Navigator initialRouteName="Login">
          <AppNavigator.Screen name="Login" component={LoginScreen} />
          <AppNavigator.Screen name="Register" component={RegisterScreen} />
          <AppNavigator.Screen name="Questionaire" component={QuestionaireScreen} />
          <AppNavigator.Screen name="Root" component={FunctionRoot} options={{ headerShown: false }}/>

        </AppNavigator.Navigator>
      </NavigationContainer>
	);
}

const AppNavigator = createStackNavigator();
