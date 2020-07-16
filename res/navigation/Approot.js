import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../views/Loginscreen';
import RegisterScreen from '../views/Registerscreen';
import FunctionRoot from './Functionroot';
import QuestionnaireScreen from '../views/Questionnairescreen';
import LipsticksInforScreen from '../views/Lipsticksinforscreen';

import { styles } from '../style/Styles';

export function AppRoot(){
	return (
      <NavigationContainer>
        <AppNavigator.Navigator initialRouteName="Login">
          <AppNavigator.Screen name="Login" component={LoginScreen} />
          <AppNavigator.Screen name="Register" component={RegisterScreen} />
          <AppNavigator.Screen name="Questionnaire" component={QuestionnaireScreen} />
          <AppNavigator.Screen name="Root" component={FunctionRoot} options={{ headerShown: false }}/>
		  <AppNavigator.Screen name="LipsticksInfor" component={LipsticksInforScreen} />
        </AppNavigator.Navigator>
      </NavigationContainer>
	);
}

const AppNavigator = createStackNavigator();
