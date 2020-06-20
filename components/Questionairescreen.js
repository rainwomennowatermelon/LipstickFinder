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
import { styles } from './Styles';

export default class Questionairescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      // Email: '0',
      // Password: '0',
      // ConfirmPassword: '0',
    };
  };

  onOkButtonPress(){
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.Container}>
        <Text>Questionnaire</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onOkButtonPress.bind(this)}>
            <Text style={styles.AccountButtonText}>
              OK
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}