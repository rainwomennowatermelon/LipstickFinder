import React, { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lipsticksinforscreen from '../views/Lipsticksinforscreen';
import Accountviewscreen from '../views/Accountscreen/Accountviewscreen';
import { styles } from '../style/Styles';

export default class Lipstickinforoot extends Component{
	render(){
		return (
			<LipstickNavigator.Navigator initialRouteName="View">
				<LipstickNavigator.Screen name="View" component={Accountviewscreen} options={{ headerShown: false }}/>
				<LipstickNavigator.Screen name="Lipstcikinfo" component={Lipsticksinforscreen} />
			</LipstickNavigator.Navigator>
		);

	}
}

const LipstickNavigator = createStackNavigator();
