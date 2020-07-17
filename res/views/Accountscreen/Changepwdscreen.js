import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  Keyboard,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';

export default class Changepwdscreen extends Component {

  static defaultProps = {
        placeHolderCurrentPassword:"Current Password",
        placeHolderNewPassword:"New Password",
        placeHolderConfirmPassword:"Confirm Password"
  };

  //inital
  constructor(props) {
      super(props);
      this.state = {
          newPassword: "",
          currentPassword: "",
          confirmPassword: ""
      };
  }

  //check whether the input password is more than 8 digits
  validate_password = () => {
      const {password} = this.state;
      const passwordValid = password.length >= 8;
      return passwordValid;
  }

  //check whether the usaer is a validate user by c
  verify_account = () => {
      const {email} = this.state;
      const {password} = this.state;
      let formData = new FormData();

      fetch('http://124.156.143.125:5000/checkLoginInfo', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: email,
              password: password,
          })
      })
          .then((response) => response.json())
          .then((responseJson) => {
              if (responseJson.result == "True") {
                  this.props.navigation.reset({
                      index: 0,
                      routes: [{name: 'Root'}],
                  });
              } else {
                  LayoutAnimation.easeInEaseOut();
                  Alert.alert('False Email or Password');
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }

  onLoginButtonPress = () => {
      const emailValid = this.validate_email();
      const passwordValid = this.validate_password();
      if (emailValid && passwordValid) {
          this.verify_account();
      } else {
          LayoutAnimation.easeInEaseOut();
          Alert.alert('Invalid Email or Password Format');
      }
  };

  onbtnSavePress() {
      const passwordValid = this.validate_password();


      if (this.state.currentPassword.trim().length == 0) {
          Alert.alert('Please enter current password');
      } else if (this.state.newPassword.trim().length == 0) {
          Alert.alert('Please enter new password.');
      } else if (this.state.newPassword != this.state.confirmPassword) {
          Alert.alert('Password dose not match');
      } else {
          Keyboard.dismiss();
          this.changePassword();
      }
  }

  changePassword() {

  }

  render() {
    return (
      <>
        <Header title="Reset Password"/>
        <View style={accountStyles.container}>
            <View style={[accountStyles.bottomView,{backgroundColor:this.props.backgroundColor}]}>
            <View style={accountStyles.inputView}>
                <TextInput
                  style={accountStyles.inputText}
                  placeholder={this.props.placeHolderCurrentPassword}
                  multiline={false}
                  placeholderTextColor={"#3c3c3c"}
                  autoCorrect={false}
                  underlineColorAndroid={'transparent'}
                  secureTextEntry={true}
                  onChangeText={(currentPassword) => this.setState({currentPassword})}
                  value={this.state.currentPassword}>
                </TextInput>
            </View>
            <View style={accountStyles.inputView}>
                <TextInput
                  style={accountStyles.inputText}
                  placeholder={this.props.placeHolderNewPassword}
                  multiline={false}
                  placeholderTextColor={"#3c3c3c"}
                  autoCorrect={false}
                  underlineColorAndroid={'transparent'}
                  secureTextEntry={true}
                  onChangeText={(newPassword) => this.setState({newPassword})}
                  value={this.state.newPassword}>
                </TextInput>
            </View>
            <View style={accountStyles.inputView}>
                <TextInput
                  style={accountStyles.inputText}
                  placeholder={this.props.placeHolderConfirmPassword}
                  multiline={false}
                  placeholderTextColor={"#3c3c3c"}
                  autoCorrect={false}
                  underlineColorAndroid={'transparent'}
                  secureTextEntry={true}
                  onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                  value={this.state.confirmPassword}>
                </TextInput>
            </View>
            <TouchableOpacity
                style={accountStyles.btnSave}
                activeOpacity={0.6}
                onPress={() => this.onbtnSavePress()}>
                <Text style={accountStyles.textSave} numberOfLines={1}>Done</Text>
            </TouchableOpacity>
            </View>
        </View>

      </>
    );
  }
}
