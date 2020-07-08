import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from '../style/Styles.js';

export default class Registerscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      email: '0',
      password: '0',
      confirmPassword: '0',
    };
  };

  onSignupButtonPress(){
    const emailValid = this.validate_email();
    const passwordValid = this.validate_password();
    const confirmPasswordValid = this.validate_confirmpassword();
    if(!emailValid){
      LayoutAnimation.easeInEaseOut();
      Alert.alert('Please Enter Valid Email');
    }
    else if(!passwordValid){
      LayoutAnimation.easeInEaseOut();
      Alert.alert('Please Enter Valid Password');
    }
    else if(!confirmPasswordValid){
      LayoutAnimation.easeInEaseOut();
      Alert.alert('Please Enter Same Password as Above');
    }
    else{
      this.props.navigation.navigate('Questionaire');
    }
  }

  validate_email(){
    const { email } = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    return emailValid;
  }

  validate_password(){
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    return passwordValid;
  }

  validate_confirmpassword(){
    const { password } = this.state;
    const { confirmPassword } = this.state;
    const confirmPasswordValid = ( confirmPassword == password );
    return confirmPasswordValid;
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
            onChangeText={(email) => this.setState({email})}
          />
        </View>

        <View style={styles.ViewForAccountInput}>
        <Text style={styles.RegisterReminder}>
          Password
        </Text>
          <TextInput
            placeholder="Please Input Password"
            style={styles.AccountInput}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <View style={styles.ViewForAccountInput}>
        <Text style={styles.RegisterReminder}>
          Confirm Password
        </Text>
          <TextInput
            placeholder="Please Confirm Password"
            style={styles.AccountInput}
            secureTextEntry={true}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
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

