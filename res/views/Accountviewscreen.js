import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from '../style/Styles.js';

export default class Accountscreen extends Component {
  onRegisterButtonPress(){
    this.props.navigation.navigate('Edit');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Account Screen</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onRegisterButtonPress.bind(this)}>
            <Text style={styles.AccountButtonText}>
              Edit
            </Text>
        </TouchableOpacity>
      </View>


    )
  }
}
