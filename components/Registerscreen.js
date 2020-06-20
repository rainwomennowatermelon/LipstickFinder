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

export default class Registerscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      Email: '0',
      Password: '0',
      ConfirmPassword: '0',
    };
  };

  onSignupButtonPress(){
    this.props.navigation.navigate('Questionaire');
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ViewForHeader}>
          <Text style={styles.Header}>
            Welcome to Lipstick Finder
          </Text>
        </View>


        <View style={styles.ViewForAccountInput}>
        <Text style={styles.RegisterReminder}>
          Email
        </Text>
          <TextInput 
            placeholder="Please Input Email"
            style={styles.AccountInput}
            onChangeText={(Email) => this.setState({Email})}
          />
        </View>

        <View style={styles.ViewForAccountInput}>
        <Text style={styles.RegisterReminder}>
          Password
        </Text>
          <TextInput
            placeholder="Please Input Password"
            style={styles.AccountInput}
            onChangeText={(Password) => this.setState({Password})}
          />
        </View>

        <View style={styles.ViewForAccountInput}>
        <Text style={styles.RegisterReminder}>
          Confirm Password
        </Text>
          <TextInput
            placeholder="Please Confirm Password"
            style={styles.AccountInput}
            onChangeText={(ConfirmPassword) => this.setState({ConfirmPassword})}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onSignupButtonPress.bind(this)}>
            <Text style={styles.AccountButtonText}>
              SIGN UP
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

