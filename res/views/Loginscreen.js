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

export default class Loginscreen extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      Email: '0',
      Password: '0',
    };
  };

  onLoginButtonPress(){
    this.props.navigation.reset({
                          index: 0,
                          routes: [{ name: 'Root' }],});
  };

  onRegisterButtonPress(){
    this.props.navigation.navigate('Register');
  }

  validate_email(email){
  	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validate_password(){
    const { password } = this.state;
    const passwordValid = password.length >= 8;
  }

  login(){

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
          <TextInput 
            placeholder="Please Input Email"
            style={styles.AccountInput}
            onChangeText={(Email) => this.setState({Email})}
          />
        </View>

        <View style={styles.ViewForAccountInput}>
          <TextInput
            placeholder="Please Input Password"
            style={styles.AccountInput}
            onChangeText={(Password) => this.setState({Password})}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onLoginButtonPress.bind(this)}>
            <Text style={styles.AccountButtonText}>
              Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.AccountButton}
          onPress={this.onRegisterButtonPress.bind(this)}>
            <Text style={styles.AccountButtonText}>
              Register
            </Text>
        </TouchableOpacity>

      </View>
    )
  }
}
